---
layout: doc
title: $getApplicationEmojis[]
translation_key: docs
category: "Entity Info"
function_name: getApplicationEmojis
syntax: $getApplicationEmojis[(property);(separator)]
description: "Gets all application emojis"
---
# $getApplicationEmojis — Gets all application emojis

## Syntax

```
$getApplicationEmojis[(property);(separator)]
```

## Parameters

- **property** *(text, optional)* — The property to return for every emoji
- **separator** *(text, optional)* — The separator to use for every emoji property

## Return Value

- Json.

## Usage

```
$getApplicationEmojis[(property);(separator)] → result
```

## Example

```bdfd
$sendMessage[$getApplicationEmojis[name]]
```
