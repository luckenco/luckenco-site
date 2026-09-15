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

## Brand assets

The selected logo is the monochrome L-and-dot square stamp (concept C).

- `public/brand/linkedin-avatar.png`: 1024 × 1024 opaque PNG, padded for a circular profile crop.
- `public/brand/linkedin-avatar.svg`: editable vector avatar source.
- `public/favicon.svg` and `public/favicon.ico`: browser icons; ICO contains 16, 32, and 48 px sizes.
- `public/touch-icon.png`: 180 × 180 Apple touch icon.
- `public/mask-icon.svg`: single-color Safari pinned-tab icon.

The avatar is also the default social-preview image. Assets use ink `#171717` and white. The favicon keeps white letter cutouts on dark browser backgrounds.
