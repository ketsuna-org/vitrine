---
layout: doc
title: "Template System — ((...)) Placeholders & Functions"
translation_key: docs
category: reference
description: >
  Reference guide for the ((...)) template system used in Bot Creator
  messages, embeds, and action payloads. Covers variable placeholders,
  fallback values, JSONPath access, and all available inline template functions.
---

# Template System — `((...))` Placeholders

Placeholders let you inserves dynamic values into messages, embeds, and action
parameters. They are resolved at runtime — when your bot actually runs the
command or workflow.

## Basic syntax

```
((variableName))
```

Anything wrapped in `((` `))` is treated as a placeholder and replaced with
the actual value at execution time.

**Examples:**

```text
Hello ((userName)), welcome to ((guild.name))!
```

If `userName` is "Alice" and `guild.name` is "My Server", the message becomes:

```text
Hello Alice, welcome to My Server!
```

## Where placeholders work

Placeholders are resolved in:
- Message content (`$sendMessage`, `$reply`, `$dm`)
- Embed fields (title, description, footer, author, fields)
- Button labels and select menu options
- Modal titles and text inputs
- Action parameters that accept dynamic values

## Available variables

Bot Creator provides a rich set of runtime variables. Here are the most commonly used:

### Context
| Variable | Description |
|----------|-------------|
| `((userId))` | ID of the user who triggered the command |
| `((userName))` | Username of the triggering user |
| `((guildId))` | ID of the current server |
| `((guild.name))` | Name of the current server |
| `((channelId))` | ID of the current channel |
| `((channel.name))` | Name of the current channel |
| `((messageId))` | ID of the triggering message |

### Bot
| Variable | Description |
|----------|-------------|
| `((bot.id))` | Bot's user ID |
| `((bot.username))` | Bot's username |
| `((bot.guildCount))` | Number of servers the bot is in |
| `((bot.ping))` | Bot's latency in milliseconds |
| `((bot.uptime))` | Time since the bot started (formatted HH:MM:SS) |

### Time
| Variable | Description |
|----------|-------------|
| `((getTimestamp))` | Current Unix timestamp (seconds) |
| `((getTimestampMs))` | Current Unix timestamp (milliseconds) |
| `((date))` | Current date as `YYYY-MM-DD` |
| `((time))` | Current time as `HH:MM:SS` |
| `((day))` | Current day of month |
| `((month))` | Current month |
| `((year))` | Current year |
| `((hour))` | Current hour (UTC) |
| `((minute))` | Current minute (UTC) |
| `((second))` | Current second (UTC) |

### Scoped variables

When you use `$setUserVar`, `$setServerVar`, etc., the stored values are
accessible as placeholders:

```text
((global.myKey))         — global variable
((guild.bc_mySetting))   — server-scoped variable
((user.bc_myScore))      — user-scoped variable
((channel.bc_config))    — channel-scoped variable
```

---

## Fallback values with `|`

Use `|` to provide a fallback when a variable is not set:

```text
((target.user.username | userName))
((channel.topic | "No topic set"))
((guild.description | "No description"))
```

The engine tries each value from left to right. The first one that exists is
used. If nothing matches, the result is an empty string.

---

## JSONPath access

When a variable contains JSON (e.g. from `$httpGet`), use `.$` followed by a
path to extract nested values:

```text
((httpRequest.body.$.data))
((query.items.$[0].name))
((global.settings.$.channels.logs))
```

**Path segments:**
- `.field` — access an object property
- `[0]` — access an array index
- `$` — the root of the JSON document

**Examples:**

```text
# From an HTTP response containing {"items":[{"name":"Alice"},{"name":"Bob"}]}
((search.body.$.items[0].name))  → Alice
((search.body.$.items[1].name))  → Bob
```

---

## Template functions

Template functions transform values inline. They use the syntax
`functionName(arg1, arg2, ...)`.

### Text functions

| Function | Description | Example |
|----------|-------------|---------|
| `lowercase(text)` | Converts to lowercase | `((lowercase(userName)))` |
| `uppercase(text)` | Converts to uppercase | `((uppercase(userName)))` |
| `trim(text)` | Removes leading/trailing spaces | `((trim(userInput)))` |
| `replace(text, old, new)` | Replaces all occurrences | `((replace(title, "_", " ")))` |
| `contains(text, needle)` | Returns `"true"` if found (case-insensitive) | `((contains(role, "admin")))` |

### Array / list functions

