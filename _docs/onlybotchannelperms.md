---
layout: doc
title: $onlyBotChannelPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotChannelPerms
syntax: $onlyBotChannelPerms[channelID;permission1;permission2;...;errorMessage]
description: A guard function that stops execution if the bot does not have the specified permissions in the current channel.
---

# $onlyBotChannelPerms

The guard function `$onlyBotChannelPerms` checks if the **bot** has the specified permissions **in a given channel**. Unlike `$onlyBotPerms` which checks server-wide permissions, this function respects channel permission overwrites.

## Syntax

```
$onlyBotChannelPerms[channelID;permission1;permission2;...;errorMessage]
```

At least 3 arguments are required: the channel, at least one permission, and the error message (which may be empty).

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `channelID` | String | Required. ID of the channel to check. If empty, the current channel is used. An invalid ID raises an error. |
| `permission1;permission2;...` | String[] | Required, at least one. Channel permissions that the bot must have in this channel. Separator `;`. An empty or unknown permission raises an error. |
| `errorMessage` | String | Required (the last argument, may be empty). The message output if the bot lacks any of the permissions. |

## Behavior

- Checks the effective permissions of the bot in the **channel given by `channelID`**.
- Takes channel overwrites into account (specific channel permissions modifying role inheritance).
- If any permission is missing, the command execution is halted and `errorMessage` is output.
- Works even if the bot has the permission server-wide, but the channel has a deny overwrite.

## Examples

### Checking embed creation capability

```bdfd
$onlyBotChannelPerms[$channelID;SendMessages;EmbedLinks;❌ I cannot post embeds in this channel.]
$title[Announcement]
$description[This is an important announcement.]
$color[#5865F2]
```

### Checking voice permissions

```bdfd
$onlyBotChannelPerms[123456789012345678;Connect;Speak;❌ I do not have access to this voice channel.]
$joinVoice[123456789012345678]
$sendMessage[Connecting to the voice channel...]
```

### File uploads

```bdfd
$onlyBotChannelPerms[$channelID;AttachFiles;❌ I cannot send files here.]
$addFile[https://example.com/report.pdf]
$sendMessage[Here is the report.]
```

## Notes

- `$onlyBotChannelPerms` checks **channel** permissions, while `$onlyBotPerms` checks **server** permissions.
- Channel permissions include: `SendMessages`, `EmbedLinks`, `AttachFiles`, `AddReactions`, `UseExternalEmojis`, `Connect`, `Speak`, `Stream`, `UseVAD`, `PrioritySpeaker`, `MuteMembers`, `DeafenMembers`, `MoveMembers`, `ViewChannel`, `ReadMessageHistory`, `SendTTSMessages`, `UseApplicationCommands`, `ManageMessages`, `ManageChannels`, `CreateInstantInvite`, `UseEmbeddedActivities`.
- Combine with `$onlyBotPerms` for a complete check (server + channel).
