---
layout: doc
translation_key: docs
description: Adds an interactive or link button to the response, in the current action row or a chosen one.
category: "Components & Interactions"
---

# $addButtonCV2

Adds a button to the response message. Unlike `$addButton`, it has no `newRow` argument and no message ID: the row is chosen by the engine or by the optional `rowId`.

## Syntax

```text
$addButtonCV2[customIdOrURL;label;(style);(disabled);(emoji);(rowId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customIdOrURL` | Custom ID that identifies the button when it is clicked (1 to 100 characters), or the URL of a link button (HTTP or HTTPS). | Yes |
| `label` | Text of the button, 80 characters at most. It may be empty only when an `emoji` is given, otherwise the error `A button needs a label or emoji.` is raised. | Yes |
| `style` | `primary`, `secondary`, `success`, `danger` or `link`, in lowercase. Default: `primary` (also when the argument is empty). Any other value raises `Invalid button style.` | No |
| `disabled` | `yes`/`true` to disable the button, `no`/`false` (default, also when empty) to keep it enabled. Any other value raises `Expected yes or no`. | No |
| `emoji` | Emoji shown on the button: a Unicode emoji, a custom emoji written `<:name:id>` / `<a:name:id>`, or an alias such as `:smile:` (an unknown alias raises `Unknown emoji alias :name:.`). | No |
| `rowId` | ID of a row created with `$addActionRow[id]`. If that row exists and holds fewer than 5 buttons, the button is added to it; otherwise the default placement is used. | No |

## Row placement

Without `rowId`, the button is added to the last row of the message when that row only contains buttons and holds fewer than 5 of them. Otherwise a new row is started (a classic message can hold at most 5 rows; a Components V2 message is bounded by 40 components instead). Use `$addActionRow` to start a row yourself.

Custom IDs must be unique in the message (`Component custom IDs must be unique.`). For a `link` button the first argument must be an HTTP(S) URL (`Link buttons need a HTTP(S) URL.`) and no custom ID is sent.

## Examples

### Simple button

```bdfd
Press the button
$addButtonCV2[my_button;Click here;primary]
```

### Several rows

```bdfd
Make your choice
$addActionRow
$addButtonCV2[btn_yes;✅ Yes;success]
$addButtonCV2[btn_no;❌ No;danger]
$addActionRow
$addButtonCV2[btn_maybe;🤔 Maybe;secondary]
```

### Link button

```bdfd
Visit the website
$addButtonCV2[https://discord.com;Discord Website;link;no;🌐]
```

### Disabled button

```bdfd
Feature coming soon
$addButtonCV2[btn_disabled;Unavailable;primary;yes;🚫]
```

## Handling the click

A button is handled by a **workflow** with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `my_button`, not by the command that sent it. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
You clicked $customID!
```

To change the clicked message, see `$editButton`, `$removeComponent` and `$editMessageCV2`.

## Notes

- The button belongs to the response message of the script (its text and embeds), not to a message sent with `$sendMessage[]`.
- A button can be added after `$addTextDisplay`, `$addSeparator`, `$addThumbnail`, `$addMediaGallery`, `$addFile`, `$addContainer` or `$addSection`: it goes in an action row. In a script that names no container or section, a row added after a container goes inside that container.
- To put the row in a named container, start it with `$addActionRow[id;container]` and give its `id` as `rowId`.
