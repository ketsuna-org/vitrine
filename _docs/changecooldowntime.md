---
layout: doc
title: $changeCooldownTime[]
translation_key: docs
category: "Control Flow"
function_name: changeCooldownTime
syntax: $changeCooldownTime[days;hours;minutes;seconds]
description: Sets the labels (days, hours, minutes, seconds) used by the %time% placeholders in the error message of the cooldown functions.
---
$changeCooldownTime customizes the **unit labels** displayed in the cooldown error message. It does not change the duration of a cooldown.

## How It Works

1. `$cooldown`, `$serverCooldown` and `$globalCooldown` take an error message that can contain time placeholders (`%time%`, `%time-d%`, `%time-h%`, `%time-m%`, `%time-s%`).
2. By default, the placeholders are followed by the labels `Days`, `Hours`, `Minutes` and `Seconds`.
3. `$changeCooldownTime[days;hours;minutes;seconds]` replaces these four labels for the rest of the current execution.
4. The function returns an empty string.

## Syntax

```text
$changeCooldownTime[days;hours;minutes;seconds]
```

## Parameters

All four parameters are required and must not be empty (an empty label raises the error `Cooldown time labels must not be empty.`).

| Parameter | Description |
|---|---|
| `days` | Label shown after a number of days (default `Days`). |
| `hours` | Label shown after a number of hours (default `Hours`). |
| `minutes` | Label shown after a number of minutes (default `Minutes`). |
| `seconds` | Label shown after a number of seconds (default `Seconds`). |

## Placeholders

| Placeholder | Replaced by |
|---|---|
| `%time%` | The remaining time in the largest unit that is at least 1 (seconds if less than 1 second), e.g. `1.5 Minutes`. |
| `%time-d%` | The remaining time in days, e.g. `0.1 Days`. |
| `%time-h%` | The remaining time in hours. |
| `%time-m%` | The remaining time in minutes. |
| `%time-s%` | The remaining time in seconds. |

Amounts are rounded to one decimal place (a trailing `.0` is removed).

## Important Notes

- **Must be called before the cooldown function**, because the labels are read when the cooldown error message is built.
- The labels apply only to the current execution.
- The cooldown duration itself is set by `$cooldown`, `$serverCooldown` or `$globalCooldown`.

## Examples

### Localized cooldown message

```bdfd
$changeCooldownTime[jours;heures;minutes;secondes]
$cooldown[10m;Wait %time% before using this command again.]
$title[Daily Reward Claimed]
$description[You received **100 coins**!]
$color[#57F287]
```
