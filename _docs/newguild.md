---
layout: doc
title: $newGuild[]
translation_key: docs
category: "Events"
function_name: newGuild
syntax: $newGuild[property;(separator)]
description: "State of the server after an update (guildUpdate). Properties: id, name, ownerID, memberCount, systemChannelID, preferredLocale."
---
# $newGuild — State of the server after an update (guildUpdate). Properties: id, name, ownerID, memberCount, systemChannelID, preferredLocale.

## Syntax

```
$newGuild[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$newGuild[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$newGuild[property;(separator)]]
```
