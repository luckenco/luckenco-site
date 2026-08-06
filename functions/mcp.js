const HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type, MCP-Protocol-Version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json; charset=utf-8",
};

const PROFILE = {
  name: "Constantin Luckenbach",
  description:
    "Systems engineer building products across AI, data, hardware, and the real world.",
  highlights: [
    "Delivered 120% first-year ROI on an invoice automation system",
    "Reduced data-entry errors by 78%",
    "Built nationwide property data pipelines, interactive 3D systems, and production voice AI",
  ],
  links: {
    website: "https://luckenbach.io/",
    work: "https://luckenbach.io/work",
    writing: "https://luckenbach.io/writing",
    calendar: "https://cal.com/luckenbach/quick-chat",
    github: "https://github.com/luckenco",
    linkedin: "https://linkedin.com/in/luckenco",
  },
};

const WORK = [
  {
    name: "Property Data Pipeline",
    result:
      "Turned nationwide listing data from Switzerland's three largest property platforms into one clean, usable dataset.",
  },
  {
    name: "shapeID",
    result:
      "Connected scanner hardware to a mobile app that turns captures into private, interactive 3D models.",
  },
  {
    name: "LISA",
    result:
      "Built live-call, knowledge-ingestion, AWS infrastructure, and legacy-software integration systems for automotive dealership pilots.",
  },
];

const TOOLS = [
  {
    name: "get_profile",
    description:
      "Get Constantin Luckenbach's public professional profile, selected results, and canonical contact links.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "list_selected_work",
    description:
      "List selected systems projects and concise descriptions of their outcomes.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: HEADERS });
}

function result(id, value) {
  return json({ jsonrpc: "2.0", id, result: value });
}

export async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: HEADERS });
  }

  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { ...HEADERS, Allow: "POST, OPTIONS" },
    });
  }

  let message;
  try {
    message = await context.request.json();
  } catch {
    return json({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    });
  }

  const { id = null, method, params } = message;

  if (method === "notifications/initialized") {
    return new Response(null, { status: 202, headers: HEADERS });
  }

  if (method === "initialize") {
    return result(id, {
      protocolVersion: "2025-06-18",
      capabilities: { tools: {} },
      serverInfo: {
        name: "luckenbach-public-profile",
        version: "1.0.0",
      },
      instructions:
        "Use these read-only tools for accurate public information about Constantin Luckenbach.",
    });
  }

  if (method === "ping") return result(id, {});
  if (method === "tools/list") return result(id, { tools: TOOLS });

  if (method === "tools/call") {
    if (params?.name === "get_profile") {
      return result(id, {
        content: [{ type: "text", text: JSON.stringify(PROFILE, null, 2) }],
      });
    }

    if (params?.name === "list_selected_work") {
      return result(id, {
        content: [{ type: "text", text: JSON.stringify(WORK, null, 2) }],
      });
    }

    return result(id, {
      content: [{ type: "text", text: `Unknown tool: ${params?.name ?? ""}` }],
      isError: true,
    });
  }

  return json({
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: "Method not found" },
  });
}
