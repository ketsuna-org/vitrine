---
layout: doc
title: $applicationSubCommandName[]
translation_key: docs
category: "Interactions"
function_name: applicationSubCommandName
syntax: $applicationSubCommandName
description: "Name of the subcommand being run."
---
# $applicationSubCommandName — Name of the subcommand being run.

## Syntax

```
$applicationSubCommandName
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$applicationSubCommandName → result
```

## Example

```bdfd
$sendMessage[$applicationSubCommandName]
```
