# Constantin Luckenbach Public API

A small, read-only API for agents that need public profile, contact, or availability information.

Base URL: `https://luckenbach.io`

No authentication is required. Do not send credentials.

## Get profile

```http
GET /api/profile
Accept: application/json
```

Returns a public biography, selected results, and links for work, writing, scheduling, GitHub, and LinkedIn.

## Check status

```http
GET /api/status
Accept: application/json
```

Returns the current service status and API version.

## Machine-readable description

The OpenAPI 3.1 description is available at [`/openapi.json`](/openapi.json).
