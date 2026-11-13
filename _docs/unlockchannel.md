---
layout: doc
title: $unlockChannel[]
translation_key: docs
category: "Server Helpers"
function_name: unlockChannel
syntax: $unlockChannel[(channelID);(roleOrUserID)]
description: "Removes that denial (the channel goes back to its category / server settings) for a role, a member or `@everyone`."
---
# $unlockChannel — Removes that denial (the channel goes back to its category / server settings) for a role, a member or `@everyone`

## Syntax

```
$unlockChannel[(channelID);(roleOrUserID)]
```

## Parameters

- **channelID** *(ID, optional)* — Default: the current channel.
- **roleOrUserID** *(ID, optional)* — Default: `@everyone`.

## Return Value

- empty.

## Usage

```
$unlockChannel[]
$unlockChannel[123456;789]
```

## Important Notes

- The bot needs Manage Roles on the channel.
- Only this one override is changed; the other overrides of the channel are kept.

## Example

```bdfd
$unlockChannel[]
$sendMessage[Channel unlocked.]
```
