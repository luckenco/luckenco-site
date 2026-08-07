#!/usr/bin/env bash
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?Set a Cloudflare token with DNS Write permission}"
: "${CLOUDFLARE_ZONE_ID:?Set the Cloudflare zone ID for luckenbach.io}"

api="https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID"
auth="Authorization: Bearer $CLOUDFLARE_API_TOKEN"
name="_mcp._agents.luckenbach.io"
target="luckenbach.io"
value='alpn="h3,h2" port=443 mandatory="alpn,port"'
content="1 $target. $value"

records=$(curl --silent --show-error \
  --get "$api/dns_records" \
  --header "$auth" \
  --data-urlencode "type=HTTPS" \
  --data-urlencode "name=$name")

if ! jq -e '.success == true' <<<"$records" >/dev/null; then
  jq -r '.errors[]? | "Cloudflare API error \(.code): \(.message)"' <<<"$records" >&2
  exit 1
fi

record_id=$(jq -r '.result[0].id // empty' <<<"$records")

payload=$(jq -nc \
  --arg name "$name" \
  --arg target "$target" \
  --arg value "$value" \
  '{type:"HTTPS", name:$name, data:{priority:1, target:$target, value:$value}, ttl:3600, proxied:false, comment:"DNS-AID MCP discovery"}')

if [[ -n "$record_id" ]]; then
  method=PUT
  url="$api/dns_records/$record_id"
else
  method=POST
  url="$api/dns_records"
fi

record=$(curl --silent --show-error \
  --request "$method" "$url" \
  --header "$auth" \
  --header "Content-Type: application/json" \
  --data "$payload")

if ! jq -e '.success == true' <<<"$record" >/dev/null; then
  jq -r '.errors[]? | "Cloudflare API error \(.code): \(.message)"' <<<"$record" >&2
  exit 1
fi

echo "Published HTTPS $name: $content"

dnssec=$(curl --silent --show-error \
  --request PATCH "$api/dnssec" \
  --header "$auth" \
  --header "Content-Type: application/json" \
  --data '{"status":"active"}')

if ! jq -e '.success == true' <<<"$dnssec" >/dev/null; then
  jq -r '.errors[]? | "Cloudflare API error \(.code): \(.message)"' <<<"$dnssec" >&2
  exit 1
fi
echo "DNSSEC status: $(echo "$dnssec" | jq -r '.result.status')"
echo "DS record: $(echo "$dnssec" | jq -r '.result.ds // "check the Cloudflare dashboard"')"
