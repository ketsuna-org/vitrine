---
layout: doc
title: $automodContent[]
translation_key: docs
category: "Events"
function_name: automodContent
syntax: $automodContent
description: "Content that triggered the rule. (AutoMod events)."
---
# $automodContent — Content that triggered the rule. (AutoMod events).

## Syntax

```
$automodContent
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$automodContent → result
```

## Example

```bdfd
$sendMessage[$automodContent]
```
