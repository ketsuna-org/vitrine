---
layout: doc
title: $getEmbedData
translation_key: docs
category: "Entity Info"
function_name: getEmbedData
syntax: $getEmbedData[messageID;embedIndex;field]
description: Extracts the data of a specific field of an embed in a message. Allows reading the title, description, fields, etc., of an existing embed.
---

# $getEmbedData

The `$getEmbedData[]` function allows you to **extract data from an embed** present in a Discord message. Extremely useful for reading and reusing the content of existing embeds.

## Syntax

```
$getEmbedData[messageID;embedIndex;field]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message containing the embed. |
| `embedIndex` | The index of the embed (1 = first, 2 = second...). |
| `field` | The field to extract, among: `title`, `description`, `footer`, `author`, `color`, `field:<name>`, `image`, `thumbnail`, `url`, `timestamp`. |

## Return Value

- **Type**: String
- The value of the field extracted from the embed.
- An empty string if the field does not exist or if the index is invalid.

## Behavior

- Reads embeds from an existing message (including those sent by other bots).
- For named fields (`fields`), use the syntax `field:Name of the field`.
- The index of the embed starts at 1.

## Examples

### Read the title and description

```bdfd
$let[title;$getEmbedData[$messageID;1;title]]
$let[desc;$getEmbedData[$messageID;1;description]]

$title[📋 Embed detected]
$description[
**Title:** $title
**Description:** $desc
]
$sendMessage[]
```

### Extract a named field

```bdfd
$let[score;$getEmbedData[$messageID;1;field:Score]]
$if[$score!=]
  The score is: **$score**
$else
  Field "Score" not found.
$endif
```

### Retrieve media

```bdfd
$let[image;$getEmbedData[$noMentionMessage;1;image]]
$let[thumb;$getEmbedData[$noMentionMessage;1;thumbnail]]

$if[$image!=]
  $image[$image]
$endif
$if[$thumb!=]
  $thumbnail[$thumb]
$endif
```

### Recreate an embed

```bdfd
$let[title;$getEmbedData[$messageID;1;title]]
$let[desc;$getEmbedData[$messageID;1;description]]
$let[footer;$getEmbedData[$messageID;1;footer]]
$let[color;$getEmbedData[$messageID;1;color]]

$title[$title]
$description[$desc]
$footer[$footer]
$color[$color]
$sendMessage[]
```

## Notes

- Works on messages from any author (users, bots, webhooks).
- The message must be in a channel accessible by the bot.
- The `color` value is returned in hexadecimal format (#RRGGBB).
