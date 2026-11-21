---
layout: doc
title: $fileDelete[]
translation_key: docs
category: "Files"
function_name: fileDelete
syntax: $fileDelete[path]
description: "Deletes a file of the bot"
---
$fileDelete deletes a file written by this bot and gives its space back to the account quota. It returns `true` when the file existed and `false` otherwise (deleting a missing file is not an error).

## Parameters

| Parameter | Description |
|---|---|
| `path` | Required. Logical path of the file. |

## Examples

```bdfd
$fileDelete[notes/$authorID.txt]
```
