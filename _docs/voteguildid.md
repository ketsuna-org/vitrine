---
layout: doc
title: $voteGuildID[]
translation_key: docs
category: "Webhooks"
function_name: voteGuildID
syntax: $voteGuildID
description: "ID of the server that was voted for (server votes). Read from the body of an inbound webhook."
---
# $voteGuildID — ID of the server that was voted for (server votes). Read from the body of an inbound webhook.

## Syntax

```
$voteGuildID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$voteGuildID → result
```

## Example

```bdfd
$sendMessage[$voteGuildID]
```
