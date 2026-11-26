---
layout: doc
title: $guildNameAcronym[]
translation_key: docs
category: "Entity Info"
function_name: guildNameAcronym
syntax: $guildNameAcronym[guildID]
description: "Returns the server name acronym."
---
# $guildNameAcronym — Returns the server name acronym.

## Syntax

```
$guildNameAcronym[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- String.

## Usage

```
$guildNameAcronym[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildNameAcronym]
```
