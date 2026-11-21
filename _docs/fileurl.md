---
layout: doc
title: $fileURL[]
translation_key: docs
category: "Files"
function_name: fileURL
syntax: $fileURL[path;(minutes)]
description: "Returns a temporary download link to a file of the bot"
---
$fileURL returns a signed link that anyone who has it can open until it expires, without any account. Images, audio, video, plain text and PDF open in the browser, any other type (HTML included) is downloaded. A link stops working when the file is deleted; if the file is replaced, the link serves the new content.

On desktop, a bot that runs locally has no public link: the function fails with `file_url_unavailable`.

## Parameters

| Parameter | Description |
|---|---|
| `path` | Required. Logical path of the file. |
| `minutes` | Optional. Lifetime of the link, 60 by default, 10080 (7 days) at most. |

## Examples

```bdfd
Download your export (valid 30 minutes): $fileURL[exports/week-12.csv;30]
```
