---
layout: doc
title: $userGuildBadge[]
translation_key: docs
category: "Entity Info"
function_name: userGuildBadge
syntax: $userGuildBadge[userID;(size);(extension)]
description: "Returns the primary guild tag badge of a user."
---
# $userGuildBadge — Returns the primary guild tag badge of a user.

## Syntax

```
$userGuildBadge[userID;(size);(extension)]
```

## Parameters

- **userID** *(id, required)* — The user to get its primary guild
- **size** *(number, optional)* — The size to use for the image
- **extension** *(text, optional)* — The extension to use for the image

## Return Value

- URL.

## Usage

```
$userGuildBadge[userID;(size);(extension)] → result
```

## Example

```bdfd
$sendMessage[$userGuildBadge]
```
