---
layout: doc
title: $onlyForCategories
translation_key: docs
category: "Moderation"
function_name: onlyForCategories
syntax: $onlyForCategories[categoryID1;categoryID2;...;(errorMessage)]
description: A guard function that stops execution if the current channel does not belong to one of the specified categories.
---

# $onlyForCategories

The guard function `$onlyForCategories` checks if the channel where the command is executed belongs to one of the specified Discord categories. If the channel is not part of the allowed categories, the command execution is halted.

## Syntax

```
$onlyForCategories[categoryID1;categoryID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `categoryID1;categoryID2;...` | Snowflake[] | The IDs of the allowed categories. |
| `errorMessage` | String (optional) | The message sent if the channel does not belong to the allowed categories. |

## Behavior

- Gets the ID of the parent category of the current channel via `$channelCategoryID`.
- Compares this category ID with the provided list.
- If the category matches, the command continues; otherwise, execution is halted.
- If the channel does not have a parent category, the command is always halted.

## Examples

### Tickets Category

```bdfd
$onlyForCategories[123456789012345678;❌ Only available in ticket channels.]
$closeTicket
```

### Moderation + Staff Categories

```bdfd
$onlyForCategories[111111111111111111;222222222222222222;❌ Out of bounds.]
$clear[50]
```

### Without error message

```bdfd
$onlyForCategories[123456789012345678]
$sendMessage[Function allowed in this category.]
```

## Notes

- A Discord category is a container of channels. Enable Developer Mode to copy its ID.
- `$onlyForCategories` is broader than `$onlyForChannels` because it allows all channels inside an entire category.
- For channels with no parent category, the command will always be blocked.
- Combine with `$onlyForChannels` for more granular rules (category + specific channels).
