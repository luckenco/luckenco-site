# luckenbach.io

Constantin Luckenbach's homepage, deployed to Cloudflare Pages.

## Development

```sh
bun install
bun run dev
```

`bun run build` creates the static site. Cloudflare Pages also deploys the handlers in `functions/` for homepage Markdown negotiation and the public MCP endpoint.

## DNS-AID setup

DNS records cannot be published by the Pages deployment. Add these GitHub repository secrets:

- `CLOUDFLARE_DNS_API_TOKEN`: a zone-scoped token with **DNS Write** permission
- `CLOUDFLARE_ZONE_ID`: the `luckenbach.io` zone ID

Then run the **Configure agent discovery** workflow once. It upserts the DNS-AID SVCB record and enables DNSSEC. If the registrar is not Cloudflare, publish the DS value printed by the workflow at the registrar to complete the DNSSEC chain of trust.
