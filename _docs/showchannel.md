---
layout: doc
title: $showChannel[]
translation_key: docs
category: "Server Helpers"
function_name: showChannel
syntax: $showChannel[(channelID);(roleOrUserID)]
description: "Removes that denial for a role, a member or `@everyone`."
---
# $showChannel — Removes that denial for a role, a member or `@everyone`

## Syntax

```
$showChannel[(channelID);(roleOrUserID)]
```

## Parameters

- **channelID** *(ID, optional)* — Default: the current channel.
- **roleOrUserID** *(ID, optional)* — Default: `@everyone`.

## Return Value

- empty.

## Usage

```
$showChannel[]
$showChannel[123456;789]
```

## Important Notes

- The bot needs Manage Roles on the channel.
- Only this one override is changed; the other overrides of the channel are kept.

## Example

```bdfd
$showChannel[]
$sendMessage[Channel shown.]
```
