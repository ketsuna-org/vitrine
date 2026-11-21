---
layout: doc
title: "Open endpoints"
category: "API"
api_type: general
description: "The Bot Creator routes that need no API key and no account: documentation JSON, the OpenAPI contract, the public preview, the Premium list, bot status pages, shared file links and the health check."
permalink: /docs/public-endpoints/
locale: en
translation_key: doc-public-endpoints
---

These routes answer without an API key and without an account. Base URL: `https://api.bot-creator.fr`. For the routes that manage a bot, see the [Public API guide]({{ '/docs/public-api/' | relative_url }}) and the [endpoint reference]({{ '/docs/public-api-reference/' | relative_url }}).

| Route | Returns | Limits |
|---|---|---|
| `GET /docs/index.json` | Index of every documentation page | Cached 5 minutes |
| `GET /docs/{slug}.json` | One documentation page as JSON | Cached 5 minutes |
| `GET` / `POST /mcp/docs` | Read-only documentation MCP server | See [MCP servers]({{ '/docs/mcp/' | relative_url }}) |
| `GET /v1/openapi.json` | OpenAPI 3.1 contract of `/v1` | None |
| `POST /v1/preview` | Run a BDFD script in the sandbox | 20 per minute per IP address |
| `GET /v1/examples/{page}` | The examples of a documentation page with their results | Cached 1 hour |
| `GET /premiums-list` | Discord IDs of Premium accounts | 60 per minute per IP address, cached 5 minutes |
| `GET /public/bots/{botId}` | Public status page of a bot (HTML) | |
| `GET /public/bot-files/{token}` | A file shared with a temporary link | Link expires |
| `GET /healthz` | Health check | |

Documentation, contract, preview, examples and the Premium list send `Access-Control-Allow-Origin: *`, so a web page can call them directly.

## Documentation as JSON

Every page of this documentation (the 800+ BDFD functions, the JavaScript API, the blocks and the guides) is available as JSON, in English.

```bash
curl https://api.bot-creator.fr/docs/index.json
curl https://api.bot-creator.fr/docs/abs.json
```

`GET /docs/index.json` answers `{ "count": 836, "docs": [...] }`. Each entry has:

| Field | Description |
|---|---|
| `slug` | The page id, used in `/docs/{slug}.json` |
| `name` | Display name, for example `$abs[]` |
| `api_type` | `bdfd`, `javascript`, `blocks` or `general` |
| `category` | Category of the page |
| `description` | One-line summary |
| `json_url` | Address of the full JSON page |

`GET /docs/{slug}.json` returns the same fields plus `status`, `url` (the page on the website), `markdown` (the body) and `source` (the whole file with its front matter). Function pages also carry `syntax` and `params`. An unknown slug answers `404` with `{ "error": "unknown documentation slug", "index": "..." }`.

## OpenAPI contract

`GET /v1/openapi.json` is the OpenAPI 3.1 description of every `/v1` route. It says nothing about any account.

## Public preview

`POST /v1/preview` runs a BDFD script in the sandbox and returns the messages it would send, without a key, a bot or a Discord connection. It uses a sample world: an empty database and a sample author, channel and server. Nothing is sent or stored.

```bash
curl -X POST https://api.bot-creator.fr/v1/preview \
  -H "Content-Type: application/json" \
  -d '{"script":"$sendMessage[Hello $username]"}'
```

The body is `{ "script", "scenario"? }`. The script is at most 20,000 characters. The `scenario` object is described in the [endpoint reference]({{ '/docs/public-api-reference/' | relative_url }}). The answer has `ok`, `error`, `diagnostics`, `messages`, `effects` and `simulated: true`. Beyond 20 calls a minute from one address, the answer is `429 rate_limited` with a `Retry-After` header. To preview a script with the real values of your bot, use `POST /v1/bots/{botId}/preview` with an API key.

## Documentation examples

`GET /v1/examples/{page}` returns the BDFD examples of a documentation page (same slug as `/docs/{slug}.json`) together with the message each one produces. Results are computed in advance with the real engine, so nothing runs when you call it. An unknown page answers `404 page_not_found`.

```json
{
  "page": "abs",
  "examples": [
    {
      "script": "$sendMessage[$abs[-4]]",
      "ok": true,
      "error": null,
      "diagnostics": [],
      "messages": [{ "payload": { "content": "4", "targetType": "channel" } }]
    }
  ]
}
```

## Premium list

`GET /premiums-list` returns a JSON array with the Discord IDs (strings) of the accounts with an active Premium plan, and nothing else. Only accounts signed in with Discord appear. A change can take a few minutes to show. Example: `["123456789012345678","234567890123456789"]`.

## Bot status page

`GET /public/bots/{botId}` is the public status page of a bot: its state and its availability over the last 7 or 30 days (`?days=7`, 30 by default). It returns HTML in the language of the `Accept-Language` header, French by default, and answers `404` for an unknown bot.

## Shared file links

`POST /v1/bots/{botId}/files/link` creates a temporary public link to a stored file (see [Stored files]({{ '/docs/api-files/' | relative_url }})). The link is a `GET /public/bot-files/{token}` address that anyone can open until it expires (one hour by default, 7 days at most). Images, audio, video, PDF and plain text open in the browser; every other type is downloaded. An unknown or expired link answers `404 file_not_found`.

## Health check

`GET /healthz` (and `GET /`) answers `{ "status": "ok" }` while the service is up.
