---
layout: doc
title: $onlyNSFW
translation_key: docs
category: "Moderation"
function_name: onlyNSFW
syntax: $onlyNSFW[errorMessage]
description: Guard function that stops execution if the current channel is not marked as NSFW, optionally sending an error message.
---

# $onlyNSFW

The guard function `$onlyNSFW` checks that the channel where the command is executed is marked as **NSFW** (Not Safe For Work) on Discord. If the channel is not NSFW, the command is interrupted and `errorMessage` is output.

## Syntax

```
$onlyNSFW[errorMessage]
```

## Parameters

| Parameter | Description |
|---|---|
| `errorMessage` | Required (may be empty: `$onlyNSFW[]`). Message output when the channel is not NSFW. |

A bare `$onlyNSFW` (no brackets) is invalid: it takes exactly one argument.

## Behavior

- If the channel is NSFW, the command continues normally.
- If the channel is **not** NSFW, the command is interrupted (implicit `$stop`) and `errorMessage` is output in place of the response; with an empty `errorMessage` nothing is displayed.
- Comparable to `$onlyIf[$channelNSFW==true;errorMessage]`, but for a thread the NSFW flag of its parent channel is used, and the guard also stops when the channel cannot be found.

## Examples

### NSFW-only command

```bdfd
$onlyNSFW[This command only works in NSFW channels.]
$sendMessage[This content is visible only in NSFW channels.]
```

### Manual check with a custom error message

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

- Pass an empty `errorMessage` (`$onlyNSFW[]`) for a silent guard.
- NSFW marking is configured in the Discord channel settings (Channel Settings → Overview → NSFW Channel).
- Use `$channelNSFW` for an inline check without interrupting the command.
- For a thread, the NSFW status of its parent channel is used.
