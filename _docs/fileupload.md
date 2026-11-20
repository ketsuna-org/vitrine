---
layout: doc
title: $fileUpload[]
translation_key: docs
category: "Files"
function_name: fileUpload
syntax: $fileUpload[path;content;(encoding);(contentType)]
description: "Writes or replaces a file of the bot in the account storage"
---
$fileUpload writes a file that belongs to this bot (no other bot can read it) in the storage of the account that owns the bot. It counts against the account storage quota (included files of the plan plus storage packs). A file is 25 MB at most. Writing to an existing path replaces it.

On desktop, a bot that runs locally writes in a folder of the computer instead, with the same rules (and no quota).

## Parameters

| Parameter | Description |
|---|---|
| `path` | Required. Logical path such as `exports/week-12.csv`: segments separated by `/`, 255 bytes at most, no `..`, no empty segment, no leading or trailing `/`. |
| `content` | Required. The text to write, or base64 when `encoding` is `base64`. |
| `encoding` | Optional. `utf8` (default) or `base64`. |
| `contentType` | Optional. MIME type, for example `image/png`. Defaults to `application/octet-stream`. |

## Errors

Use `$try` to catch them: `file_too_large`, `file_quota_exceeded`, `file_invalid_path`, `file_invalid_encoding`, `files_unavailable` (the bot does not run on a runner nor on desktop).

## Examples

```bdfd
$fileUpload[notes/$authorID.txt;$message[1]]
Saved.
```
