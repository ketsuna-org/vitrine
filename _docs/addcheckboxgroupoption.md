
---

# $addCheckboxGroupOption[] — Checkbox Group Option

`$addCheckboxGroupOption[]` adds an option to a checkbox group created with `$addModalCheckboxGroup[]` in the modal being built.

## Syntax

```text
$addCheckboxGroupOption[menuId;label;(value);(description);(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `menuId` | Yes (may be empty) | — | `customId` of the parent group. If empty, the last checkbox group of the modal is used. |
| `label` | Yes | — | Text displayed for the option. |
| `value` | No | the `label` | Value returned if selected. An empty value is sent as empty (it does not fall back to the label). |
| `description` | No | empty | Optional description (only sent if not empty). |
| `default` | No | `no` | `yes`/`true` if selected by default, `no`/`false` otherwise. Any other value is an error (`Expected yes or no, got "<value>".`). |

## Return value

Returns an empty string. The option is added to the group. If no group matches (no modal yet, no checkbox group yet, or no group with that `menuId`), nothing happens and no error is raised.

## Examples

### With explicit menuId

```bdfd
$newModal[config_modal;Config]
$addModalCheckboxGroup[Notifications;;notifications;0;3;no]
$addCheckboxGroupOption[notifications;Private messages;dm;Receive private message notifications;yes]
$addCheckboxGroupOption[notifications;Mentions;mentions;Notifications for mentions;yes]
$addCheckboxGroupOption[notifications;Announcements;announce;Server announcements;no]
```

### Without menuId (last group)

```bdfd
$newModal[pref_modal;Preferences]
$addModalCheckboxGroup[Visual Themes;;themes;0;3;no]
$addCheckboxGroupOption[;Minimal;minimal;Clean design;no]
$addCheckboxGroupOption[;Colored;colorful;Vibrant design;yes]
$addCheckboxGroupOption[;Dark;dark;Dark mode;yes]
```

### Two groups

```bdfd
$newModal[full_survey;Full Survey]
$addModalCheckboxGroup[Platforms;;platform;1;2;yes]
$addCheckboxGroupOption[platform;Discord;discord;;yes]
$addCheckboxGroupOption[platform;Twitter;twitter;;no]
$addModalCheckboxGroup[Content Type;;content;0;3;no]
$addCheckboxGroupOption[content;Articles;articles]
$addCheckboxGroupOption[content;Videos;videos]
$addCheckboxGroupOption[content;Podcasts;podcasts]
```

## Notes

- The value is read with `$input[customId]` of the group when the modal is submitted (several values are joined by commas).
- The group must exist before the option is added: the options are matched at the time of the call, searching the latest group first.
- The engine does not limit the number of options nor check lengths.
- `$newModal[]` takes the modal ID first, then its title.
