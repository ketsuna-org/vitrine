---
layout: doc
title: $automodRuleID[]
translation_key: docs
category: "Events"
function_name: automodRuleID
syntax: $automodRuleID
description: "ID of the rule that fired or changed. (AutoMod events)."
---
# $automodRuleID — ID of the rule that fired or changed. (AutoMod events).

## Syntax

```
$automodRuleID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$automodRuleID → result
```

## Example

```bdfd
$sendMessage[$automodRuleID]
```
