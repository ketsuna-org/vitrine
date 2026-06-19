---
layout: doc
title: $addCheckboxGroupOption[]
translation_key: docs
category: "Embed & Message"
function_name: addCheckboxGroupOption
syntax: $addCheckboxGroupOption[menuId;label;value;(description);(default)]
description: Adds an individual option to a checkbox group in a modal. The menuId can be omitted to target the last group created.
---

# $addCheckboxGroupOption[] — Checkbox Group Option

`$addCheckboxGroupOption[]` adds an option to a checkbox group created with `$addModalCheckboxGroup[]`. Each option appears as a distinct checkbox with its own label.

## Syntax

```
$addCheckboxGroupOption[menuId;label;value;(description);(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `menuId` | No | Last group | Identifier of the parent group. |
| `label` | Yes | — | Text displayed for this option. |
| `value` | Yes | — | Value returned when the option is checked. |
| `description` | No | — | Optional description text. |
| `default` | No | `no` | `yes` if checked by default. |

## Return value

Adds the option to the parent group. No direct return value.

## Usage

### With explicit menuId

```bdfd
$newModal[Config;config_modal]
$addModalCheckboxGroup[notifications;Notifications;no]
$addCheckboxGroupOption[notifications;Private messages;dm;Receive private message notifications;yes]
$addCheckboxGroupOption[notifications;Mentions;mentions;Notifications for @mentions;yes]
$addCheckboxGroupOption[notifications;Announcements;announce;Server announcements;no]
```

### Without menuId (last group)

```bdfd
$newModal[Preferences;pref_modal]
$addModalCheckboxGroup[themes;Visual Themes;no]
$addCheckboxGroupOption[;Minimal;minimal;Clean design;no]
$addCheckboxGroupOption[;Colored;colorful;Vibrant design;yes]
$addCheckboxGroupOption[;Dark;dark;Dark mode;yes]
```

### Multiple distinct groups

```bdfd
$newModal[Full Survey;full_survey]
$addModalCheckboxGroup[platform;Platforms;yes]
$addCheckboxGroupOption[platform;Discord;discord;;yes]
$addCheckboxGroupOption[platform;Twitter;twitter;;no]

$addModalCheckboxGroup[content;Content Type;no]
$addCheckboxGroupOption[content;Articles;articles]
$addCheckboxGroupOption[content;Videos;videos]
$addCheckboxGroupOption[content;Podcasts;podcasts]
```

## Notes

- If `menuId` is omitted (empty string), the option is added to the last group created.
- Maximum of 25 options per group.
- The values of checked options are retrieved via `$input[menuId]`, separated by commas.

