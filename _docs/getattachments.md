---
layout: doc
title: $getAttachments
translation_key: docs
category: "Entity Info"
function_name: getAttachments
syntax: $getAttachments[index]
description: Returns the URL of one attachment, selected by a 0-based index, of the message that triggered the command.
---

# $getAttachments

The `$getAttachments[]` function **retrieves the URL of one attachment** (image, file, video...) of the message that triggered the command. The attachment is selected by its position.

## Syntax

```
$getAttachments[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Required. The position of the attachment, **starting at 0** (`0` is the first attachment). Surrounding spaces are removed. A value that is not a whole number, or is negative, raises `Attachment index must be zero or positive.` |

The argument is **not** a message ID: the message is always the current one (the `message.id` and `channel.id` of the command context).

## Return Value

- **Type**: String
- The URL of the attachment at that position (the URL given by Discord for the attachment).
- If the message has no attachment at that position (including a message with no attachment at all), the error `Attachment index is out of range.` is raised: the function does not return an empty string.

## Behavior

- The message is read from Discord each time the function runs. If the context has no valid channel ID and message ID, the error `Invalid Discord ID.` is raised.
- The function returns one URL per call, never a list. There is no function in the engine that returns the number of attachments; protect the call with `$try` / `$catch` / `$endTry` if the message may have none.

## Examples

### First attachment

```bdfd
$try
$sendMessage[First attachment: $getAttachments[0]]
$catch
$sendMessage[No attachment in this message.]
$endTry
```

### Show an attached image in an embed

```bdfd
$try
$title[Your image]
$image[$getAttachments[0]]
$catch
No image found.
$endTry
```

### Second attachment

```bdfd
$try
$sendMessage[Second attachment: $getAttachments[1]]
$catch
$sendMessage[The message has fewer than two attachments.]
$endTry
```

## Notes

- Discord attachment URLs can expire; do not rely on them for permanent storage.
- Indexes start at `0`, unlike most other BDFD list functions.
