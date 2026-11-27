---
layout: doc
title: $localFunction[]
translation_key: docs
category: "Control Flow"
function_name: localFunction
syntax: $localFunction[name;code;(params...)]
description: "Defines a new local function"
---
# $localFunction — Defines a new local function

## Syntax

```
$localFunction[name;code;(params...)]
```

## Parameters

- **name** *(text, required)* — The local function name
- **code** *(text, required)* — The local function code
- **params...** *(text, optional)* — The local function params

## Return Value

- String.

## Usage

```
$localFunction[name;code;(params...)] → result
```

## Example

```bdfd
$sendMessage[$localFunction[double;$calculate[$env[n]*2];n]$callLocalFunction[double;21]]
```
