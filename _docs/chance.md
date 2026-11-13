---
layout: doc
title: $chance[]
translation_key: docs
category: "Lists & Helpers"
function_name: chance
syntax: $chance[percent]
description: "Returns `true` with the given probability. `$chance[25]` is true one time out of four."
---
# $chance — Returns `true` with the given probability

## Syntax

```
$chance[percent]
```

## Parameters

- **percent** *(number, required)* — From 0 to 100.

## Return Value

- `true` or `false`.

## Usage

```
$if[$chance[10]==true]Rare drop!$endif
```

## Example

```bdfd
$if[$chance[10]==true]
  $sendMessage[Rare drop!]
$else
  $sendMessage[Common drop.]
$endif
```
