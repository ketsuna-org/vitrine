---
layout: doc
title: $channelVoiceMemberCount[]
translation_key: docs
category: "Entity Info"
function_name: channelVoiceMemberCount
syntax: $channelVoiceMemberCount[(channelID)]
description: "Number of members connected to a voice channel."
---
# $channelVoiceMemberCount — Number of members connected to a voice channel.

## Syntax

```
$channelVoiceMemberCount[(channelID)]
```

## Parameters

- **channelID** *(String, optional)* — Voice channel ID (empty: the current channel)

## Return Value

- Number.

## Usage

```
$channelVoiceMemberCount[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelVoiceMemberCount[channelID]]
```
