---
layout: doc
title: $newUser[]
translation_key: docs
category: "Events"
function_name: newUser
syntax: $newUser[property;(separator)]
description: "State of the user after an update (userUpdate). Properties: id, username, displayName, globalName, discriminator, tag, avatar, banner, accentColor, timestamp."
---
# $newUser — State of the user after an update (userUpdate). Properties: id, username, displayName, globalName, discriminator, tag, avatar, banner, accentColor, timestamp.

## Syntax

```
$newUser[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$newUser[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$newUser[property;(separator)]]
```