These work on JSON arrays (e.g. HTTP responses, stored lists).

| Function | Description | Example |
|----------|-------------|---------|
| `length(array)` | Number of elements | `((length(query.items.$)))` |
| `at(array, index)` | Element at position | `((at(query.items.$, 0)))` |
| `first(array)` | First element | `((first(query.items.$)))` |
| `last(array)` | Last element | `((last(query.items.$)))` |
| `slice(array, start, end?)` | Sub-array or substring | `((slice(tags.$, 1, 3)))` |
| `join(array, separator)` | Joins elements into a string | `((join(tags.$, ", ")))` |
| `sum(array)` | Sum of numeric elements | `((sum(scores.$)))` |

### Formatting functions

| Function | Description |
|----------|-------------|
| `formatEach(array, template, separator)` | Formats each item with a template |
| `embedFields(array, nameTemplate, valueTemplate, inline?)` | Generates embed field JSON |

**formatEach example:**

```text
((formatEach(search.body.$.items, "{name} ({score})", "\n")))
```

If items is `[{"name":"Alice","score":12}, {"name":"Bob","score":7}]`, this produces:

```text
Alice (12)
Bob (7)
```

Item placeholders within the template:
- `{value}` — the item itself (for scalar arrays)
- `{field}` — a top-level property
- `{field.subField}` — a nested property

### Media functions

| Function | Description | Example |
|----------|-------------|---------|
| `avatar(url, format?, size?)` | Reformats a Discord avatar URL | `((avatar(userAvatar, "png", 256)))` |
| `banner(url, format?, size?)` | Reformats a Discord banner URL | `((banner(userBanner, "webp", 1024)))` |

**Parameters:**
- `format` — `"webp"` (default), `"png"`, `"jpg"`, or `"gif"` (animated only)
- `size` — power of 2 from 16 to 4096 (default 1024)

---

## Random functions

| Function | Description | Example |
|----------|-------------|---------|
| `coin()` | Random true/false — returns `"true"` or `""` | `((coin()))` |
| `randomchoice(a, b, ...)` | Picks one argument at random | `((randomchoice("Yes", "No", "Maybe")))` |
| `randomint(min, max)` | Random integer in `[min, max]` | `((randomint(1, 100)))` |

**Notes:**
- Use `coin()` when you need a true/false condition (returns `"true"` or empty).
- Use `randomchoice()` to pick from a list of options inline.
- Use `randomint()` for numeric random values.
- If you need to **store** a random result and reuse it across multiple actions,
  use the `$calculate[random...]` action instead.

---

## Completee examples

### Welcome message
```text
Welcome ((userName)) to ((guild.name))! We now have ((bot.guildCount)) members.
```

### User becaused
```text
**Author:** ((author.username | userName))
**ID:** ((author.id | userId))
**Avatar:** ((avatar(author.avatar, "png", 256)))
```

### HTTP response formatting
```text
**First result:** ((search.body.$.items[0].name))
**All results:**
((formatEach(search.body.$.items, "- {name}", "\n")))
```

### Embed with dynamic fields
```json
{
  "title": "Leaderboard",
  "fieldsTemplate": "((embedFields(scores.$, \"{name}\", \"{score}\", true)))"
}
```

### Conditional with coin
```text
$if[$checkCondition[((coin()))==true]]
  You won the coin flip!
$else
  Better luck next time!
$endif
```

---

## Important behaviors

| Situation | Result |
|-----------|--------|
| Variable exists | Resolved value |
| Unknown variable | `""` (empty string) |
| Fallback with a match | First matching value |
| JSONPath not found | `""` |
| Invalid JSON | `""` |
| Unknown function | `""` |
| Array/object as final value | JSON-serialized string |
| Embed URL without scheme | Field sislowly ignored |

---

## Best practices

- Use `formatEach()` to turn JSON arrays into readable text
- Use `embedFields()` to dynamically build embed fields from data
- Use `|` only for fallback, not for data transformation
- Use `coin()` for true/false conditions (not `random()`)
- When you need to **store and reuse** a random value, use the `$calculate` action
  with `random`, `randomFloat`, or `randomString` operations
- For HTTP responses that return arrays of objects, prefer `formatEach()` over
  manual indices:
  ```text
  # Good
  ((formatEach(items.$, "{name}", ", ")))

  # Avoid
  ((items.$[0].name)), ((items.$[1].name)), ((items.$[2].name))
  ```
