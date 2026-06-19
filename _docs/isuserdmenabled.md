---
layout: doc
title: $isUserDmEnabled
translation_key: docs
category: "Math & Text"
function_name: isUserDmEnabled
syntax: $isUserDmEnabled[userID]
description: Checks if the private messages (DMs) of a user are open.
---

# $isUserDmEnabled

The function `$isUserDmEnabled[userID]` checks if a user accepts private messages (DMs) from members of the same server or from the bot.

## Syntax

```
$isUserDmEnabled[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to check. |

## Return Value

- **Type**: Boolean
- `true` if the user's DMs are open to the bot.
- `false` if the DMs are closed or inaccessible.

## Behavior

- Checks if the bot can send a private message to this user.
- A user can close their DMs via their Discord privacy settings.
- The bot must share at least one server with the user.

## Examples

### Conditional notification

```bdfd
$if[$isUserDmEnabled[$mentioned[1]]==true]
  $sendDM[$mentioned[1];📬 You have received a warning on **$serverName**: $message[2]]
  $sendMessage[✅ Warning sent in DMs to <@$mentioned[1]>.]
$else
  $sendMessage[⚠️ Cannot send a DM to <@$mentioned[1]>. Public notification instead.]
$endif
```

### Check before sending

```bdfd
$var[userID;$mentioned[1]]
$var[contenu;$message[2]]
$if[$isUserDmEnabled[$var[userID]]==true]
  $sendDM[$var[userID];$var[contenu]]
  $sendEphemeral[✅ Message sent privately.]
$else
  $sendEphemeral[❌ This user has disabled their DMs.]
$endif
```

### Notification loop

```bdfd
$for[i;1;$mentionedCount;1]
  $if[$isUserDmEnabled[$mentioned[$for[i]]]==true]
    $sendDM[$mentioned[$for[i]];Reminder: meeting tomorrow at 14:00]
  $endif
$endfor
$sendMessage[✅ Reminders sent to the available members.]
```

## Notes

- DMs can be closed by user privacy settings.
- The bot cannot force open a user's DMs.
- To send a private message, use `$sendDM[]`.
- If DMs are closed, `$sendDM[]` will fail silently.
