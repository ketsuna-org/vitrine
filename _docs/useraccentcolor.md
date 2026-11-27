---
layout: doc
title: $userAccentColor[]
translation_key: docs
category: "Entity Info"
function_name: userAccentColor
syntax: $userAccentColor[userID]
description: "Returns the accent color of a user."
---
# $userAccentColor — Returns the accent color of a user.

## Syntax

```
$userAccentColor[userID]
```

## Parameters

- **userID** *(id, required)* — The user to retrieve the accent color

## Return Value

- Color.

## Usage

```
$userAccentColor[userID] → result
```

## Example

```bdfd
$sendMessage[$userAccentColor]
```
