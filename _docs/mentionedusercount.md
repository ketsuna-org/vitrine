---
layout: doc
title: $mentionedUserCount[]
translation_key: docs
category: "Entity Info"
function_name: mentionedUserCount
syntax: $mentionedUserCount
description: "Returns the mentioned user count"
---
# $mentionedUserCount — Returns the mentioned user count

## Syntax

```
$mentionedUserCount
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$mentionedUserCount → result
```

## Example

```bdfd
$sendMessage[$mentionedUserCount]
```
