---
layout: doc
title: $oldUser[]
translation_key: docs
category: "Events"
function_name: oldUser
syntax: $oldUser[property;(separator)]
description: "Previous state of the user before an update (userUpdate). Properties: id, username, displayName, globalName, discriminator, tag, avatar, banner, accentColor, timestamp."
---
# $oldUser — Previous state of the user before an update (userUpdate). Properties: id, username, displayName, globalName, discriminator, tag, avatar, banner, accentColor, timestamp.

## Syntax

```
$oldUser[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$oldUser[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$oldUser[property;(separator)]]
```
