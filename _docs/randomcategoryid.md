---
layout: doc
title: $randomCategoryID
translation_key: docs
category: "Math & Text"
function_name: randomCategoryID
syntax: $randomCategoryID[(guildID)]
description: Returns the ID of a random category of the current server, or of the server given as an argument.
---

# $randomCategoryID

The `$randomCategoryID` function returns the ID of a randomly selected category channel of a server.

## Syntax

```
$randomCategoryID[(guildID)]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `guildID` | No | ID of the server to pick from. Omitted or empty: the current server. |

## Return Value

- **Type**: String (Discord snowflake).
- Returns an empty string if the server has no category.
- Throws `Invalid guild ID.` if `guildID` is not empty and is not a positive number.

## Behavior

- Only channels of type `category` are candidates; text and voice channels are ignored.
- Each category has the same chance of being picked, and the result can change on each call.
- It needs the Discord channel service of the running bot; the channel list is fetched from Discord.

## Examples

### Show a random category ID

```bdfd
Random category ID: $randomCategoryID
```

### Handle a server without categories

```bdfd
$var[cat;$randomCategoryID]
$if[$var[cat]==]
No categories found.
$else
Category ID: $var[cat]
$endif
```

## Notes

- Use `$randomChannelID` to pick among all channels of the server.
