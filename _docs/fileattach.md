---
layout: doc
title: $fileAttach[]
translation_key: docs
category: "Files"
function_name: fileAttach
syntax: $fileAttach[path;(name)]
description: "Attaches a file of the bot to the message of the script"
---
$fileAttach reads a file of the bot and attaches it to the message the script sends, the same way `$attachImage` attaches a canvas. The message keeps its text.

The file must be at most 10 MB (the Discord limit for a bot), otherwise the function fails with `file_too_large`. A file that does not exist fails with `file_not_found`; catch it with `$try`. Only the files of the bot itself can be attached.

## Parameters

| Parameter | Description |
|---|---|
| `path` | Required. Logical path of the file. |
| `name` | Optional. Name shown in Discord. By default the end of the path. A name without an extension gets `.bin`. |

## Examples

```bdfd
Here is the export: $fileAttach[exports/week-12.csv;classement.csv]
```
