---
layout: doc
title: $getAttachments
translation_key: docs
category: "Entity Info"
function_name: getAttachments
syntax: $getAttachments[messageID]
description: Gets the URLs of a specific message's attachments. Returns a list of comma-separated URLs.
---

# $getAttachments

The `$getAttachments[]` function allows you to **retrieve the URLs of attachments** (images, files, videos) of a Discord message.

## Syntax

```
$getAttachments[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message containing the attachments to retrieve. |

## Return Value

- **Type**: String
- The full URLs of the attachments, separated by `, `.
- An empty string if the message contains no attachments.

## Behavior

- Returns all URLs of files attached to the message.
- Works with all types of files supported by Discord (images, videos, documents, etc.).
- Each URL is a direct link to the file on Discord's servers.

## Examples

### Simple retrieval

```bdfd
$let[atts;$getAttachments[$messageID]]
$if[$atts!=]
  Attachments: $atts
$else
  No attachments in this message.
$endif
```

### Loop through attachments

```bdfd
$let[atts;$getAttachments[$messageID]]
$if[$atts!=]
  $textSplit[$atts;, ]
    📎 Attachment $index: $splitText[$index]
  $endTextSplit
$endif
```

### Save image

```bdfd
$let[url;$getAttachments[$noMentionMessage]]
$if[$url!=]
  $let[first;$splitText[$url;, ;1]]
  $image[$first]
  $sendMessage[Image retrieved:]
$else
  $sendMessage[No image found.]
$endif
```

## Notes

- Discord attachment URLs expire after some time (a few hours to a few days).
- For permanent usage, download and host the files elsewhere.
- Use `$textSplit[]` to process each attachment individually.
