---
layout: doc
title: $sendToSetting[]
translation_key: docs
category: "Embed & Message"
function_name: sendToSetting
syntax: $sendToSetting[variable;text;(scope);(target);(guildID)]
description: "Sends a message to the channel stored in a setting. Does nothing while the setting is empty or is not a channel."
---
# $sendToSetting — Sends a message to the channel stored in a setting

## Syntax

```
$sendToSetting[variable;text;(scope);(target);(guildID)]
```

## Parameters

- **variable** *(text, required)* — The setting that holds a channel ID (or a `<#ID>` mention).
- **text** *(text, required)* — The message.
- **scope** *(text, optional)* — Default: `server`.
- **target** *(ID, optional)* — Same as `$increment`.
- **guildID** *(ID, optional)* — Same as `$increment`.

## Return Value

- empty.

## Usage

```
$sendToSetting[logChannel;Member banned]
```

## Example

```bdfd
$sendToSetting[logChannel;Member banned]
```
