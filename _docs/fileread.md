---
layout: doc
title: $fileRead[]
translation_key: docs
category: "Files"
function_name: fileRead
syntax: $fileRead[path;(encoding)]
description: "Reads a file of the bot as text"
---
$fileRead returns the content of a file written by this bot, as text (UTF-8) or as base64. A file larger than 5 MB cannot be read as text (`file_too_large`): use `$fileURL` to hand it out, or `bc.files.get` in JavaScript.

## Parameters

| Parameter | Description |
|---|---|
| `path` | Required. Logical path of the file. |
| `encoding` | Optional. `utf8` (default) or `base64`. |

## Errors

`file_not_found` when the file does not exist (check with `$fileExists`), `file_too_large`, `file_invalid_path`, `files_unavailable`.

## Examples

```bdfd
$if[$fileExists[notes/$authorID.txt]==true]
Your note: $fileRead[notes/$authorID.txt]
$endif
```
