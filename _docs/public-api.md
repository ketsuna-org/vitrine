---
layout: doc
title: Public API
category: "Meta"
api_type: general
description: Manage your bot from your own code with the Bot Creator public API. API keys, scopes, limits, errors and copy-paste examples. Premium only.
permalink: /docs/public-api/
locale: en
translation_key: doc-public-api
---

The Bot Creator public API lets your own code manage a bot: read and edit its commands, workflows and variables, and publish commands to Discord when you decide to. It is a plain JSON REST API under `/v1`, authenticated with an API key you create in the Studio.

**It requires an active Premium plan.** Creating or rotating a key needs Premium. If Premium ends, your keys are kept but every call answers `403 key_suspended` until Premium is back. Revoking a key never requires Premium.

## What you can do

- Read a bot, its commands, workflows and variables.
- Create, replace, edit, delete and restore commands.
- Publish a command to Discord (globally or on chosen servers) and take it back off Discord without deleting it in Bot Creator.
- Create, replace and delete workflows.
- Read, write and delete variable values.

Starting and stopping the bot, execution logs, statistics, triggers and webhooks are **not** in the API yet.

## Base URL

```
https://api.bot-creator.fr
```

The full OpenAPI 3.1 contract is served without authentication at `https://api.bot-creator.fr/v1/openapi.json`. The [endpoint reference]({{ '/docs/public-api-reference/' | relative_url }}) lists every route.

## Create an API key

API keys are managed in the [Studio]({% include studio_link.html at='public_api_docs' %}), not in the mobile app.

1. Open your bot in the Studio and go to its API keys.
2. Choose a name, the scopes the key needs and an expiry.
3. Copy the key. **It is shown once.** Bot Creator only keeps a hash of it, so a lost key cannot be recovered, only replaced.

A key looks like `bcm_k_<8 characters>_<43 characters>`. Treat it like a password: keep it in an environment variable or a secret manager, never in a repository or in client-side code.

**One key belongs to one bot.** Asking for any other bot answers `404 bot_not_found`, exactly as if it did not exist. Each call is also checked against the rights of the account that created the key (owner, or collaborator allowed to edit): if the account loses access to the bot, the key stops working on it.

You can have up to 5 active keys per bot and per account.

### Expiry

By default a key expires after 90 days. You can choose 1 to 365 days, or "never expires", which we do not recommend. An expired key answers `401 key_expired`.

### Rotation and revocation

- **Rotate** creates a new key and keeps the old one working for a grace period (24 hours by default, from immediate up to 168 hours), so you can deploy the new key without downtime.
- **Revoke** is immediate and cannot be undone. A revoked key is refused within 10 seconds on every server.

Management routes are only available from a Studio account session. A key cannot create, rotate or revoke keys, and it is refused everywhere outside `/v1`.

## Authenticate

Send the key as a Bearer token:

```bash
curl -H "Authorization: Bearer $BCM_KEY" \
  https://api.bot-creator.fr/v1/bot
```

`GET /v1/bot` returns the bot of the key, so you do not need to know its id. The same bot is available at `/v1/bots/{botId}`.

## Scopes

Give each key only what it needs.

| Scope | Allows | Risk |
|---|---|---|
| `read:bots` | Read the bot, commands, workflows, variables, history and publication state | Low |
| `write:commands` | Create, replace, edit, delete and restore commands | Medium |
| `publish:commands` | Publish commands to Discord and remove them from Discord | High |
| `write:workflows` | Create, replace and delete workflows | Medium |
| `write:settings` | Write and delete variable values | Medium |

A missing scope answers `403 missing_scope` and `details.required_scope` names the scope to add. Two things to know:

- Editing a command that is **already published** also updates its copy on Discord, even with `write:commands` alone. Deleting a published command removes it from Discord.
- Asking for a Discord registration (`global` or `guilds`) in the body of a write requires `publish:commands`.

## Commands and Discord

A command created through the API is **not published on Discord**. Unless you ask otherwise it is stored in Bot Creator with its registration set to `none`. Publishing is a separate step that needs the `publish:commands` scope.

```bash
BASE=https://api.bot-creator.fr/v1/bots/$BOT

# 1. Create the command (not on Discord yet)
curl -X POST "$BASE/commands" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"command":{"id":"hello","name":"hello","response":"Hello!"}}'

# 2. Publish it on one server
curl -X POST "$BASE/commands/hello/publication" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"registration":"guilds","guild_ids":["123456789012345678"]}'

# 3. Take it off Discord, keep it in Bot Creator
curl -X DELETE "$BASE/commands/hello/publication" \
  -H "Authorization: Bearer $BCM_KEY"
```

