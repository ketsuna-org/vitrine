---
layout: doc
title: $applicationSubCommandGroupName[]
translation_key: docs
category: "Interactions"
function_name: applicationSubCommandGroupName
syntax: $applicationSubCommandGroupName
description: "Name of the subcommand group being run."
---
# $applicationSubCommandGroupName — Name of the subcommand group being run.

## Syntax

```
$applicationSubCommandGroupName
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$applicationSubCommandGroupName → result
```

## Example

```bdfd
$sendMessage[$applicationSubCommandGroupName]
```
