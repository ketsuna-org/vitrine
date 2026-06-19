---
layout: doc
title: $onlyBotChannelPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotChannelPerms
syntax: $onlyBotChannelPerms[permission1;permission2;...;(errorMessage)]
description: A guard function that stops execution if the bot does not have the specified permissions in the current channel.
---

# $onlyBotChannelPerms

The guard function `$onlyBotChannelPerms` checks if the **bot** has the specified permissions **in the current channel**. Unlike `$onlyBotPerms` which checks server-wide permissions, this function respects channel permission overwrites.

## Syntax

```
$onlyBotChannelPerms[permission1;permission2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | Channel permissions that the bot must have in this channel. Separator `;`. |
| `errorMessage` | String (optional) | The message sent if the bot lacks any of the permissions. |

## Behavior

- Checks the effective permissions of the bot in the **channel where the command is executed**.
- Takes channel overwrites into account (specific channel permissions modifying role inheritance).
- If any permission is missing, the command execution is halted.
- Works even if the bot has the permission server-wide, but the channel has a deny overwrite.

## Examples

### Checking embed creation capability

```bdfd
$onlyBotChannelPerms[SendMessages;EmbedLinks;❌ I cannot post embeds in this channel.]
$title[Announcement]
$description[This is an important announcement.]
$color[#5865F2]
$sendMessage[]
```

### Checking voice permissions

```bdfd
$onlyBotChannelPerms[Connect;Speak;❌ I do not have access to this voice channel.]
$joinVC[$voiceChannelID]
$sendMessage[Connecting to the voice channel...]
```

### File uploads

```bdfd
$onlyBotChannelPerms[AttachFiles;❌ I cannot send files here.]
$attachment[./report.pdf]
$sendMessage[Here is the report.]
```

## Notes

- `$onlyBotChannelPerms` checks **channel** permissions, while `$onlyBotPerms` checks **server** permissions.
- Channel permissions include: `SendMessages`, `EmbedLinks`, `AttachFiles`, `AddReactions`, `UseExternalEmojis`, `Connect`, `Speak`, `Stream`, `UseVAD`, `PrioritySpeaker`, `MuteMembers`, `DeafenMembers`, `MoveMembers`, `ViewChannel`, `ReadMessageHistory`, `SendTTSMessages`, `UseApplicationCommands`, `ManageMessages`, `ManageChannels`, `CreateInstantInvite`, `UseEmbeddedActivities`.
- Combine with `$onlyBotPerms` for a complete check (server + channel).
