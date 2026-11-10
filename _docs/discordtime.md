---
layout: doc
title: $discordTime[]
translation_key: docs
category: "Lists & Helpers"
function_name: discordTime
syntax: $discordTime[timestamp;(format)]
description: "Builds a Discord dynamic timestamp (`<t:…>`) that each member sees in their own language and time zone."
---
# $discordTime — Builds a Discord dynamic timestamp (`<t:…>`) that each member sees in their own language and time zone

## Syntax

```
$discordTime[timestamp;(format)]
```

## Parameters

- **timestamp** *(integer, required)* — A unix timestamp in seconds (milliseconds are accepted).
- **format** *(`t` `T` `d` `D` `f` `F` or `R`, optional)* — `R` (default) is relative ("in 2 hours").

## Return Value

- string.

## Usage

```
$discordTime[1700000000] → "<t:1700000000:R>"
$discordTime[1700000000;F] → "<t:1700000000:F>"
```

## Example

```bdfd
$sendMessage[$discordTime[1700000000]]
```
