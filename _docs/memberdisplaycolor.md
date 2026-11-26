---
layout: doc
title: $memberDisplayColor[]
translation_key: docs
category: "Entity Info"
function_name: memberDisplayColor
syntax: $memberDisplayColor[guildID;userID]
description: "Returns the display color of a member."
---
# $memberDisplayColor — Returns the display color of a member.

## Syntax

```
$memberDisplayColor[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to get its color

## Return Value

- Color.

## Usage

```
$memberDisplayColor[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberDisplayColor]
```
