#!/usr/bin/env bash
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?Set a Cloudflare token with DNS Write permission}"
: "${CLOUDFLARE_ZONE_ID:?Set the Cloudflare zone ID for luckenbach.io}"

api="https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID"
auth="Authorization: Bearer $CLOUDFLARE_API_TOKEN"
name="_mcp._agents.luckenbach.io"
content='1 luckenbach.io. mandatory="alpn,port" alpn="mcp,h2" port="443"'

record_id=$(curl --fail --silent --show-error \
  --get "$api/dns_records" \
  --header "$auth" \
  --data-urlencode "type=SVCB" \
  --data-urlencode "name=$name" | jq -r '.result[0].id // empty')

payload=$(jq -nc \
  --arg name "$name" \
  --arg content "$content" \
  '{type:"SVCB", name:$name, content:$content, ttl:3600, proxied:false, comment:"DNS-AID MCP discovery"}')

if [[ -n "$record_id" ]]; then
  method=PUT
  url="$api/dns_records/$record_id"
else
  method=POST
  url="$api/dns_records"
fi

curl --fail --silent --show-error \
  --request "$method" "$url" \
  --header "$auth" \
  --header "Content-Type: application/json" \
  --data "$payload" | jq -e '.success == true' >/dev/null

echo "Published SVCB $name: $content"

dnssec=$(curl --fail --silent --show-error \
  --request PATCH "$api/dnssec" \
  --header "$auth" \
  --header "Content-Type: application/json" \
  --data '{"status":"active"}')

echo "$dnssec" | jq -e '.success == true' >/dev/null
echo "DNSSEC status: $(echo "$dnssec" | jq -r '.result.status')"
echo "DS record: $(echo "$dnssec" | jq -r '.result.ds // "check the Cloudflare dashboard"')"
