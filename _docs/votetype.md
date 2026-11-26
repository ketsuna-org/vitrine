---
layout: doc
title: $voteType[]
translation_key: docs
category: "Webhooks"
function_name: voteType
syntax: $voteType
description: "Type of the vote: upvote, or test for a test sent from Top.gg. Read from the body of an inbound webhook."
---
# $voteType — Type of the vote: upvote, or test for a test sent from Top.gg. Read from the body of an inbound webhook.

## Syntax

```
$voteType
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$voteType → result
```

## Example

```bdfd
$sendMessage[$voteType]
```
