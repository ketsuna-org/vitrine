---
layout: doc
title: $checkChannelPerms
translation_key: docs
category: "Permission"
function_name: checkChannelPerms
syntax: $checkChannelPerms[Channel ID;Permission1;Permission2]
description: Returns true when the @everyone role holds all the listed permissions in a channel, which tells a hidden or locked channel apart.
---

# $checkChannelPerms

Checks the permissions of the **@everyone role** in a channel (channel overwrites included).

## Syntax

```
$checkChannelPerms[Channel ID;Permission1;Permission2]
```

Add as many permission arguments as needed (at least one).

## Parameters

| Parameter | Description |
|---|---|
| `Channel ID` | Required. The channel ID, otherwise "Invalid Discord ID." is raised. |
| `Permission` | Required, one or more. Permission names such as `sendmessages` or `viewchannel`. An empty name raises "Permission is required."; an unknown one raises "Invalid permission.". |

## Return value

- `true` if everyone holds **all** the listed permissions in the channel, `false` otherwise.
- If the runtime cannot read @everyone permissions, the error "@everyone permissions are not available." is raised.

## Examples

```bdfd
$if[$checkChannelPerms[$channelID;viewchannel]==true]
  This channel is visible to everyone.
$else
  This channel is hidden.
$endif
```
