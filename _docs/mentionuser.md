---
layout: doc
title: $mentionUser[]
translation_key: docs
category: "Lists & Helpers"
function_name: mentionUser
syntax: $mentionUser[userID]
description: "Builds the mention of a user from their ID (`<@ID>`)."
---
# $mentionUser — Builds the mention of a user from their ID (`<@ID>`)

## Syntax

```
$mentionUser[userID]
```

## Parameters

- **userID** *(ID, required)* — A user ID. An empty value gives an empty result.

## Return Value

- string: `<@userID>`, or empty.

## Usage

```
$mentionUser[123456789] → "<@123456789>"
```

## Example

```bdfd
$sendMessage[$mentionUser[123456789]]
```
