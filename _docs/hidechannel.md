---
layout: doc
title: $hideChannel[]
translation_key: docs
category: "Server Helpers"
function_name: hideChannel
syntax: $hideChannel[(channelID);(roleOrUserID)]
description: "Denies viewing the channel for a role, a member or `@everyone`."
---
# $hideChannel — Denies viewing the channel for a role, a member or `@everyone`

## Syntax

```
$hideChannel[(channelID);(roleOrUserID)]
```

## Parameters

- **channelID** *(ID, optional)* — Default: the current channel.
- **roleOrUserID** *(ID, optional)* — Default: `@everyone`.

## Return Value

- empty.

## Usage

```
$hideChannel[]
$hideChannel[123456;789]
```

## Important Notes

- The bot needs Manage Roles on the channel.
- Only this one override is changed; the other overrides of the channel are kept.

## Example

```bdfd
$hideChannel[]
$sendMessage[Channel hidden.]
```
