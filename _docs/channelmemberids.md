---
layout: doc
title: $channelMemberIDs[]
translation_key: docs
category: "Entity Info"
function_name: channelMemberIDs
syntax: $channelMemberIDs[(channelID);(separator)]
description: "Alias of $channelVoiceMemberIDs."
---
# $channelMemberIDs — Alias of $channelVoiceMemberIDs.

## Syntax

```
$channelMemberIDs[(channelID);(separator)]
```

## Parameters

- **channelID** *(String, optional)* — Voice channel ID (empty: the current channel)
- **separator** *(String, optional)* — Separator (default ", ")

## Return Value

- String.

## Usage

```
$channelMemberIDs[channelID;separator] → result
```

## Example

```bdfd
$sendMessage[$channelMemberIDs[channelID;separator]]
```
