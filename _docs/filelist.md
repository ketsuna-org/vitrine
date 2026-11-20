---
layout: doc
title: $fileList[]
translation_key: docs
category: "Files"
function_name: fileList
syntax: $fileList[(prefix);(separator);(limit)]
description: "Lists the files of the bot"
---
$fileList returns the paths of the files written by this bot, in alphabetical order.

## Parameters

| Parameter | Description |
|---|---|
| `prefix` | Optional. Only the paths that start with it, for example `exports/`. |
| `separator` | Optional. What goes between two paths. Defaults to `, `. |
| `limit` | Optional. Number of paths, 100 by default, 1000 at most. |

## Examples

```bdfd
Exports: $fileList[exports/;\n;20]
```
