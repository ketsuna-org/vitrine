---
layout: doc
title: $voteIsWeekend[]
translation_key: docs
category: "Webhooks"
function_name: voteIsWeekend
syntax: $voteIsWeekend
description: "Whether the vote was cast during the weekend. Read from the body of an inbound webhook."
---
# $voteIsWeekend — Whether the vote was cast during the weekend. Read from the body of an inbound webhook.

## Syntax

```
$voteIsWeekend
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$voteIsWeekend → result
```

## Example

```bdfd
$sendMessage[$voteIsWeekend]
```
