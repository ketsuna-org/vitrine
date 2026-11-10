---
layout: doc
title: $mentionRole[]
translation_key: docs
category: "Lists & Helpers"
function_name: mentionRole
syntax: $mentionRole[roleID]
description: "Builds the mention of a role from its ID, so you do not have to type `<@&ID>`."
---
# $mentionRole — Builds the mention of a role from its ID, so you do not have to type `<@&ID>`

## Syntax

```
$mentionRole[roleID]
```

## Parameters

- **roleID** *(ID, required)* — A role ID. An empty value gives an empty result.

## Return Value

- string: `<@&roleID>`, or empty when the ID is empty.

## Usage

```
$mentionRole[123456789] → "<@&123456789>"
$mentionRole[] → ""
```

## Important Notes

- An ID that is not a number raises the error "Invalid role ID.".

## Example

```bdfd
$sendMessage[$mentionRole[123456789]]
```
