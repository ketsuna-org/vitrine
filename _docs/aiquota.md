---
layout: doc
title: $aiQuota[]
translation_key: docs
category: "AI"
function_name: aiQuota
syntax: $aiQuota
description: "Returns the AI credits left on the account that owns the bot."
---
# $aiQuota — Returns the AI credits left on the account that owns the bot.

## Syntax

```
$aiQuota
```

## Parameters

None.

## Return Value

- The number of credits left (1 credit = 1000 tokens), for example `2.5`. `0` when unavailable.

## Usage

```
$aiQuota
```

## Important Notes

- Unlike BDFD there is no daily quota of 10,000 tokens: this is the balance of your AI credits (purchased, won on the roulette or granted).

## Example

```bdfd
$nomention
AI credits left: $aiQuota
```
