---
layout: doc
title: $isOwner[]
translation_key: docs
category: "Server Helpers"
function_name: isOwner
syntax: $isOwner[(userID)]
description: "Tells whether a user owns the server."
---
# $isOwner — Tells whether a user owns the server

## Syntax

```
$isOwner[(userID)]
```

## Parameters

- **userID** *(ID, optional)* — Default: the author of the command.

## Return Value

- `true` or `false`.

## Usage

```
$onlyIf[$isOwner==true;Only the owner can do this.]
```

## Example

```bdfd
$sendMessage[$onlyIf[$isOwner==true;Only the owner can do this.]]
```
