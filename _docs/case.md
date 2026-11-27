---
layout: doc
title: $case[]
translation_key: docs
category: "Control Flow"
function_name: case
syntax: $case[value;code]
description: "Adds a switch case"
---
# $case — Adds a switch case

## Syntax

```
$case[value;code]
```

## Parameters

- **value** *(text, required)* — The match case
- **code** *(text, required)* — Code to execute if it matches this case

## Return Value

- Unknown.

## Usage

```
$case[value;code] → result
```

## Example

```bdfd
$sendMessage[$switch[a;$case[a;one]$case[b;two]]]
```
