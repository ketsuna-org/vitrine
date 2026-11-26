---
layout: doc
title: $oldGuild[]
translation_key: docs
category: "Events"
function_name: oldGuild
syntax: $oldGuild[property;(separator)]
description: "Previous state of the server before an update (guildUpdate). Properties: id, name, ownerID, memberCount, systemChannelID, preferredLocale."
---
# $oldGuild — Previous state of the server before an update (guildUpdate). Properties: id, name, ownerID, memberCount, systemChannelID, preferredLocale.

## Syntax

```
$oldGuild[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$oldGuild[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$oldGuild[property;(separator)]]
```
