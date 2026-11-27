---
layout: doc
title: $setGuildPreferredLocale[]
translation_key: docs
category: "Moderation"
function_name: setGuildPreferredLocale
syntax: $setGuildPreferredLocale[guildID;(locale);(reason)]
description: "Sets the preferred locale of a guild, returns bool."
---
# $setGuildPreferredLocale — Sets the preferred locale of a guild, returns bool.

## Syntax

```
$setGuildPreferredLocale[guildID;(locale);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to set preferred locale on
- **locale** *(text, optional)* — The new preferred locale
- **reason** *(text, optional)* — The reason for this action

## Return Value

- Boolean.

## Usage

```
$setGuildPreferredLocale[guildID;(locale);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setGuildPreferredLocale[10;fr]]
```
