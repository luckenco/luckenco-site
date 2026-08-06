const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</api-docs.md>; rel="service-doc"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(", ");

const MARKDOWN = `# Constantin Luckenbach

I build systems that connect AI, data, and the real world.

Nationwide property data. Scanner hardware to interactive 3D. AI that handles real phone calls.

Across projects, my systems have delivered **120% first-year ROI**, reduced data-entry errors by **78%**, and lowered the risk of regulatory shutdowns.

## Selected work

### Property Data Pipeline

Turned nationwide listing data from Switzerland's three largest property platforms into one clean, usable dataset.

### shapeID

Connected scanner hardware to a mobile app that turns captures into private, interactive 3D models.

[Visit shapeID](https://shapeid.io/?ref=luckenco)

### LISA

Built live-call, knowledge-ingestion, AWS infrastructure, and legacy-software integration systems for an automotive AI company.

[Visit LISA](https://lisa.aicompany.at/)

## Writing

- [Fighting forward head posture (kill your nerd neck)](/writing/fighting-forward-head-posture)
- [All writing](/writing)

## Contact

- [Book a quick call](https://cal.com/luckenbach/quick-chat)
- [GitHub](https://github.com/luckenco)
- [LinkedIn](https://linkedin.com/in/luckenco)
- [YouTube](https://www.youtube.com/@cluckenbach)
- [Instagram](https://www.instagram.com/constantin.luckenbach)
- [X](https://x.com/luckenco)

## Agent resources

- [API catalog](/.well-known/api-catalog)
- [API documentation](/api-docs.md)
- [OpenAPI description](/openapi.json)
- [Agent skills](/.well-known/agent-skills/index.json)
- [Authentication guidance](/auth.md)
`;

function quality(accept, type) {
  let best = 0;
  let specificity = -1;
  const [wantedType] = type.split(";");
  const [wantedGroup] = wantedType.split("/");

  for (const part of accept.split(",")) {
    const [range, ...parameters] = part.trim().toLowerCase().split(";");
    let matchSpecificity = -1;

    if (range === wantedType) matchSpecificity = 2;
    if (range === `${wantedGroup}/*`) matchSpecificity = 1;
    if (range === "*/*") matchSpecificity = 0;
    if (matchSpecificity < 0 || matchSpecificity < specificity) continue;

    const q = parameters.find((parameter) => parameter.trim().startsWith("q="));
    const value = q ? Number(q.trim().slice(2)) : 1;
    if (!Number.isFinite(value) || value < 0 || value > 1) continue;

    if (matchSpecificity > specificity || value > best) {
      best = value;
      specificity = matchSpecificity;
    }
  }

  return best;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname !== "/" || context.request.method !== "GET") {
    return context.next();
  }

  const accept = context.request.headers.get("accept") ?? "*/*";
  const wantsMarkdown =
    quality(accept, "text/markdown") > quality(accept, "text/html");

  if (wantsMarkdown) {
    return new Response(MARKDOWN, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Link: LINK_HEADER,
        Vary: "Accept",
        "x-markdown-tokens": String(Math.ceil(MARKDOWN.length / 4)),
      },
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("Link", LINK_HEADER);
  headers.set("Vary", "Accept");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
