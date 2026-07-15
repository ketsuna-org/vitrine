---
layout: doc
title: Events & Placeholders
category: "Meta"
description: How event-driven workflows and ((...)) placeholders work in Bot Creator bots.
permalink: /docs/events-and-placeholders/
---

Bot Creator bots react to Discord events (messages, joins, button clicks) and resolve dynamic values through the `((...))` template system.

## Event-driven workflows

Commands are not the only entry point. You can attach logic to Discord events such as:

| Event family | Typical use |
|--------------|-------------|
| `messageCreate` | Auto-moderation, keyword triggers |
| `guildMemberAdd` | Welcome messages, auto-roles |
| `interactionCreate` | Buttons, select menus, modals, slash commands |
| `voiceStateUpdate` | Voice channel logging |

Configure events in the Bot Creator app under **Events**. Each event workflow runs in its own context with event-specific placeholders available.

## Placeholders `((...))`

Placeholders insert runtime values into messages, embeds, and action parameters. They are resolved when the bot executes — not at design time.

```bdfd
$sendMessage[Welcome ((user.username))! You joined ((guild.name)).]
```

### Core placeholder families

| Prefix | Examples |
|--------|----------|
| `((user.*))` | `((user.id))`, `((user.username))`, `((user.avatar))` |
| `((member.*))` | `((member.nick))`, `((member.joinedAt))`, `((member.roles))` |
| `((guild.*))` | `((guild.name))`, `((guild.memberCount))` |
| `((channel.*))` | `((channel.id))`, `((channel.name))` |
| `((message.*))` | `((message.content))`, `((message.id))` |
| `((interaction.*))` | `((interaction.customId))`, `((interaction.kind))` |

## Interaction placeholders

When a user clicks a button or submits a modal, interaction placeholders are populated automatically:

```bdfd
$if[((interaction.kind))==button]
  $sendResponse[Clicked: ((interaction.customId)) // ephemeral]
$endif
```

See [Interactions overview](/docs/interactions-overview/) for component-specific patterns.

## Full reference

| Resource | Scope |
|----------|-------|
| [Template system](/docs/template-system/) | Complete `((...))` syntax, fallbacks, JSONPath, inline functions |
| [Exhaustive event variables guide](/reference-deployment/2026/05/22/available-variables-per-event-exhaustive/) | Every variable per event type |
| [JavaScript placeholders](/docs/javascript/placeholders/) | BDJS usage of `((...))` patterns |

## BDScript vs JavaScript

- **BDScript:** placeholders work directly in `$sendMessage`, embed fields, and component payloads.
- **JavaScript:** use template strings or read resolved values from the `variables` object. See [variables](/docs/javascript/variables/).

## Next steps

1. Register persistent variables in the app panel before using `$getUserVar` — see the [Database variables guide](/advanced-topics/2026/05/30/mastering-persistent-database-variables-in-bdfd/).
2. Build your first event workflow with [Create Your First Command](/getting-started/2026/03/12/how-to-create-a-command-in-bot-creator-step-by-step/).
