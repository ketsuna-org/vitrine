---
layout: doc
title: Scheduled tasks
category: "Meta"
api_type: general
description: How scheduled tasks work in Bot Creator. Repeat every N minutes or on a cron schedule, choose a start time, why everything is in UTC, what happens when the bot restarts, and how to run a task right now.
permalink: /docs/scheduled-tasks/
locale: en
translation_key: doc-scheduled-tasks
---

A scheduled task runs a workflow on its own, at regular times, without anyone sending a command. Scheduled tasks are part of the Premium plan.

## Create a task

Open the **Scheduler** tab of your bot, add a task, choose the workflow to run and how often. Two kinds of schedules exist:

- **Every N minutes.** Available on every bot.
- **Cron.** A 5-field expression (minute, hour, day of month, month, day of week) with a time zone. Cron is available on JavaScript bots only. A Dart bot uses "every N minutes".

If you give a cron schedule no time zone, it runs in UTC.

## Everything is in UTC

All clocks of the platform are in UTC. The editor shows times in your local time but stores them in UTC, so a task does not move when you travel or when daylight saving time changes. The next run is shown in the task card.

## Choose a start time

By default, a task that repeats every N minutes runs on a fixed grid counted from the Unix epoch in UTC (for example every 60 minutes means on the hour). That grid does not depend on when the bot was started.

The **Start at** field lets you pick your own anchor instead. The first run happens at that time (if it is in the future), then every N minutes from it: with a start of 09:30 and a period of 60 minutes, the task runs at 09:30, 10:30, 11:30 and so on. For a cron schedule, **Start at** means "not before": the task never runs earlier than that date. Use **No start time** to go back to the default grid.

## Restarts and missed runs

- **A restart does not run the task.** Restarting the bot, or the runner, runs nothing by itself, and does not move the next run, because the schedule is computed from the clock and not from the start time of the bot.
- **No catch-up.** If the bot was stopped when a run was due, that run is skipped. The next one happens at its normal time.
- **Run on start.** Turn on **Also run when the bot starts** if you want one extra run when the schedule is first loaded. It is in addition to the regular times.
- The time of the last run is remembered, including after a restart of the runner.

## Run now

The **Run now** button runs the task immediately. It does not move the timer: the next scheduled run keeps its time. The bot must be running, and like scheduled tasks it needs Premium.

## What the card shows

Each task shows its next run, its last run and its last error. These come from the runner while the bot is running. When the bot is stopped or its runner cannot be reached, the card says so instead of showing a time.

## Good to know

- Intervals are in minutes. Keep your workflows short so a run is finished before the next one is due.
- JavaScript bots and Dart bots follow the same rules for the grid, the start time and restarts. The difference is cron, which only JavaScript bots support.
