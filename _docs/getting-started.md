---
layout: doc
title: Getting Started
category: "Meta"
description: Start here — set up a bot, write your first command, and find the right documentation section.
permalink: /docs/getting-started/
---
{% assign onboarding_guide_0 = site.posts | where_exp: 'post', "post.url contains 'how-to-create-a-bot-token-bot-creator'" | first %}
{% assign onboarding_guide_1 = site.posts | where_exp: 'post', "post.url contains 'how-to-create-a-command-in-bot-creator-step-by-step'" | first %}
{% assign onboarding_guide_2 = site.posts | where_exp: 'post', "post.url contains 'how-to-create-a-perfect-ping-command-in-bdfd'" | first %}
{% assign onboarding_guide_3 = site.posts | where_exp: 'post', "post.url contains 'mastering-persistent-database-variables-in-bdfd'" | first %}
{% assign onboarding_guide_4 = site.posts | where_exp: 'post', "post.url contains 'handling-rich-interactions-in-bot-creator-buttons-select-menus-modals'" | first %}

Welcome to Bot Creator documentation. This page links the fastest path from zero to a running command.

## 1. Install Bot Creator

Download the app for [mobile or desktop](/download/). Create a Discord application and bot token — see the [Create a Discord Bot Token]({{ onboarding_guide_0.url | relative_url }}) guide.

## 2. Choose your scripting mode

| Mode | When to use | Documentation |
|------|-------------|---------------|
| **Blocks** | Visual actions and workflows | [Blocks reference](/docs/blocks/) || **BDScript** | Text and `$functions` compiled to actions | [BDFD Function Reference](/docs/) |
| **BDJS (JavaScript)** | Full scripting power | [JavaScript API](/docs/javascript/) |

Use [$scriptLanguage](/docs/scriptlanguage/) in BDScript to detect which mode is active.Read [Execution model and compatibility](/docs/execution-model/) before copying examples: slash replies can be implicit and ticket helpers are incomplete.

## 3. Build your first command

- **BDScript:** [Create a Command step-by-step]({{ onboarding_guide_1.url | relative_url }}) → [Perfect ping command]({{ onboarding_guide_2.url | relative_url }})
- **JavaScript:** Add a JavaScript block and use `interaction.reply('pong')` or `message.reply('pong')`

## 4. Persistent data

- **BDScript:** `$getUserVar` / `$setUserVar` — see [Variables](/docs/#variables) and the [Database variables guide]({{ onboarding_guide_3.url | relative_url }})
- **JavaScript:** `await db.user.get()` / `await db.user.set()` — see [db.user](/docs/javascript/db-user/)

## 5. Deploy and monitor

Host your bot from the app dashboard. For self-hosted runners, see [Deployment & hosting](/docs/deployment/) and the [Docker Runner API](/guides/runner-docker-api-only/) guide.

## Popular references

- [Events & placeholders](/docs/events-and-placeholders/) — event-driven bots and `((...))` variables
- [Interactions overview](/docs/interactions-overview/) — buttons, select menus, modals
- [Handling rich interactions]({{ onboarding_guide_4.url | relative_url }}) — full walkthrough
- [MCP server](/docs/mcp/) — AI tool integration for this documentation
