---
layout: doc
title: $emojiRoles[]
translation_key: docs
category: "Moderation"
function_name: emojiRoles
syntax: $emojiRoles[emojiID;(separator)]
description: "Returns the role ids that can use this emote."
---
# $emojiRoles — Returns the role ids that can use this emote.

## Syntax

```
$emojiRoles[emojiID;(separator)]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to return its roles
- **separator** *(text, optional)* — The separator to use for every role

## Return Value

- Role[].

## Usage

```
$emojiRoles[emojiID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$emojiRoles[70001;,]]
```
