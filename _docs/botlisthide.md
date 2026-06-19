---
layout: doc
title: $botListHide
translation_key: docs
category: "Entity Info"
function_name: botListHide
syntax: $botListHide
description: Hides the bot from the public BDFD bot list.
---

# $botListHide

The `$botListHide` function **removes the bot from the public BDFD bot list**. Once hidden, the bot will no longer appear in the community directory.

## Syntax

```
$botListHide
```

## Parameters

None.

## Return value

None. The bot is hidden from the public list.

## Behavior

- Irreversible action via script (contact support to make the bot visible again).
- The bot continues to function normally.
- Only visibility in the BDFD directory is affected.

## Examples

### Simple hiding

```bdfd
$botListHide
$sendMessage[🔒 The bot has been removed from the public BDFD list.]
```

### Secured owner command

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ This command is reserved for the owner.]
  $stop
$endif

$botListHide
$sendMessage[✅ **$botName** has been hidden from the BDFD bot list.
⚠️ This action is permanent. Contact support to undo.]
```

### Configuration panel

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Reserved for the owner.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==hide]
  $botListHide
  $sendMessage[🔒 Bot hidden.]
$elseif[$var[action]==desc]
  $botListDescription[$message[2]]
  $sendMessage[📝 Description updated.]
$else
  $sendMessage[❌ Usage: !botconfig <hide|desc> [text]]
$endif
```

## Notes

- `$botListHide` is permanent via script.
- To manage the description, use `$botListDescription[]`.
- The bot remains fully functional even when hidden.
- Use this function if you do not want your bot to appear in the public directory.
