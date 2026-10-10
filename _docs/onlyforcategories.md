---
layout: doc
title: $onlyForCategories
translation_key: docs
category: "Moderation"
function_name: onlyForCategories
syntax: $onlyForCategories[categoryID1;categoryID2;...;errorMessage]
description: A guard function that stops execution if the current channel does not belong to one of the specified categories.
---

# $onlyForCategories

The guard function `$onlyForCategories` checks if the channel where the command is executed belongs to one of the specified Discord categories. If the channel is not part of the allowed categories, the command execution is halted.

## Syntax

```
$onlyForCategories[categoryID1;categoryID2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `categoryID1;categoryID2;...` | Snowflake[] | The IDs of the allowed categories (each non-empty value must be a valid Discord ID, otherwise an error "Invalid Discord ID." is raised). At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Reads the current channel (`channel.id`) and takes its parent category ID. For a thread, the category of its parent channel is used.
- If the category ID is one of the values, the command continues.
- Otherwise the script is stopped and the error message is used as output. This also happens when the channel has no parent category, when the channel cannot be found, or when all values are empty.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Tickets Category

```bdfd
$onlyForCategories[123456789012345678;❌ Only available in ticket channels.]
$sendMessage[Ticket command.]
```

### Moderation + Staff Categories

```bdfd
$onlyForCategories[111111111111111111;222222222222222222;❌ Out of bounds.]
$sendMessage[Allowed category.]
```

### Silent stop

```bdfd
$onlyForCategories[123456789012345678;]
$sendMessage[Function allowed in this category.]
```

## Notes

- A Discord category is a container of channels. Enable Developer Mode to copy its ID.
- `$onlyForCategories` is broader than `$onlyForChannels` because it allows all channels inside an entire category.
- For channels with no parent category, the command is always stopped.
- Combine with `$onlyForChannels` for more granular rules (category + specific channels).
