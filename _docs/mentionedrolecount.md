---
layout: doc
title: $mentionedRoleCount[]
translation_key: docs
category: "Entity Info"
function_name: mentionedRoleCount
syntax: $mentionedRoleCount
description: "Returns the mentioned role count"
---
# $mentionedRoleCount — Returns the mentioned role count

## Syntax

```
$mentionedRoleCount
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$mentionedRoleCount → result
```

## Example

```bdfd
$sendMessage[$mentionedRoleCount]
```
