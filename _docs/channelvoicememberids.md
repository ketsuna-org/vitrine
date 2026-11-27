---
layout: doc
title: $channelVoiceMemberIDs[]
translation_key: docs
category: "Entity Info"
function_name: channelVoiceMemberIDs
syntax: $channelVoiceMemberIDs[(channelID);(separator)]
description: "IDs of the members connected to a voice channel."
---
# $channelVoiceMemberIDs — IDs of the members connected to a voice channel.

## Syntax

```
$channelVoiceMemberIDs[(channelID);(separator)]
```

## Parameters

- **channelID** *(String, optional)* — Voice channel ID (empty: the current channel)
- **separator** *(String, optional)* — Separator (default ", ")

## Return Value

- String.

## Usage

```
$channelVoiceMemberIDs[channelID;separator] → result
```

## Example

```bdfd
$sendMessage[$channelVoiceMemberIDs[channelID;separator]]
```
