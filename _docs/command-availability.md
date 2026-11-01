---
layout: doc
title: Where a command is available
category: "Meta"
api_type: general
description: Choose where a Bot Creator command can be used on Discord. Servers, DMs with the bot, group DMs, and user install. What the private channel option needs and what to do when Discord refuses a command.
permalink: /docs/command-availability/
locale: en
translation_key: doc-command-availability
---

Every slash command has an availability setting that tells Discord where the command can be used. You find it in the command editor under **Where this command can be used**.

## Installation type

- **Guild Install.** The bot is added to a server and the command works in that server.
- **User Install.** A person installs the bot on their own account and can use the command anywhere, including in servers where the bot was never added.

## Contexts

- **Guild.** Channels of a server.
- **Bot DM.** The private conversation between a person and the bot.
- **Group DM / Other.** Group conversations and DMs between people. This needs User Install, because the bot is not a member of those conversations.

A command with no setting keeps the usual behavior: it works in servers only.

## Private channel needs User Install

The **private channel** option makes a command usable in DMs between users. It only works when **User Install** is on. If you save a command with private channel but without User Install, Bot Creator saves the command, removes the private channel option, and tells you so, so you can turn User Install on.

## When Discord refuses a command

Saving a command in the app or in the Studio also publishes it to Discord. If Discord refuses it (a name that is not allowed, a description that is too long, a limit reached), the editor now says that the command is saved but not available yet, and shows the error from Discord. Fix the error and save again.

## The Copilot and your own AI

The AI Copilot and the user MCP connection can set the same options: installation types and contexts, validated before saving. Ask in plain words, for example "make /ping work in DMs with the bot".
