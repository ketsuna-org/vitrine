---
layout: doc
title: $api[]
translation_key: docs
category: "API"
function_name: api
syntax: $api[route;method;(params...);(body);(reason)]
description: "Calls the Discord API with a route name from discord-api-types (allow-listed routes only)."
---
# $api — Calls the Discord API with a route name from discord-api-types (allow-listed routes only).

## Syntax

```
$api[route;method;(params...);(body);(reason)]
```

## Parameters

- **route** *(text, required)* — Route name, e.g. guild, guildRoles, channelMessage.
- **method** *(text, required)* — GET, POST, PUT, PATCH or DELETE.
- **params...** *(text, optional)* — The route identifiers, in order (the guild ID, then the role ID...).
- **body** *(json, optional)* — JSON body for POST, PUT and PATCH.
- **reason** *(text, optional)* — Audit log reason.

## Return Value

- JSON.

## Usage

```
$api[route;method;params...;(body);(reason)] → JSON of the answer
```

## Notes

- Only the routes of the list below are sent, and only the ones a bot may use: servers, channels, roles, members, emojis, stickers, events, AutoMod, webhooks, invites, templates. Anything else (`/users/@me` writes, deleting a server, OAuth2, application commands) is refused before it leaves.
- The answer is JSON: read it with `$let` and `$env[name;key]`, or `$jsonParse`. Webhook tokens are removed from every answer.
- A command makes 25 calls at most. A Discord error stops the script with a clear message and is never posted in a channel.
- Route names: applicationEmoji, applicationEmojis, channel, channelFollowers, channelInvites, channelMessage, channelMessages, channelPermission, channelPins, channelThreads, channelTyping, channelWebhooks, currentApplication, guild, guildAutoModerationRule, guildAutoModerationRules, guildBan, guildBans, guildChannels, guildEmoji, guildEmojis, guildInvites, guildMember, guildMembers, guildMembersSearch, guildOnboarding, guildPreview, guildPrune, guildRole, guildRoles, guildScheduledEvent, guildScheduledEvents, guildSoundboardSound, guildSoundboardSounds, guildSticker, guildStickers, guildTemplate, guildTemplates, guildVanityUrl, guildVoiceState, guildWebhooks, guildWelcomeScreen, guildWidgetJSON, guildWidgetSettings, invite, sticker, stageInstance, stageInstances, template, threadMembers, threadMembersUser, threads, user, webhook.

## Example

```bdfd
$let[server;$api[guild;GET;10]]
$sendMessage[Server: $env[server;name]]
```
