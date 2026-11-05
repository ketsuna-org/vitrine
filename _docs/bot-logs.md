---
layout: doc
title: Bot logs
category: "Meta"
api_type: general
description: Where to read what your bot did. The live view, the 30-day history, traces on request, what is recorded and what never is, how long it is kept and who can read it.
permalink: /docs/bot-logs/
locale: en
translation_key: doc-bot-logs
---

Every bot keeps a log of what it did. You read it in the Bot Creator app and in the Studio, in the **Logs** screen of a bot.

## Live and history

- **Live** shows the latest lines as they arrive, like before.
- **History (30 days)** reads the stored log of a bot hosted on Bot Creator servers. Lines come newest first, 100 at a time: press **Load more** to go further back.

The history has a search box (text in the message), a filter on the command name and a level filter (all, warnings and errors, errors only).

## What you see by default

The history shows the lines meant for you: what your bot writes with `$log` or the log action, script errors and failed commands. The detail of every command, button and event (the **traces**) is hidden by default. Turn on **Show traces** when you need to follow a command step by step.

Performance measurements are never shown to users.

## What is recorded, and what never is

A line carries a time, a level, a message and, when it applies, the command name, the server, the channel, the Discord user ID, the duration and an error code. Tokens and other secrets are masked before the line is stored. **The content of Discord messages is never recorded.**

A bot can write at most 20,000 user lines and 20,000 other lines per day. Beyond that, extra lines are dropped and counted; your bot is never slowed down or stopped by its log.

## How long it is kept

| Lines | Kept |
|-------|------|
| Your lines, warnings and errors | 30 days |
| Traces and the rest | 7 days |

Deleting a bot deletes its log. Deleting your account deletes the logs of your bots.

## Who can read it

You and the members of the bot team read the user lines and, on request, the traces. The Bot Creator team can search the log to help with support. If a person asks for the lines that name their Discord user ID to be erased, write to us and we delete them by user ID. See the [privacy policy](/privacy-policy.html).

## What changes for installed apps

Older versions of the app keep their live view as it was; the history appears with the version that includes it. Nothing needs to be migrated.
