---
layout: doc
title: $randomCategoryID
translation_key: docs
category: "Math & Text"
function_name: randomCategoryID
syntax: $randomCategoryID
description: Returns the ID of a random category from all categories on the current server.
---

# $randomCategoryID

The `$randomCategoryID` function returns the **Discord identifier (snowflake)** of a randomly selected category from all categories present on the server where the command is executed.

## Syntax

```
$randomCategoryID
```

> **Note:** This function takes no parameters.

## Parameters

No parameters.

## Return Value

- **Type**: String (Discord snowflake)
- The ID of a random category on the current server.
- Returns an empty string if the server has no categories.

## Behavior

- The function select menus a category **randomly** from all existing categories on the server.
- The result changes on each call (non-deterministic).
- Only **categories** (GUILD_CATEGORY type) are concerned, not text or voice channels.
- If no category-type channel exists on the server, the function may return an empty value.

## Examples

### Mention a random category

```bdfd
$title[🎲 Random category]
$description[
Selected category: <#$randomCategoryID>
**Name:** $channelName[$randomCategoryID]
]
$color[#5865F2]
$sendMessage[]
```

### Random assignment

```bdfd
$title[📂 Category assignment]
$description[
You have been assigned to the **$channelName[$randomCategoryID]** category!
]
$footer[ID: $randomCategoryID]
$color[#57F287]
$sendMessage[]
```

### Existence check

```bdfd
$let[cat;$randomCategoryID]
$if[$get[cat]==]
  $title[⚠️ No categories]
  $description[This server has no categories.]
  $color[#ED4245]
$else
  $title[✅ Category found]
  $description[Category: **$channelName[$get[cat]]** (ID: `$get[cat]`)]
  $color[#57F287]
$endif
$sendMessage[]
```

## Notes

- Use `$randomChannelID` to get a random channel ID (all types).
- To list all categories, use `$categoryChannels[]`.
- Returned IDs are **Discord snowflakes** (17-19 digit numeric strings).
- The function is useful for games, random systems, or "roulette" type commands.
