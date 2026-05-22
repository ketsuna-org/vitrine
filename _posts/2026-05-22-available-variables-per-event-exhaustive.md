---
title: Available Variables per Event (Exhaustive)
description: Liste of available Variable per events
date: 2026-05-22T03:58:00.000+02:00
author: Garder500
translation_key: EN
locale: en
content_language: en
layout: post
toc: true
---
Event variables are resolved in templates using the ((variableName)) syntax. They are automatically injected by the Runner's event dispatcher whenever the corresponding event occurs on Discord.

---

## 1. Always Available Global Variables

These base variables are provided with **all** events triggered by the Discord Gateway.

| Variable | Type | Description |
| --- | --- | --- |
| ((event.name)) | string | Name of the triggered event (e.g., messageCreate, guildMemberAdd, voiceStateUpdate). |
| ((timestamp)) | string | Exact execution timestamp (in milliseconds since the epoch). |
| ((actualTime)) | string | Event date and time formatted in ISO8601. |
| ((guildId)) | string | ID of the concerned server (if applicable, empty otherwise). |
| ((channelId)) | string | ID of the concerned channel (if applicable, empty otherwise). |
| ((userId)) | string | ID of the concerned user/initiator (if applicable, empty otherwise). |
| ((workflow.type)) | string | Set to event for all events. |
| ((bot.uptime)) | string | Bot uptime in milliseconds. |

---

## 2. Bot Application Variables

These details characterize the running bot and are injected into every event.

| Variable | Type | Description |
| --- | --- | --- |
| ((bot.id)) | string | Unique Snowflake ID of the bot. |
| ((bot.username)) | string | Username of the bot. |
| ((bot.guildCount)) | string | Total number of servers where the bot is installed. |
| ((bot.guildNames)) | string | List of server names (separated by commas). |
| ((bot.invite)) | string | OAuth2 invitation link for the bot. |
| ((bot.ping)) / ((ping)) | string | Discord Gateway latency in milliseconds. |
| ((bot.shardId)) | string | ID of the current Shard (usually 0). |
| ((bot.nodeVersion)) | string | Version of the execution engine (e.g., Dart 3.x.x). |

---

## 3. Automatic Context Hydration (Server, Channel, Member)

If the event provides a server ID (guildId), channel ID (channelId), or user ID (userId), the engine automatically extracts the following sets of variables:

### Server Context (guild.*)

*Available if guildId is provided.*

* ((guild.id)) : Unique ID of the server.
* ((guild.name)) : Name of the server.
* ((guild.memberCount)) / ((guild.count)) : Server member count.
* ((guild.ownerId)) : ID of the server owner.
* ((guild.preferredLocale)) : Preferred language of the server.
* ((guild.description)) : Server description (if defined).
* ((guild.vanityUrlCode)) : Custom vanity invite code (if defined).
* ((guild.verificationLevel)) : Verification level of the server.
* ((guild.mfaLevel)) : Required Multi-Factor Authentication level.
* ((guild.nsfwLevel)) : NSFW filtering level.
* ((guild.premiumTier)) : Server Boost tier.
* ((guild.premiumSubscriptionCount)) : Current number of Boosts.
* ((guild.features)) : Enabled server features (separated by commas).
* ((guild.features.count)) : Number of enabled features.
* ((guild.systemChannelId)) : ID of the system channel.
* ((guild.rulesChannelId)) : ID of the rules channel.
* ((guild.afkChannelId)) : ID of the AFK channel.
* ((guild.afkTimeout)) : AFK timeout duration (in seconds).
* ((guild.icon)) : URL of the server icon.
* ((guild.roleCount)) : Total number of roles.
* ((guild.roleNames)) : List of all role names on the server (separated by commas).
* ((guild.stickerCount)) : Total number of stickers.
* ((guild.emojiCount)) : Total number of custom emojis.

### Channel Context (channel.*)

*Available if channelId is provided.*