The publication state of a command is one of `local`, `published`, `out_of_sync`, `unpublished`, `error` or `unknown`. List commands in a given state with `GET /commands?state=out_of_sync`. If Discord refuses a publication, the API answers `502 discord_error`, puts the reason in `details` and leaves the state unchanged.

The exact shape of a command is the one the editor uses. The easiest way to learn it is to `GET /commands/{id}` on a command you built in the Studio.

### Server-side checks

The server compiles every command and workflow when you write it. An error answers `422 validation_failed` with the list of problems in `details`, and nothing is saved. Warnings come back in `compile.warnings` of the response.

### Editing part of a command

`PATCH /commands/{id}` takes a JSON merge patch (RFC 7386): the fields you send replace the existing ones, `null` removes a field, and arrays are replaced as a whole.

```bash
curl -X PATCH "$BASE/commands/hello" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"command":{"response":"Hello, world!"}}'
```

### History

Each command keeps its last 5 versions. `GET /commands/{id}/history` lists them and `POST /commands/{id}/rollback/{historyId}` restores one.

## Variables

Variables have a scope: `global`, `user`, `guild`, `channel` or `guildMember`.

```bash
# write a global variable
curl -X PUT "$BASE/variables/global/season" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"value":"7"}'

# read the value of a guild variable for one server
curl -H "Authorization: Bearer $BCM_KEY" \
  "$BASE/variables/guild/welcome_channel?scope_id=123456789012345678"
```

For a precise value pass `scope_id` (and `scope_aux_id` when the scope needs two ids). Without them, the route lists the stored values. Variables whose name looks like a secret are masked in lists. Writing a variable that has no definition yet creates the definition for you. Deleting removes the value and keeps the definition.

## Pagination

Lists answer `{ "items": [...], "next_cursor": "..." }`. Pass `next_cursor` back as the `cursor` query parameter to get the next page; it is `null` on the last page. Commands accept `limit` from 1 to 100 (50 by default). Cursors are opaque: do not build or parse them.

## Limits

| Limit | Default |
|---|---|
| Active keys per bot and per account | 5 |
| Reads per minute, per key | 600 |
| Writes per minute, per key | 60 |
| Invalid key attempts per minute, per IP address | 30 |

These starting values may be adjusted as real usage is measured. Every authenticated response carries `X-RateLimit-Limit` and `X-RateLimit-Remaining`. When you are over the limit the API answers `429 rate_limited` with `Retry-After` (seconds) and `X-RateLimit-Reset`: wait that long before retrying. Counters are kept per server instance, so the effective limit can be higher than the figure above when several instances serve your calls.

## Errors

Every error is JSON:

```json
{
  "code": "missing_scope",
  "message": "This key does not have the scope publish:commands.",
  "details": { "required_scope": "publish:commands" },
  "request_id": "..."
}
```

Rely on `code`, which is stable, and not on `message`. Quote `request_id` if you contact support.

| Status | Codes |
|---|---|
| 400 | `invalid_payload`, `invalid_pagination`, `invalid_state`, `precondition_unsupported` |
| 401 | `invalid_authorization`, `invalid_key`, `key_revoked`, `key_expired` |
| 403 | `missing_scope`, `key_suspended` (Premium ended or account blocked) |
| 404 | `bot_not_found`, `bot_command_not_found`, `bot_workflow_not_found` |
| 409 | `already_exists` |
| 422 | `validation_failed`, `bot_setting_invalid` |
| 429 | `rate_limited` |
| 502 | `discord_error` |
| 503 | `audit_unavailable`, `auth_unavailable` |

## Things to know

- **Last write wins.** Two writers editing the same command overwrite each other. The `revision` field in responses is informational. `If-Match` and `If-None-Match` are refused with `400 precondition_unsupported` rather than silently ignored.
- **A change can be saved without reaching the running bot.** Write responses carry `runner_synced`. When it is `false`, the change is saved but not active yet: read `runner_sync_reason` and `next_step`.
- **Every write is audited.** Writes are logged per key. If that log cannot be written, the call answers `503 audit_unavailable` and nothing is changed.
- **Bot tokens are never returned.** The API never exposes your Discord bot token.

## Versioning

`/v1` only receives backward-compatible additions: new fields and new routes. Ignore fields you do not know. A breaking change would ship as `/v2`, with `/v1` kept for at least 6 months and `Deprecation` and `Sunset` headers on the old routes.
