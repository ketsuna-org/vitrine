---
layout: doc
title: $lockChannel[]
translation_key: docs
category: "Server Helpers"
function_name: lockChannel
syntax: $lockChannel[(channelID);(roleOrUserID)]
description: "Denies sending messages (and messages in threads) for a role, a member or `@everyone`."
---
# $lockChannel — Denies sending messages (and messages in threads) for a role, a member or `@everyone`

## Syntax

```
$lockChannel[(channelID);(roleOrUserID)]
```

## Parameters

- **channelID** *(ID, optional)* — Default: the current channel.
- **roleOrUserID** *(ID, optional)* — Default: `@everyone`.

## Return Value

- empty.

## Usage

```
$lockChannel[]
$lockChannel[123456;789]
```

## Important Notes

- The bot needs Manage Roles on the channel.
- Only this one override is changed; the other overrides of the channel are kept.

## Example

```bdfd
$sendMessage[$lockChannel[]]
```
