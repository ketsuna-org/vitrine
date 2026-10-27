---
layout: doc
title: Bot Status and Custom Status
category: "Meta"
api_type: general
description: How to set the status of your Discord bot (Playing, Streaming, Listening, Watching, Competing or Custom Status), rotate several statuses, and what changes for the Custom Status, available to every bot, Premium or not.
permalink: /docs/bot-status/
locale: en
translation_key: doc-bot-status
---

Every bot has a presence: an online state (online, idle, do not disturb, invisible) and one or more activities shown under its name. You set them in the bot settings of the app or the Studio, with the AI Copilot, or in the `presence` section of a JavaScript bot.

## Activity types

| Type | What members see |
|---|---|
| `playing` | Playing *text* |
| `streaming` | Streaming *text* (needs a valid `http` or `https` URL, otherwise it falls back to Playing) |
| `listening` | Listening to *text* |
| `watching` | Watching *text* |
| `competing` | Competing in *text* |
| `custom` | The text alone, with no verb, like the custom status of a user |

## Custom Status

The Custom Status is Discord activity type 4. It shows only your text, with no "Playing" or "Watching" in front of it, for example `Ready to help, type /help`.

- It is available to **all bots**, Premium or not, Dart or JavaScript.
- The text is the activity name you type in the editor (128 characters at most). Bot Creator sends it to Discord in the `state` field and sets the required name to `Custom Status`, which Discord does not display.
- The URL field is ignored for this type.
- Discord only shows one Custom Status per bot. Mixing it with another activity in the same rotation is fine: each step replaces the previous one.

## Several statuses and rotation

Add more than one activity to rotate between them. Each activity has a minimum and a maximum interval in seconds; the next change happens after a random delay in that range. Discord limits how often a presence can change, so the runner never rotates faster than every 15 seconds.

Text can contain runtime variables such as `((bot.uptime))` or `((bot.guildCount))` on Dart bots.

## In the app and the Studio

Open the bot, then **Settings**, then the status section. Pick the type **Custom status** in the drop-down, type your text and save. The change is applied to the running bot.

## With a JavaScript bot

```json
{
  "presence": {
    "status": "online",
    "activities": [
      { "type": "custom", "name": "Ready to help, type /help" }
    ]
  }
}
```

## With the AI Copilot

Ask for it in plain words, for example "set my bot's status to the custom status *Back in 5 minutes*". The Copilot and a connected AI assistant use the same `custom` type.
