---
layout: doc
title: $voteQuery[]
translation_key: docs
category: "Webhooks"
function_name: voteQuery
syntax: $voteQuery
description: "Query string Top.gg passes along with the vote. Read from the body of an inbound webhook."
---
# $voteQuery — Query string Top.gg passes along with the vote. Read from the body of an inbound webhook.

## Syntax

```
$voteQuery
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$voteQuery → result
```

## Example

```bdfd
$sendMessage[$voteQuery]
```
