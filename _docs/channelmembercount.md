---
layout: doc
title: $channelMemberCount[]
translation_key: docs
category: "Entity Info"
function_name: channelMemberCount
syntax: $channelMemberCount[(channelID)]
description: "Alias of $channelVoiceMemberCount."
---
# $channelMemberCount — Alias of $channelVoiceMemberCount.

## Syntax

```
$channelMemberCount[(channelID)]
```

## Parameters

- **channelID** *(String, optional)* — Voice channel ID (empty: the current channel)

## Return Value

- Number.

## Usage

```
$channelMemberCount[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelMemberCount[channelID]]
```
