---
layout: doc
title: $voteUserID[]
translation_key: docs
category: "Webhooks"
function_name: voteUserID
syntax: $voteUserID
description: "ID of the user who voted. Read from the body of an inbound webhook."
---
# $voteUserID — ID of the user who voted. Read from the body of an inbound webhook.

## Syntax

```
$voteUserID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$voteUserID → result
```

## Example

```bdfd
$sendMessage[$voteUserID]
```
