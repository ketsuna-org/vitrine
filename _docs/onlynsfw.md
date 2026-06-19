---
layout: doc
title: $onlyNSFW
translation_key: docs
category: "Moderation"
function_name: onlyNSFW
syntax: $onlyNSFW
description: Guard function that stops execution if the current channel is not marked as NSFW.
---

# $onlyNSFW

The guard function `$onlyNSFW` checks that the channel where the command is executed is marked as **NSFW** (Not Safe For Work) on Discord. If the channel is not NSFW, the command is silently interrupted.

## Syntax

```
$onlyNSFW
```

## Parameters

No parameters. `$onlyNSFW` is used alone, without arguments.

## Behavior

- If the channel is NSFW, the command continues normally.
- If the channel is **not** NSFW, the command is interrupted (implicit `$stop`), without an error message by default.
- Equivalent to `$onlyIf[$channelNSFW==true]` but more concise.

## Examples

### NSFW-only command

```bdfd
$onlyNSFW
$sendMessage[This content is visible only in NSFW channels.]
```

### With custom error message

```bdfd
$if[$channelNSFW==false]
  $sendMessage[❌ Switch to an NSFW channel to use this command.]
  $stop
$endif
$sendMessage[NSFW content.]
```

### Content filtering

```bdfd
$if[$channelNSFW==true]
  $sendMessage[🔞 Search result...]
$else
  $sendMessage[Filtered search (SFW mode)...]
$endif
```

## Notes

- `$onlyNSFW` is silent: no error message is sent by default. To inform the user, use the manual condition with `$channelNSFW`.
- NSFW marking is configured in the Discord channel settings (Channel Settings → Overview → NSFW Channel).
- Use `$channelNSFW` for an inline check without interrupting the command.
- Compatible with text channels only. Threads inherit the NSFW status of their parent channel.
