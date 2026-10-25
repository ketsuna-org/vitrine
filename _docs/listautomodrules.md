---
layout: doc
title: $listAutoModRules
translation_key: docs
category: "AutoMod"
function_name: listAutoModRules
syntax: $listAutoModRules
description: Returns the guild's AutoMod rules as a JSON array.
---

# $listAutoModRules

Returns the guild's AutoMod rules as a JSON array. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$listAutoModRules
```

## Return Value

- **Type**: String (JSON)
- A JSON array of the rules; an empty array when there are none. Read it with the `$json` functions.

## Behavior

- The bot needs Manage Server in the guild.

## Examples

```bdfd
$jsonParse[$listAutoModRules]
$jsonArrayCount
```
