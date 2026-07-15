---
layout: doc
title: Getting Started
category: "Meta"
description: Start here — set up a bot, write your first command, and find the right documentation section.
permalink: /docs/getting-started/
---

Welcome to Bot Creator documentation. This page links the fastest path from zero to a running command.

## 1. Install Bot Creator

Download the app for [mobile or desktop](/download/). Create a Discord application and bot token — see the [Create a Discord Bot Token](/getting-started/2025/05/18/how-to-create-a-bot-token-bot-creator/) guide.

## 2. Choose your scripting mode

| Mode | When to use | Documentation |
|------|-------------|---------------|
| **Visual + BDScript** | Block editor, `$functions` | [BDFD Function Reference](/docs/) |
| **BDJS (JavaScript)** | Full scripting power | [JavaScript API](/docs/javascript/) |

Use [$scriptLanguage](/docs/scriptlanguage/) in BDScript to detect which mode is active.

## 3. Build your first command

- **BDScript:** [Create a Command step-by-step](/getting-started/2026/03/12/how-to-create-a-command-in-bot-creator-step-by-step/) → [Perfect ping command](/getting-started/2026/05/30/how-to-create-a-perfect-ping-command-in-bdfd/)
- **JavaScript:** Add a JavaScript block and use `interaction.reply('pong')` or `message.reply('pong')`

## 4. Persistent data

- **BDScript:** `$getUserVar` / `$setUserVar` — see [Variables](/docs/#variables) and the [Database variables guide](/advanced-topics/2026/05/30/mastering-persistent-database-variables-in-bdfd/)
- **JavaScript:** `await db.user.get()` / `await db.user.set()` — see [db.user](/docs/javascript/db-user/)

## 5. Deploy and monitor

Host your bot from the app dashboard. For self-hosted runners, see [Deployment & hosting](/docs/deployment/) and the [Docker Runner API](/guides/runner-docker-api-only/) guide.

## Popular references

- [Events & placeholders](/docs/events-and-placeholders/) — event-driven bots and `((...))` variables
- [Interactions overview](/docs/interactions-overview/) — buttons, select menus, modals
- [Handling rich interactions](/building-commands/2026/05/23/handling-rich-interactions-in-bot-creator-buttons-select-menus-modals/) — full walkthrough
- [MCP server](/docs/mcp/) — AI tool integration for this documentation
