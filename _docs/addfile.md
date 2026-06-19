---
layout: doc
title: $addFile[]
translation_key: docs
category: "Embed & Message"
function_name: addFile
syntax: $addFile[url;(spoiler)]
description: Attaches a file (image, document, etc.) to a Discord message as a visual component. The file is displayed directly in the message.
---

# $addFile[] — File Attachment

`$addFile[]` attaches a file (image, PDF, document, etc.) to a message. The file is downloaded from the provided URL and displayed as an attachment in the Discord message.

## Syntax

```
$addFile[url;(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the file to attach. |
| `spoiler` | No | `no` | `yes` to spoiler the file. |

## Return value

Adds the file as an attachment to the message. Discord displays the file according to its type (preview for images, icon + name for documents).

## Usage

### Attaching an image

```bdfd
$addFile[https://cdn.example.com/chart.png]
$sendMessage[Here is the requested chart]
```

### PDF document

```bdfd
$addFile[https://docs.example.com/rapport-2024.pdf]
$sendMessage[Annual report attached]
```

### Spoiler file

```bdfd
$addFile[https://cdn.example.com/spoiler_endgame.png;yes]
$sendMessage[Warning: ending spoiler!]
```

### Multiple files

```bdfd
$addFile[https://files.example.com/logs.txt]
$addFile[https://files.example.com/config.json]
$sendMessage[Configuration files]
```

### With embed and file

```bdfd
$title[Monthly Report]
$description[Here is the detailed report of the month]
$color[#5865F2]
$addFile[https://reports.example.com/monthly.pdf]
```

## Supported file types

- Images: PNG, JPEG, GIF, WebP
- Documents: PDF, TXT, CSV, JSON, XML
- Archives: ZIP (limited)
- Max size: ~25 MB (depending on the server's boost level)

## Notes

- The URL must be publicly accessible.
- Multiple `$addFile[]` calls can be used in the same message.
- Do not confuse this with `$addModalFileUpload[]`, which is for interactive modals.
- The spoiler hides the file until the user clicks to reveal it.

