---
layout: doc
title: Placeholders
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Context placeholders ((author.id)) used in BibiScript and available in script templates.
permalink: /docs/javascript/placeholders/
---

Placeholders inject runtime context into BibiScript templates. In BDJS you typically use the `interaction`, `message`, `guild`, and `channel` globals directly, but placeholders remain available in mixed BibiScript/BDJS workflows.

## Syntax

```
((variable.path))
```

## Common placeholders

| Placeholder | Description |
|-------------|-------------|
| `((author.id))` | User who triggered the command |
| `((author.username))` | Username |
| `((guild.id))` | Current guild ID |
| `((channel.id))` | Current channel ID |
| `((interaction.customId))` | Component custom ID |
| `((interaction.stringSelect.value))` | Select menu value |

## BibiScript example

```bdfd
$sendMessage[Hello <@((author.id))>!]
```

## Full reference

See the [Available Variables per Event](/blog/) guide for an exhaustive event-variable list.

For component interactions, see [Handling Rich Interactions](/blog/) — buttons, select menus, and modals.
