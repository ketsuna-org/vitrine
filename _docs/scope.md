---
layout: doc
title: $scope[]
translation_key: docs
category: "Control Flow"
function_name: scope
syntax: $scope[code;(syncvars)]
description: "Runs functions in a cloned context"
---
# $scope — Runs functions in a cloned context

## Syntax

```
$scope[code;(syncvars)]
```

## Parameters

- **code** *(text, required)* — The code to execute
- **syncvars** *(boolean, optional)* — Whether to pass vars as reference

## Return Value

- Unknown.

## Usage

```
$scope[code;(syncvars)] → result
```

## Example

```bdfd
$sendMessage[$let[a;1]$scope[$let[a;2]$let[b;3];b]$get[a]$get[b]]
```