* ((channel.id)) : ID of the channel.
* ((channel.name)) : Name of the channel (or DM if it is a private message).
* ((channel.type)) / ((channel.typeValue)) : Channel type (e.g., 0 = text, 2 = voice).
* ((channel.topic)) : Channel topic/description.
* ((channel.parentId)) / ((channel.categoryId)) : ID of the parent category.
* ((channel.position)) : Position in the channel list.
* ((channel.nsfw)) : true if the channel is NSFW, otherwise false.
* ((channel.slowmode)) : Slowmode duration (in seconds).
* ((channel.bitrate)) : Bitrate of the voice/stage channel (in bps).
* ((channel.userLimit)) : Maximum user limit allowed in the voice channel.
* ((channel.mention)) : Clickable mention of the channel (e.g., <#123456>).
* ((channel.thread.archived)) : true if the thread is archived, otherwise false.
* ((channel.thread.locked)) : true if the thread is locked, otherwise false.
* ((channel.thread.ownerId)) : ID of the thread creator.
* ((channel.thread.autoArchiveDuration)) : Duration before automatic archiving (in minutes).

### Member and Permissions Context (member.* and user.*)

*Available if userId is provided and the event occurred inside a server.*

* ((member.id)) : ID of the concerned member.
* ((member.nick)) : Server nickname.
* ((member.displayName)) : Server nickname if defined, otherwise global display name or username.
* ((member.avatar)) : URL of the custom server avatar (if defined).
* ((member.joinedAt)) : Date and time when the member joined the server (ISO8601).
* ((member.roles)) : IDs of possessed roles (separated by commas).
* ((member.isBooster)) : true if the member is boosting the server, otherwise false.
* ((member.premiumSince)) : Boost start date (ISO8601, if applicable).
* ((member.communicationDisabledUntil)) : End date of temporary timeout (ISO8601, if applicable).
* ((member.isAdmin)) / ((interaction.member.isAdmin)) : true if the member is an Administrator, otherwise false.
* ((member.permissions)) / ((interaction.member.permissions)) : List of member permissions (separated by commas).
* ((permissions.byId.)) : List of permissions for a specific targeted user.
* ((isAdmin.byId.)) : Administration status of a specific targeted user.
* ((user.mention)) / ((author.mention)) / ((member.mention)) : Clickable user mention (e.g., <@123456>).

---

## 4. Specific Variables per Event

In addition to the automatic context sets listed above, each Gateway event injects its own specific variables.

### 4.1 Message Events

#### messageCreate / messageUpdate

*These events contain all content variables and metadata of the message as well as its author.*

* **Message**:
* ((message.id)) : Unique ID of the message.
* ((message.content)) : Raw text content of the message.
* ((message.word.count)) : Word count of the message.
* ((message.isBot)) : true if the author is a bot/webhook, otherwise false.
* ((message.channelId)) : ID of the channel.
* ((message.isDM)) : true if it is a private message (DM).
* ((message.isSystem)) : true if it is a system message (e.g., boost, welcome).
* ((message.type)) : Raw message type (Discord integer).
* ((message.mentions)) : IDs of mentioned users (separated by commas).
* ((message.mention.count)) : Number of mentioned users.
* ((message.timestamp)) : Creation timestamp (milliseconds).
* ((message.isEdited)) : true or false.
* ((message.isPinned)) : true or false.
* ((message.attachments)) : URLs of attachments (separated by commas).
* ((message.attachments.count)) : Number of attachments.
* ((message.embeds.count)) : Number of embeds.
* ((message.roleMentions)) : IDs of mentioned roles (separated by commas).
* ((message.roleMentions.count)) : Number of mentioned roles.
* ((message.mentionsEveryone)) : true if the message mentions @everyone or @here.
* ((message.url)) : Direct URL to navigate to the message.
* ((message.editedTimestamp)) : Last modification timestamp (if applicable).
* ((message.referencedMessage.id)) : ID of the message this message is replying to (if applicable).
* ((message.content[0]))...((message.content[9])) : Individual word at the specified index (from 0 to 9).
* ((message.mentions[0]))...((message.mentions[9])) : ID of the mentioned user at the specified index (from 0 to 9).
* ((message.oldContent)) : Initial content of the message (*exclusive to messageUpdate*).


* **Author (author.* and user.*)**:
* ((author.id)) / ((user.id)) : ID of the message author.
* ((author.username)) / ((user.username)) / ((userName)) : Unique Discord username.
* ((author.globalName)) / ((user.globalName)) : Global Discord display name.
* ((author.displayName)) / ((user.displayName)) : Display name (server nickname if present, global otherwise).
* ((author.tag)) / ((user.tag)) : Discriminator or 0.
* ((author.isBot)) : true if the author is a bot.
* ((author.avatar)) / ((user.avatar)) / ((userAvatar)) : URL of the author's avatar.
* ((author.banner)) / ((user.banner)) : URL of the author's banner.
* ((user.createdAt)) : Account creation date of the author (ISO8601).
* ((user.bannerColor)) : Hexadecimal color code of the author's banner.



#### messageDelete

*Triggered when a message is deleted.*

* ((message.id)) : ID of the deleted message.
* ((message.content)) : Text content of the message (if still cached).
* ((author.id)) : ID of the deleted message author.
* ((author.username)) : Username of the author.
* ((author.tag)) : Tag/discriminator of the author.

---

### 4.2 Member and User Events

#### guildMemberAdd

*Triggered when a new user joins a server.*

* ((member.id)) : ID of the user.
* ((member.name)) / ((member.username)) : Unique username.
* ((member.tag)) : Tag/Discriminator.
* ((member.joinedAt)) : Date and time of arrival on the server.

#### guildMemberRemove

*Triggered when a member leaves or is kicked/banned from a server.*

* ((member.id)) : ID of the member who left.
* ((member.name)) / ((member.username)) : Username.
* ((member.tag)) : Tag/Discriminator.

#### guildMemberUpdate

*Triggered when a server member's profile changes (nickname, roles, guild avatar, boost status).*

* **New State**:
* ((member.id)) : ID of the user.
* ((member.username)) : Username of the user.
* ((member.nick)) : New nickname.
* ((member.joinedAt)) : Initial join date.
* ((member.roles)) : New list of role IDs (CSV).
* ((member.avatar)) : URL of the new custom server avatar.
* ((member.isBooster)) : true if they are now boosting the server.


* **Old State (member.old.*)**:
* ((member.old.nick)) : Previous nickname.
* ((member.old.roles)) : Previous list of roles (CSV).
* ((member.old.avatar)) : Previous server avatar.
* ((member.old.isBooster)) : Previous boost state (true/false).



#### userUpdate

*Triggered when a user's global information changes (username, global avatar, banner).*

* ((user.id)) : ID of the user.
* ((user.username)) : New global username.
* ((user.avatar)) : URL of the new global avatar.
* ((user.banner)) : URL of the new global banner.
* ((user.accentColor)) : New accent color.

---

### 4.3 Channel and Thread Events

#### channelCreate / channelUpdate / channelDelete

*Triggered during channel management.*

* ((channel.id)) : ID of the channel.
* ((channel.name)) : Name of the channel.
* ((channel.type)) : Type of the channel (e.g., GuildTextChannel).

#### channelPinsUpdate

*Triggered when messages are pinned or unpinned.*

* ((channel.lastPinTimestamp)) : Date and time of the last pin.

#### threadCreate / threadUpdate / threadDelete

*Triggered for Discord Thread management.*

* ((thread.id)) : ID of the thread.
* ((thread.name)) : Name of the thread.
* ((thread.parent.id)) : ID of the parent text channel.
* ((thread.owner.id)) : ID of the thread creator.
* ((thread.archived)) : true if the thread is archived, otherwise false.
* ((thread.locked)) : true if the thread is locked, otherwise false.
* ((thread.autoArchiveDuration)) : Duration before automatic archiving (in minutes).

#### threadMemberUpdate

*Triggered when a member's status inside a specific thread changes.*

* ((thread.id)) : ID of the thread.
* ((member.id)) : ID of the user.

#### threadMembersUpdate

*Triggered when multiple members join or leave a thread.*

* ((thread.id)) : ID of the thread.
* ((thread.members.added.count)) : Number of members added to the thread.
* ((thread.members.removed.count)) : Number of members removed from the thread.

---

### 4.4 Role Events

#### guildRoleCreate / guildRoleUpdate

*Triggered for server role management.*

* ((role.id)) : Unique ID of the role.
* ((role.name)) : Name of the role.
* ((role.color)) : Hexadecimal/decimal color of the role.
* ((role.permissions)) : Decimal integer representing the role permissions.
* ((role.position)) : Rank in the role hierarchy.
* ((role.mentionable)) : true if the role can be mentioned by anyone, otherwise false.
* ((role.hoist)) : true if the role is displayed separately from other online members.

#### guildRoleDelete

*Triggered when a role is deleted.*

* ((role.id)) : ID of the deleted role.

---

### 4.5 Reaction and Poll Events

#### messageReactionAdd / messageReactionRemove / messageReactionRemoveEmoji

*Triggered when individual reactions are added or removed.*

* ((message.id)) : ID of the message that received or lost the reaction.
* ((reaction.emoji.name)) : Name of the emoji used (e.g., 🔥 or the name of the custom emoji).
* ((reaction.emoji.id)) : ID of the emoji if it is custom, empty otherwise.
* ((reaction.emoji.animated)) : true if the emoji is animated, otherwise false.

#### messageReactionRemoveAll

*Triggered when all reactions are cleared from a message at once.*

* ((message.id)) : ID of the cleared message.

#### messagePollVoteAdd / messagePollVoteRemove

*Triggered when a vote is cast or removed on a Discord Poll.*

* ((message.id)) : ID of the message containing the poll.
* ((poll.answer.id)) : Numeric ID of the chosen/removed answer.

---

### 4.6 Server Management Events

#### guildCreate / guildUpdate

*Triggered when the bot joins a server or when server properties change.*
*These events contain all the guild.* context variables listed in Section 3.*

* ((guild.oldGuild.)) : Property of the server before the update (e.g., ((guild.oldGuild.name)), *exclusive to guildUpdate*).

#### guildDelete

*Triggered when the bot leaves a server or when a server becomes unavailable.*

* ((guild.unavailable)) : true if the server is unavailable due to a Discord outage, otherwise false (bot kicked/left).

#### guildAuditLogCreate

*Triggered when a new entry is added to the audit logs (moderation, channel creation, etc.).*

* ((auditLog.action)) : Type of audit action (e.g., memberBanAdd, channelCreate).
* ((auditLog.executorId)) : ID of the moderator/administrator who executed the action.
* ((auditLog.targetId)) : ID of the affected target (user, channel, role...).

---

### 4.7 Invite Events

#### inviteCreate / inviteDelete

*Triggered during server invite link management.*

* ((invite.code)) : Invite code (e.g., bc-bot-creator).
* ((invite.channelId)) : ID of the channel associated with the invite.
* ((invite.inviterId)) : ID of the user who generated the invite (*exclusive to inviteCreate*).

---

### 4.8 Voice and Presence Events

#### voiceStateUpdate

*Triggered when a user joins, leaves, or moves voice channels (or mutes/deafens themselves).*

* ((voice.channel.id)) : ID of the joined/left voice channel.
* ((voice.user.id)) : ID of the concerned user.
* ((voice.state.sessionId)) : ID of the active voice session.
* ((voice.selfMute)) : true if the user muted themselves.
* ((voice.selfDeafen)) : true if the user deafened themselves.
* ((voice.mute)) : true if the user is muted by a moderator on the server.
* ((voice.deafen)) : true if the user is deafened by a moderator on the server.

#### voiceChannelEffectSend

*Triggered when a voice channel effect is sent (e.g., visual reaction or soundboard noise).*

* ((voice.effect.emoji)) : Emoji associated with the visual effect.
* ((voice.effect.soundId)) : ID of the sound played from the soundboard.

#### voiceServerUpdate

*Triggered when voice connection parameters are updated.*

* ((voice.server.token)) : Session connection token.
* ((voice.server.endpoint)) : Hostname of the Discord voice server.

#### typingStart

*Triggered when a user starts typing in a channel.*

* ((typing.timestamp)) : Typing start timestamp (milliseconds).
* ((typing.member.id)) : ID of the user.
* ((typing.member.name)) : Unique username.

#### presenceUpdate

*Triggered when a user's online status or activities change (gaming, streaming, listening).*

* **User Status**:
* ((user.id)) : ID of the user.
* ((user.username)) : Display name/username.
* ((user.tag)) : Discord discriminator.
* ((user.avatar)) : URL of the avatar.
* ((presence.status)) : Current status (online, idle, dnd, or offline).
* ((presence.activity.count)) : Total number of ongoing activities.
* ((presence.client.desktop)) : Desktop client status (online, idle, dnd, offline).
* ((presence.client.mobile)) : Mobile client status.
* ((presence.client.web)) : Browser client status.


* **Individual Activity (presence.activity[i].* where i ranges from 0 to count - 1)**:
* ((presence.activity[i].name)) : Name of the game or application (e.g., Spotify, League of Legends).
* ((presence.activity[i].type)) : ID of the activity type (e.g., 0 = game, 2 = listening).
* ((presence.activity[i].typeName)) : Readable label of the activity (playing, streaming, listening, watching, custom, or competing).
* ((presence.activity[i].details)) : Additional details (e.g., artist/album name on Spotify).
* ((presence.activity[i].state)) : Current state (e.g., song title).
* ((presence.activity[i].url)) : Associated URL (for Twitch/YouTube streams).



---

### 4.9 Interaction Events (UI Components, Buttons, Menus, Modals)

#### interactionCreate

*Triggered when a user clicks a button, selects an option in a dropdown menu, submits a modal, or uses a slash / autocomplete command.*

* **Interaction Metadata**:
* ((interaction.kind)) : Nature of the interaction (button, select, modal, command, or autocomplete).
* ((interaction.customId)) : Custom identifier assigned to the initiating component or modal.
* ((interaction.id)) : Unique ID of the generated interaction.
* ((interaction.token)) : Unique temporary authentication token to respond.
* ((interaction.applicationId)) : ID of the Discord client application.
* ((interaction.messageId)) : ID of the source message containing the clicked component (if applicable).


* **Select Menus / Dropdowns**:
* ((interaction.values)) : Formatted list (CSV) of all values chosen in a dropdown menu.
* ((interaction.values.count)) : Number of selected options.
* ((interaction.stringSelect.value)) / ((interaction.stringSelect.values)) / ((interaction.stringSelect.count)) : Selected values for a standard text dropdown menu.
* ((interaction.channelSelect.channelId)) / ((interaction.channelSelect.channelIds)) / ((interaction.channelSelect.channelCount)) : IDs of selected channels in a Channel-type menu.
* ((interaction.userSelect.userId)) / ((interaction.userSelect.userIds)) / ((interaction.userSelect.userCount)) : IDs of selected users.
* ((interaction.roleSelect.roleId)) / ((interaction.roleSelect.roleIds)) / ((interaction.roleSelect.roleCount)) : IDs of selected roles.
* ((interaction.mentionableSelect.userId)) / ((interaction.mentionableSelect.userIds)) / ((interaction.mentionableSelect.userCount)) : IDs of selected targets (members/roles).


* **Modal Form Fields**:
* ((modal.customId)) : ID of the submitted modal (alias for interaction.customId).
* ((modal.)) : Text content entered by the user for the field with the identifier .


* **Slash Commands & Autocomplete**:
* ((interaction.command.name)) : Name of the invoked slash command.
* ((interaction.command.id)) : Unique ID of the command.
* ((interaction.command.type)) : Type of the command (e.g., chatInput, user, message).



---

### 4.10 Non-Discord Events (Scheduling & Webhooks)

#### scheduled

*Triggered autonomously according to the interval configured by a scheduled task.*

* ((workflow.type)) : Set to general.
* ((workflow.trigger)) : Set to scheduled.
* ((trigger.minutes)) : Configured execution interval in minutes (e.g., 5).

#### inboundWebhook

*Triggered when an HTTP POST request is received on the bot's webhook integration URL.*

* ((workflow.type)) : Set to inboundWebhook.
* ((inbound.event.name)) : Set to inboundWebhook.
* ((inbound.workflow.name)) : Configured name of the receiving workflow.
* ((inbound.request.id)) : Unique ID assigned to the incoming HTTP request.
* ((inbound.source.ip)) : Source IP address of the caller.
* ((inbound.payload.json)) : Complete raw HTTP payload serialized in JSON format.
* ((inbound.payload.)) : Value associated with the  extracted directly from the JSON sent in the request body.
* ((inbound.header.<header_name_lowercase>)) : Value associated with the incoming HTTP header (name converted to lowercase).
