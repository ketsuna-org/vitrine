---
layout: doc
title: "Stored files"
category: "API"
api_type: general
description: "List, download, upload, delete and share the files your bot stores, from your own code, with the Bot Creator public API."
permalink: /docs/api-files/
locale: en
translation_key: doc-api-files
---

Your bot can keep files (a generated image, a CSV export, a backup) with its scripts: `$fileUpload`, `$fileRead`, `$fileList`, `$fileURL` in BDFD, `bc.files` in JavaScript. The public API reaches **the same files**: what the bot writes, you can list and download, and what you upload, the bot can read. Create the key as described in the [Public API guide]({{ '/docs/public-api/' | relative_url }}).

## Scopes

| Scope | Allows | Risk |
|---|---|---|
| `read:files` | List, read the metadata, download, and create a temporary public link | Low |
| `write:files` | Upload, replace and delete files | Medium |

## Paths, size and quota

- A file is identified by its **path**: `report.csv` or `exports/2026/report.csv`. Segments are separated by `/`, with no leading or trailing `/`, no empty segment, no `.` or `..`, no control character, 255 bytes at most.
- Because a path contains `/`, it goes in the **`path` query parameter**, URL-encoded (`path=exports%2F2026%2Freport.csv`), never in the URL path.
- A file is at most **25 MiB** (`413 file_too_large` beyond).
- Files count in the storage quota of the **account** that owns the bot, the same as the files written by scripts. A full quota answers `403 file_quota_exceeded`: uploads are refused, nothing is deleted. Replacing a file only counts the difference.
- Files are private to the bot: a path is only visible to the bot that wrote it.

## Routes at a glance

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bots/{botId}/files` | `read:files` | List files |
| `GET /v1/bots/{botId}/files/info?path=` | `read:files` | Metadata of one file |
| `GET /v1/bots/{botId}/files/content?path=` | `read:files` | Download |
| `PUT /v1/bots/{botId}/files/content?path=` | `write:files` | Upload or replace |
| `DELETE /v1/bots/{botId}/files?path=` | `write:files` | Delete |
| `POST /v1/bots/{botId}/files/link` | `read:files` | Create a temporary public link |

## File object

| Field | Type | Description |
|---|---|---|
| `path` | string | The path of the file |
| `size` | integer | Size in bytes |
| `content_type` | string | The type stored with the file |
| `updated_at` | string | ISO 8601 timestamp of the last write |

## List files

`GET /v1/bots/{botId}/files` · scope `read:files`

| Query | Description |
|---|---|
| `prefix` | Only the paths that start with this text, for example `exports/` |
| `limit` | 1 to 100, 50 by default |
| `cursor` | The `next_cursor` of the previous page |

The files come ordered by path. The answer also tells what the bot's files take.

**Example response**

```json
{
  "items": [
    { "path": "exports/2026/report.csv", "size": 18234, "content_type": "text/csv", "updated_at": "2026-11-20T21:04:11Z" }
  ],
  "next_cursor": null,
  "used_bytes": 18234,
  "count": 1,
  "max_file_bytes": 26214400
}
```

## Download a file

`GET /v1/bots/{botId}/files/content?path=exports%2F2026%2Freport.csv` · scope `read:files`

The body is the raw content. It is always served as `application/octet-stream` and as an attachment, whatever the file is; the type stored with the file is returned in the `X-File-Content-Type` header. A missing file answers `404 file_not_found`.

```bash
curl -G -H "Authorization: Bearer $BCM_KEY" \
  --data-urlencode "path=exports/2026/report.csv" \
  https://api.bot-creator.fr/v1/bots/$BOT/files/content --output report.csv
```

## Upload or replace a file

`PUT /v1/bots/{botId}/files/content?path=logo.png` · scope `write:files`

The body is the raw content and the `Content-Type` header is stored as the type of the file. If the path exists, the file is replaced. The answer is the file object.

```bash
curl -X PUT -H "Authorization: Bearer $BCM_KEY" \
  -H "Content-Type: image/png" --data-binary @logo.png \
  "https://api.bot-creator.fr/v1/bots/$BOT/files/content?path=logo.png"
```

**Example response**

```json
{ "path": "logo.png", "size": 48211, "content_type": "image/png", "updated_at": "2026-11-20T22:10:03Z" }
```

## Delete a file

`DELETE /v1/bots/{botId}/files?path=logo.png` · scope `write:files`

Deleting gives the space back to the quota. It is idempotent: deleting a file that does not exist answers `200` with `deleted: false`.

```json
{ "deleted": true }
```

## Create a public link

`POST /v1/bots/{botId}/files/link` · scope `read:files`

Returns a link anyone can open to read the file, with no API key: handy to show an image in a Discord embed or to hand a report to someone. It is the same link as `$fileURL`.

| Field | Type | Description |
|---|---|---|
| `path` | string | The file |
| `ttl_seconds` | integer | Life of the link, 1 to 604800 (7 days). 3600 (1 hour) by default |

**Example request**

```json
{ "path": "exports/2026/report.csv", "ttl_seconds": 86400 }
```

**Example response**

```json
{ "url": "https://api.bot-creator.fr/public/bot-files/…", "expires_at": "2026-11-21T22:10:03Z" }
```

Good to know:

- Whoever has the link can read the file until `expires_at`. **A link cannot be revoked before it expires**: delete the file to make it stop working. Keep the duration short for anything private.
- Images, audio, video, plain text and PDF open in the browser. Every other type, HTML and SVG included, downloads instead.
- The link reads the file as it is at that moment: if you replace the file, the link serves the new content.

## Errors

| Status | Code | When |
|---|---|---|
| 400 | `file_invalid_path` | The path breaks the rules above, or `path` is missing |
| 400 | `invalid` | `limit` or `ttl_seconds` out of range |
| 403 | `missing_scope` | The key lacks `read:files` or `write:files` |
| 403 | `file_quota_exceeded` | The account storage quota is full |
| 404 | `file_not_found` | No file at this path |
| 413 | `file_too_large` | More than 25 MiB |
| 503 | `files_unavailable` | Files are not enabled on this server |
