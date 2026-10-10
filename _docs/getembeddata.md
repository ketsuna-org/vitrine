---
layout: doc
title: $getEmbedData
translation_key: docs
category: "Entity Info"
function_name: getEmbedData
syntax: $getEmbedData[channelID;messageID;embedIndex;property]
description: Extracts the data of a specific field of an embed in a message. Allows reading the title, description, fields, etc., of an existing embed.
---

# $getEmbedData

The `$getEmbedData[]` function allows you to **extract data from an embed** present in a Discord message. Extremely useful for reading and reusing the content of existing embeds.

## Syntax

```
$getEmbedData[channelID;messageID;embedIndex;property]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. Required. |
| `messageID` | The ID of the message containing the embed. Required. |
| `embedIndex` | The index of the embed (1 = first, 2 = second...). Must be an integer of 1 or more. Required. |
| `property` | The property to extract, among: `title`, `description`, `footer`, `color`, `image`, `timestamp`. Required, case-sensitive. |

## Return Value

- **Type**: String
- The value of the property extracted from the embed.
- An empty string if the embed does not define this property.
- An error is raised if a channel or message ID is invalid, if the index is not an integer of 1 or more or exceeds the number of embeds of the message, or if the property is unknown.

## Behavior

- Reads embeds from an existing message (including those sent by other bots).
- The index of the embed starts at 1.
- `footer` returns the footer text, `image` the image URL.
- `color` returns 6 lowercase hexadecimal digits, without `#` (for example `00aaff`).
- `timestamp` returns the date in ISO 8601 UTC format (for example `2026-10-04T00:00:00.000Z`).
- Embed fields, author, thumbnail and URL are not available.

## Examples

### Read the title and description

```bdfd
$var[title;$getEmbedData[$channelID;$messageID;1;title]]
$var[desc;$getEmbedData[$channelID;$messageID;1;description]]

$title[📋 Embed detected]
$description[
**Title:** $var[title]
**Description:** $var[desc]
]
```

### Retrieve media

```bdfd
$var[image;$getEmbedData[$channelID;$messageID;1;image]]

$if[$var[image]!=]
  $image[$var[image]]
$endif
```

### Recreate an embed

```bdfd
$var[title;$getEmbedData[$channelID;$messageID;1;title]]
$var[desc;$getEmbedData[$channelID;$messageID;1;description]]
$var[footer;$getEmbedData[$channelID;$messageID;1;footer]]
$var[color;$getEmbedData[$channelID;$messageID;1;color]]

$title[$var[title]]
$description[$var[desc]]
$footer[$var[footer]]
$color[#$var[color]]
```

## Notes

- Works on messages from any author (users, bots, webhooks).
- The message must be in a channel accessible by the bot.
- The `color` value is returned as hexadecimal digits without `#`; prefix it with `#` to reuse it in `$color[]`.
