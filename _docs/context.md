---
layout: doc
title: $context[]
translation_key: docs
category: "Interactions"
function_name: context
syntax: $context
description: "Where the interaction was run: Guild, or BotDM outside a server."
---
# $context — Where the interaction was run: Guild, or BotDM outside a server.

## Syntax

```
$context
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$context → result
```

## Example

```bdfd
$sendMessage[$context]
```
