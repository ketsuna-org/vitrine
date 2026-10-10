---
layout: doc
title: Events & Placeholders
category: "Meta"
api_type: general
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

Each event workflow runs with the variables of its own event (for example the interaction events set `interaction.kind` and `interaction.customId`).

## Placeholders `((...))`

Placeholders insert runtime values into response messages, embeds, components and workflow inputs of Blocks and visual responses. They are resolved when the bot executes — not at design time.

```text
Welcome ((user.username))! You joined ((guild.name)).
```

> **BDScript text is not resolved.** The `((...))` resolver is not applied to the text of a native BDFD script (probe: `Hi ((date))` is returned unchanged). In a BDFD script use the `$functions`, for example `$username` and `$serverName`.

### Core placeholder families

| Prefix | Examples |
|--------|----------|
| `((user.*))` | `((user.id))`, `((user.username))`, `((user.avatar))` |
| `((member.*))` | `((member.nick))`, `((member.joinedAt))`, `((member.roles))` |
| `((guild.*))` | `((guild.name))`, `((guild.memberCount))` |
| `((channel.*))` | `((channel.id))`, `((channel.name))` |
| `((message.*))` | `((message.content))`, `((message.id))` |
| `((interaction.*))` | `((interaction.customId))`, `((interaction.kind))` |
| `((opts.*))` | `((opts.reason))`, `((opts.target.id))` (slash command options: for user, channel, role and mentionable options the ID is `opts.<name>.id`; modal inputs are also stored as `opts.<key>`) |

## Interaction placeholders

When a user clicks a button or submits a modal, interaction placeholders are populated automatically.

**BDScript (BDFD)** reads the custom ID with `$customID` (valid in a component or modal interaction):
```bdfd
$ephemeral
Clicked: $customID
```

**Blocks:**
```json
{
  "type": "respondWithMessage",
  "payload": {
    "content": "Clicked: ((interaction.customId))",
    "ephemeral": true
  }
}
```

See [Interactions overview](/docs/interactions-overview/) for component-specific patterns.

## Full reference

| Resource | Scope |
|----------|-------|
| [Template system](/docs/template-system/) | Complete `((...))` syntax, fallbacks, JSONPath, inline functions |
| [Exhaustive event variables guide](/reference-deployment/2026/05/22/available-variables-per-event-exhaustive/) | Every variable per event type |
| [JavaScript placeholders](/docs/javascript/placeholders/) | BDJS usage of `((...))` patterns |

## BDScript vs JavaScript

- **BDScript:** use `$functions`; `((...))` text inside a BDFD script is left as typed.
- **JavaScript:** see [variables](/docs/javascript/variables/) and [placeholders](/docs/javascript/placeholders/).

## Next steps

1. Persistent variables (`$getUserVar`, `$setUserVar`) — see the [Database variables guide](/advanced-topics/2026/05/30/mastering-persistent-database-variables-in-bdfd/).
2. Build your first event workflow with [Create Your First Command](/getting-started/2026/03/12/how-to-create-a-command-in-bot-creator-step-by-step/).
