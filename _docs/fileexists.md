---
layout: doc
title: $fileExists[]
translation_key: docs
category: "Files"
function_name: fileExists
syntax: $fileExists[path]
description: "Returns true if a file of the bot exists"
---
$fileExists returns `true` when this bot has a file at that path, `false` otherwise.

## Parameters

| Parameter | Description |
|---|---|
| `path` | Required. Logical path of the file. |

## Examples

```bdfd
$onlyIf[$fileExists[notes/$authorID.txt]==true;You have no note yet.]
```
