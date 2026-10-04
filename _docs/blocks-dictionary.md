---
layout: doc
title: Blocks Dictionary — Complete Catalog
category: "Blocks"
api_type: blocks
description: Exhaustive catalog of all 112 visual Blocks in the Bot Creator mobile application, organized into 12 categories with payload parameters, types, defaults, outputs, and script equivalents.
permalink: /docs/blocks-dictionary/
---

# Blocks Dictionary — Complete Catalog

This dictionary documents every Block available in the Bot Creator mobile and desktop application. Each block corresponds to a native action executed by the Dart engine (`BotCreatorActionType`).

---

## Category Overview

1. [Messages](#1-messages)
2. [Reactions](#2-reactions)
3. [Channels](#3-channels)
4. [Moderation & Members](#4-moderation--members)
5. [Components & Interactions](#5-components--interactions)
6. [Webhooks](#6-webhooks)
7. [Guild & Members](#7-guild--members)
8. [HTTP & Variables](#8-http--variables)
9. [Logic & Flow](#9-logic--flow)
10. [Workflows & Scripts](#10-workflows--scripts)
11. [Music (Lavalink)](#11-music)
12. [Triggers & Entry Points](#12-triggers--entry-points)

---

## 1. Messages

Actions dedicated to sending, editing, and deleting messages in text channels. (Color: `#2E7D32` — Forest Green)

### `sendMessage`
Sends a simple message, embed, or component message to a channel or direct message (DM).
- **App Icon:** `send`
- **Parameters:**
  - `channelId` *(string, optional)*: Snowflake ID of the target channel. If omitted, targets the current channel.
  - `content` *(string, optional)*: Raw message text (supports template placeholders `((...))`).
  - `targetType` *(select: `channel` \| `user`, default: `channel`)*: Target type. Set to `user` for direct messages.
  - `userId` *(string, optional)*: User Snowflake ID if `targetType == "user"`.
  - `embeds` *(list&lt;object&gt;, optional)*: List of embed objects (title, description, color, fields).
  - `components` *(object, optional)*: Button or select menu component tree.
  - `messageMode` *(select: `normal` \| `componentv2`, default: `normal`)*: Classic display mode or modern rich component layout.
- **Output:** `((action.<key>))` contains the sent message ID.
- **Script Equivalent:** `$sendMessage[content]` or `$channelSendMessage[channelID;content]`.

### `editMessage`
Edits the content or embeds of an existing message sent by the bot.
- **App Icon:** `edit_note`
- **Parameters:**
  - `channelId` *(string, required)*: Channel containing the message.
  - `messageId` *(string, required)*: ID of the message to edit.
  - `content` *(string, optional)*: New message text.
  - `embeds` *(list&lt;object&gt;, optional)*: Replacement embed objects.
- **Script Equivalent:** `$editMessage[channelID;messageID;new_content]`.

### `deleteMessages`
Deletes a specific message or bulk deletes recent messages in a channel.
- **App Icon:** `delete_sweep`
- **Parameters:**
  - `channelId` *(string, required)*: Target channel.
  - `messageId` *(string, optional)*: ID of a single message to delete.
  - `messageCount` *(integer, optional)*: Number of messages to bulk purge (1 to 100).
  - `onlyUserId` *(string, optional)*: Filter deletion by author ID.
  - `filterBots` *(boolean, optional)*: Only delete messages sent by bots.
  - `delay` *(string, optional)*: Delay before deletion (e.g. `5s`).
- **Script Equivalent:** `$deleteMessage[channelID;messageID]` or `$clear[count]`.

### `pinMessage` / `unpinMessage`
Pins or unpins a specific message in a text channel.
- **App Icon:** `push_pin` / `push_pin_outlined`
- **Parameters:** `channelId` *(string)*, `messageId` *(string)*.
- **Script Equivalent:** `$pinMessage[channelID;messageID]` / `$unpinMessage[channelID;messageID]`.

### `getMessage`
Retrieves metadata for an existing message (author, content, timestamp) into the execution context.
- **App Icon:** `message`
- **Parameters:** `channelId` *(string)*, `messageId` *(string)*.
- **Output:** `((action.<key>.content))`, `((action.<key>.authorId))`.
- **Script Equivalent:** `$getMessage[channelID;messageID]`.

### `createPoll` / `endPoll`
Creates a native Discord poll with multiple choices or immediately terminates an active poll.
- **App Icon:** `poll` / `stop_circle`
- **Parameters:** `channelId`, `question`, `answers` *(list)*, `durationHours` *(1 to 168)*, `allowMultiselect` *(boolean)*.

### `deleteTrigger`
Deletes the message that triggered the command (useful for silent prefix commands).
- **App Icon:** `delete_outline`
- **Script Equivalent:** `$deletecommand`.

### `attachImage`
Attaches a dynamically generated image (via Canvas) to the outgoing message.
- **App Icon:** `image`
- **Parameters:** `canvasName`, `fileName`.

---

## 2. Reactions

Actions dedicated to managing emoji reactions on Discord messages. (Color: `#FFA726` — Orange)

### `addReaction`
Adds an emoji reaction to a specified message.
- **App Icon:** `emoji_emotions`
- **Parameters:**
  - `channelId` *(string, required)*: Channel containing the message.
  - `messageId` *(string, required)*: Target message.
  - `emoji` *(string, required)*: Unicode emoji (`👍`) or custom Discord format (`name:id`).
- **Script Equivalent:** `$addReactions[emoji]`.

### `removeReaction`
Removes a specific reaction added by a user or the bot.
- **App Icon:** `emoji_emotions_outlined`
- **Parameters:** `channelId`, `messageId`, `emoji`, `userId` *(optional)*.

### `clearAllReactions`
Removes all reactions from a given message.
- **App Icon:** `clear_all`
- **Parameters:** `channelId`, `messageId`.

---

## 3. Channels

Actions for creating, updating, managing permissions, and organizing Discord channels and threads. (Color: `#1976D2` — Info Blue)

### `createChannel`
Creates a new channel (text, voice, category, announcement, stage) on the server.
- **App Icon:** `add_box`
- **Parameters:**
  - `name` *(string, required)*: Channel name (e.g. `support-1234`).
  - `type` *(select: `text` \| `voice` \| `category` \| `announcement` \| `stage`, default: `text`)*.
  - `categoryId` *(string, optional)*: Parent category Snowflake ID.
  - `topic` *(string, optional)*: Channel topic or description.
- **Output:** `((action.<key>))` returns the Snowflake ID of the created channel.
- **Script Equivalent:** `$createChannel[name;type;parentCategoryId]`.

### `updateChannel`
Modifies properties of an existing channel (name, topic, parent category, archive/locked status).
- **App Icon:** `edit`
- **Parameters:** `channelId`, `name`, `topic`, `position`, `nsfw`, `archived`, `locked`.
- **Script Equivalent:** `$modifyChannel[channelID;name;topic;position]`.

### `removeChannel`
Permanently deletes a text channel, voice channel, or category.
- **App Icon:** `remove_circle`
- **Parameters:** `channelId` *(string, required)*.
- **Script Equivalent:** `$deleteChannels[channelID]`.

### `editChannelPermissions`
Configures permissions for a role or member on a specific channel.
- **App Icon:** `lock_open`
- **Parameters:**
  - `channelId` *(string, required)*: Channel to configure.
  - `targetType` *(select: `role` \| `member`)*: Target type.
  - `targetId` *(string, required)*: Role or member Snowflake ID.
  - `allow` *(string / int)*: Bitmask or permission flags allowed (e.g. `68608` for View + Send + History).
  - `deny` *(string / int)*: Bitmask of denied permissions.
- **Script Equivalent:** `$editChannelPerms[channelID;userOrRoleID;+perm1;+perm2]`.

### `deleteChannelPermission`
Deletes a specific permission overwrite on a channel.
- **App Icon:** `lock_reset`
- **Parameters:** `channelId`, `targetId`.

### `createInvite` / `deleteInvite` / `getInvite`
Generates a Discord invite link for a channel, deletes it, or inspects its usage stats.
- **App Icon:** `link` / `link_off` / `manage_search`
- **Parameters:** `channelId`, `maxAge`, `maxUses`, `temporary`, `unique`.
- **Output `createInvite`:** `((action.<key>.url))`, `((action.<key>.code))`.

### `createThread` / `addThreadMember` / `removeThreadMember`
Manages threads (public and private).
- **App Icon:** `forum` / `person_add` / `person_remove`
- **Parameters:** `channelId`, `name`, `type` (`publicThread` or `privateThread`), `autoArchiveDuration`.

---

## 4. Moderation & Members

Administrative and disciplinary actions applied to server members. (Color: `#FF4D4D` — Danger Red)

### `banUser` / `unbanUser`
Permanently bans a user from the server or revokes an existing ban.
- **App Icon:** `block` / `person_add`
- **Parameters:** `userId`, `reason`, `deleteMessageDays` *(0 to 7)*.
- **Script Equivalent:** `$banID[reason;userID]` / `$unbanID[userID]`.

### `kickUser`
Kicks a member from the server.
- **App Icon:** `exit_to_app`
- **Parameters:** `userId`, `reason`.
- **Script Equivalent:** `$kick[userID;reason]`.

### `muteUser` / `unmuteUser`
Applies a native Discord Timeout (temporary mute) or revokes it immediately.
- **App Icon:** `volume_off` / `volume_up`
- **Parameters:** `userId`, `duration` *(e.g. `10m`, `1h`, `1d`)*, `reason`.
- **Script Equivalent:** `$timeout[userID;duration;reason]` / `$untimeout[userID]`.

### `addRole` / `removeRole`
Assigns or removes a Discord role for a member.
- **App Icon:** `person_add_alt_1` / `person_remove_alt_1`
- **Parameters:** `userId`, `roleId`.
- **Script Equivalent:** `$giveRole[userID;roleID]` / `$takeRole[userID;roleID]`.

### `setNickname`
Updates a member's server nickname.
- **App Icon:** `badge`
- **Parameters:** `userId`, `nickname`.
- **Script Equivalent:** `$setNickname[userID;newNickname]`.

### `slowmode`
Sets the slowmode cooldown on a text channel.
- **App Icon:** `timer`
- **Parameters:** `channelId`, `seconds` *(0 to disable)*.
- **Script Equivalent:** `$slowmode[seconds;channelID]`.

### `moveToVoiceChannel` / `disconnectFromVoice`
Moves a voice-connected member to another voice channel or disconnects them.
- **App Icon:** `headset` / `headset_off`
- **Parameters:** `userId`, `channelId`.

### `serverMuteMember` / `serverDeafenMember`
Mutes or deafens a member across server voice channels.
- **App Icon:** `mic_off` / `hearing_disabled`

### `createAutoModRule` / `deleteAutoModRule` / `listAutoModRules`
Manages native Discord AutoMod rules (blocked words, mention spam, spam content).
- **App Icon:** `security`

---

## 5. Components & Interactions

Acknowledgment and lifecycle management for Discord interactions (Slash Commands, Buttons, Menus, Modals). (Color: `#38BDF8` — Sky Blue)

### `respondWithMessage` (Terminal)
Directly replies to the Discord interaction that triggered the command.
- **App Icon:** `chat`
- **Parameters:**
  - `content` *(string)*: Text content of the reply.
  - `ephemeral` *(boolean, default: false)*: If `true`, the message is visible only to the interaction author.
  - `embeds` *(list&lt;object&gt;)*: Embeds attached to the reply.
  - `components` *(object)*: Interactive buttons or select menus.
- **Golden Rule:** In a slash command, always use `respondWithMessage` (or raw text in BDFD). Never double up with `sendMessage`.

### `deferInteraction`
Acknowledges the interaction with Discord without sending a visible message ("The bot is thinking...").
- **App Icon:** `hourglass_top`
- **Parameters:** `ephemeral` *(boolean)*.
- **Script Equivalent:** `$defer`.

### `respondWithComponentV2`
Replies to the interaction using the modern Component V2 rendering engine (sections, containers, media galleries).
- **App Icon:** `dashboard_customize`

### `respondWithModal`
Displays an interactive pop-up form (Modal) on the user's screen with text input fields.
- **App Icon:** `input`
- **Parameters:** `customId`, `title`, `components` *(text input fields)*.

### `editInteractionMessage`
Edits the initial reply previously sent to the interaction.
- **App Icon:** `edit_notifications`

### `respondWithAutocomplete`
Returns real-time suggestions for a slash command option configured with autocomplete.
- **App Icon:** `tune`

### `listenForButtonClick` / `listenForSelectMenu` / `listenForModalSubmit`
Dedicated event listeners bound to specific Custom IDs.

---

## 6. Webhooks

Creating and posting via Discord Webhooks. (Color: `#009688` — Teal)

### `sendWebhook`
Sends a message through a Discord webhook with custom username and avatar.
- **App Icon:** `webhook`
- **Parameters:** `webhookUrl`, `content`, `username`, `avatarUrl`, `embeds`.
- **Script Equivalent:** `$webhookSend[url;content;username;avatar]`.

### `editWebhook` / `deleteWebhook` / `listWebhooks` / `getWebhook`
Manage channel webhooks.

---

## 7. Guild & Members

Global server settings, custom emojis, and member profiles. (Color: `#7986CB` — Indigo)

### `updateGuild` / `leaveGuild`
Modifies server settings (name, icon, banner) or instructs the bot to leave the server.
- **App Icon:** `settings` / `exit_to_app`

### `createEmoji` / `updateEmoji` / `deleteEmoji`
Manages custom server emojis from an image URL.
- **App Icon:** `add_reaction` / `no_photography`

### `listMembers` / `getMember`
Retrieves member details (join date, roles, permissions).
- **Output:** `((action.<key>.roles))`, `((action.<key>.joinedAt))`.

### `getGuildOnboarding` / `updateGuildOnboarding`
Inspects or updates native Discord onboarding configurations.

---

## 8. HTTP & Variables

Memory management, external API requests, and data persistence. (Color: `#00BCD4` — Cyan)

> [!CAUTION]
> **No `$let`:** The `$let` bracket syntax does not exist. Use `setTemporaryVariable` (`$var`) for temporary execution variables, and `setScopedVariable` (`$setVar` / `$setUserVar` / `$setServerVar`) for persistent database storage.

### `setTemporaryVariable`
Stores a value in memory exclusively for the duration of the current command.
- **App Icon:** `data_object`
- **Parameters:** `name` *(string)*, `value` *(string / JSON)*.
- **Script Equivalent:** `$var[name;value]`.

### `setScopedVariable` / `getScopedVariable` / `removeScopedVariable`
Stores or retrieves a persistent variable saved in the database.
- **App Icon:** `inventory_2` / `find_in_page`
- **Parameters:**
  - `scope` *(select: `global` \| `user` \| `guild` \| `member` \| `channel`)*: Data isolation scope.
  - `key` *(string)*: Variable key.
  - `value` *(string / JSON)*: Stored value.
- **Script Equivalents:**
  - Global: `$setVar[key;val]` / `$getVar[key]`
  - User: `$setUserVar[key;val]` / `$getUserVar[key]`
  - Server: `$setServerVar[key;val]` / `$getServerVar[key]`
  - Member: `$setMemberVar[key;val]` / `$getMemberVar[key]`

### `httpRequest`
Performs an external REST HTTP request (GET, POST, PUT, DELETE) with headers and JSON body.
- **App Icon:** `http`
- **Parameters:** `url`, `method`, `headers`, `body`.
- **Output:** `((action.<key>))` contains the parsed response JSON.

### `appendArrayElement` / `removeArrayElement` / `queryArray`
Manipulates JSON lists and arrays stored in the database.

---

## 9. Logic & Flow

Execution control, conditional branches, and loops. (Color: `#E91E63` — Pink)

### `ifBlock`
Conditional branching block with `thenActions` and `elseActions`.
- **App Icon:** `account_tree`
- **Parameters:** `variable`, `operator` (`equals`, `notEquals`, `contains`, `greaterThan`, `lessThan`), `value`.
- **Script Equivalent:** `$if[...] ... $else ... $endif`.

### `stopUnless`
Immediately terminates the command if a condition is not met (safety guard).
- **App Icon:** `filter_alt`
- **Parameters:** `condition`, `errorMessage`.
- **Script Equivalent:** `$onlyIf[condition;errorMessage]`.

### `forLoop` / `jsonForEachLoop`
Repeats a group of actions a set number of times (max 100 iterations).
- **App Icon:** `loop` / `repeat`

### `calculate`
Evaluates a complex mathematical expression (`+`, `-`, `*`, `/`, `^`, parentheses).
- **App Icon:** `calculate`
- **Script Equivalent:** `$calculate[expression]` or `$c[expr]`.

### `cooldown`
Enforces a cooldown before a member can execute the command again.
- **App Icon:** `timer`
- **Parameters:** `duration` (e.g. `30s`), `scope` (`user`, `guild`, `channel`).

### `wait`
Pauses execution for a specified duration before continuing.
- **App Icon:** `hourglass_bottom`
- **Parameters:** `duration` (e.g. `3s`, `1m`).
- **Script Equivalent:** `$wait[duration]`.

### `stop`
Immediately stops workflow execution without raising an error.
- **App Icon:** `stop_circle`
- **Script Equivalent:** `$stop`.

### `skipActions` / `jumpToAction`
Skips upcoming actions or jumps directly to a designated action key.

### `randomChoice`
Selects a random element from a list of options with or without weighting.
- **App Icon:** `casino`

---

## 10. Workflows & Scripts

Advanced modular composition and server-side Canvas rendering. (Color: `#FF6E40` — Deep Orange)

### `runWorkflow`
Executes another reusable workflow defined in the bot, passing arguments to it.
- **App Icon:** `account_tree`
- **Parameters:** `workflowId`, `parameters`.
- **Output:** `((action.<key>))` contains the value returned by the invoked workflow.

### `runBdfdScript`
Executes a raw BDScript snippet directly inside a visual block sequence.
- **App Icon:** `code`

### `runtimeImageBlock` & Canvas Actions
High-fidelity server-side image composition engine:
- `canvasCreateBlock`: Creates a blank drawing canvas (width, height, color).
- `canvasLoadImageBlock`: Downloads and positions an external image or avatar.
- `canvasDrawTextBlock`: Renders styled text with font, size, and alignment.
- `canvasDrawCircleBlock` / `canvasDrawRectBlock` / `canvasDrawLineBlock`: Geometric shapes.

### `registerGuildCommands` / `unregisterGuildCommands`
Dynamically registers or unregisters slash commands on a Discord server.

### `log` / `debugProfile`
Prints debug information to the runner console or profiles execution time.

---

## 11. Music (Lavalink)

Audio streaming controls powered by a Lavalink node. (Color: `#AEEA00` — Lime Green)

- `playMusic`: Plays a track from YouTube, SoundCloud, or direct URL.
- `pauseMusic` / `resumeMusic`: Pauses or resumes playback.
- `skipMusic` / `stopMusic`: Skips to the next track or clears the queue.
- `setMusicVolume`: Adjusts playback volume (0 to 200%).
- `setMusicLoop`: Toggles repeat mode (single track or full queue).
- `seekMusic`: Seeks to a specific playback position.
- `getMusicInfo`: Retrieves currently playing track title, duration, and progress.
- `joinVoice` / `leaveVoice`: Connects or disconnects the bot from a voice channel.

---

## 12. Triggers & Entry Points

Entry points that trigger block execution:

- **Slash Command (`chatInput`)**: `/command` with typed options.
- **User Context Menu (`userContextMenu`)**: Right-click member &gt; Apps.
- **Message Context Menu (`messageContextMenu`)**: Right-click message &gt; Apps.
- **Discord Events (`events`)**: `guildMemberAdd`, `guildMemberRemove`, `messageCreate`, `reactionAdd`, etc.
- **Scheduled Cron (`cron`)**: Recurring execution every X minutes/hours.
- **Components (`button`, `selectMenu`, `modalSubmit`)**: Responding to interactions on Custom IDs.
