---
layout: doc
title: $userDefaultAvatar[]
translation_key: docs
category: "Entity Info"
function_name: userDefaultAvatar
syntax: $userDefaultAvatar[userID]
description: "Returns the default user avatar."
---
# $userDefaultAvatar — Returns the default user avatar.

## Syntax

```
$userDefaultAvatar[userID]
```

## Parameters

- **userID** *(id, required)* — The user to retrieve the default avatar

## Return Value

- URL.

## Usage

```
$userDefaultAvatar[userID] → result
```

## Example

```bdfd
$sendMessage[$userDefaultAvatar]
```
