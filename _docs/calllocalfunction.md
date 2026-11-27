---
layout: doc
title: $callLocalFunction[]
translation_key: docs
category: "Control Flow"
function_name: callLocalFunction
syntax: $callLocalFunction[name;(args...)]
description: "Calls a local function"
---
# $callLocalFunction — Calls a local function

## Syntax

```
$callLocalFunction[name;(args...)]
```

## Parameters

- **name** *(text, required)* — The local function name
- **args...** *(text, optional)* — The args to call this local function with

## Return Value

- Unknown.

## Usage

```
$callLocalFunction[name;(args...)] → result
```

## Example

```bdfd
$sendMessage[$localFunction[greet;Hello $env[who];who]$callLocalFunction[greet;Ana]]
```
