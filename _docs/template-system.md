---
layout: doc
title: "Template System — ((...)) Placeholders & Functions"
translation_key: docs
category: "Meta"
api_type: general
description: >
  Reference guide for the ((...)) template system used in Bot Creator
  messages, embeds, and action payloads. Covers variable placeholders,
  fallback values, JSONPath access, and all available inline template functions.
---

# Template System — `((...))` Placeholders

Placeholders let you insert dynamic values into messages, embeds, and action
parameters. They are resolved at runtime — when your bot actually runs the
command or workflow.

> **Not for BDFD script text.** The resolver is not applied to the text of a native BDFD script: `Hi ((date))` run as a BDFD script is returned unchanged. Placeholders work in the structured fields listed under "Where placeholders work". Inside a BDFD script use the `$functions` instead.

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

The resolver (`resolveTemplatePlaceholders`) is called on:
- The response text, embed fields (title, description, footer, author, ...), button labels and custom IDs, and modal definitions of an interaction response (`actions/interaction_response.dart`)
- Component interaction inputs (`actions/handle_component_interaction.dart`)
- Workflow inputs (`engine/workflow_executor.dart`) and the workflow arguments of autocomplete (`engine/command_executor.dart`)
- The bot presence text (for example `((bot.guildCount))`, `((bot.uptime))`)
- Canvas image sources and text (`services/canvas_image_renderer.dart`)

## Available variables

An unknown variable resolves to an empty string. The names below are those set by the runtime context (`utils/global.dart`, `utils/template_resolver.dart`).

### Context

| Variable | Description |
|----------|-------------|
| `((userId))` | ID of the user who triggered the command |
| `((userName))` | Username of the triggering user |
| `((guildId))` | ID of the current server |
| `((guild.name))` | Name of the current server |
| `((channelId))` | ID of the current channel |
| `((channel.name))` | Name of the current channel |

`user.id`, `user.username`, `author.id`, `author.username`, `guild.id` and `channel.id` are also available.

### Bot

| Variable | Description |
|----------|-------------|
| `((bot.id))` | Bot's user ID |
| `((bot.guildCount))` | Number of servers the bot is in (`0` when the caller supplies no value) |
| `((bot.ping))` | Latency value supplied by the runtime (`0` when none is supplied) |
| `((bot.uptime))` | Time since the bot started, formatted `HH:MM:SS` (computed from a millisecond value) |

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
| `((hour))` | Current hour |
| `((minute))` | Current minute |
| `((second))` | Current second |

`date`, `time`, `day`, `month`, `year`, `hour`, `minute` and `second` are read from the clock of the machine running the bot with `DateTime.now()`, in its **local** time zone (not forced to UTC). `((actualTime))` is the current time as a UTC ISO 8601 string.

### Scoped variables

Custom variables are recognized in the runtime context under these keys:

```text
((global.myKey))         — global variable
((guild.bc_mySetting))   — server-scoped variable (prefix guild or server)
((user.bc_myScore))      — user-scoped variable
((channel.bc_config))    — channel-scoped variable
```

Member (`guildMember` or `member`) and message scopes use the same `scope.bc_name` form.

---

## Fallback values with `|`

Use `|` to provide a fallback when a variable is not set:

```text
((target.user.username | userName))
((channel.topic | "No topic set"))
((guild.description | 'No description'))
```

The engine tries each value from left to right. The first one that exists is
used; a quoted string (double or single quotes) is a literal. If nothing matches, the result is an empty string.

---

## JSONPath access

When a variable contains JSON (e.g. from an HTTP request), use `.$` followed by a
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

## Template functions — parentheses syntax

Template functions use `functionName(arg1, arg2, ...)` with comma-separated
arguments.

### Text functions

| Function | Description | Example |
|----------|-------------|---------|
| `lowercase(text)` | Converts to lowercase | `((lowercase(userName)))` |
| `uppercase(text)` | Converts to UPPERCASE | `((uppercase(userName)))` |
| `titlecase(text)` | Converts to Title Case | `((titlecase(channelName)))` |
| `trim(text)` | Removes leading/trailing spaces | `((trim(userInput)))` |
| `replace(text, old, new)` | Replaces all occurrences | `((replace(title, "_", " ")))` |
| `contains(text, needle)` | Returns `"true"` if found (case-insensitive), otherwise an empty string | `((contains(role, "admin")))` |
| `charcount(text)` | Number of characters (alias: `length`) | `((charcount(userName)))` |
| `linescount(text)` | Number of lines | `((linescount(description)))` |
| `split(text, sep, index?)` | Splits the text; with a 0-based `index`, returns that part | `((split(tags, ",", 0)))` |
| `croptext(text, max, suffix?)` | Keeps the first `max` characters and appends the suffix (default `...`) when the text is longer | `((croptext(bio, 100, "...")))` |
| `numberseparator(num, sep?)` | Formats number with thousands separator (default `,`) | `((numberseparator(memberCount, " ")))` |
| `url(mode, text)` | URL-encodes or decodes text (`encode` turns a space into `+`) | `((url("encode", rawText)))` |

**Aliases (parentheses syntax):** `lower`, `upper`, `title` for the case functions, `tolowercase`, `touppercase`, `totitlecase`, and `charcounts` for `charcount`.

`bytecount` exists only in the bracket syntax: `((bytecount(text)))` returns an empty string.

### Array / list functions

These work on JSON arrays (e.g. HTTP responses, stored lists).

| Function | Description | Example |
|----------|-------------|---------|
| `length(array)` | Number of elements | `((length(query.items.$)))` |
| `at(array, index)` | Element at position (0-based; empty if out of range) | `((at(query.items.$, 0)))` |
| `first(array)` | First element | `((first(query.items.$)))` |
| `last(array)` | Last element | `((last(query.items.$)))` |
| `slice(array, start, end?)` | Sub-array | `((slice(tags.$, 1, 3)))` |
| `join(array, separator)` | Joins elements into a string | `((join(tags.$, ", ")))` |
| `sum(array)` | Sum of numeric elements | `((sum(scores.$)))` |

**Note:** `slice()` also works on strings: `((slice("hello", 1, 4)))` → `"ell"`.
In the parentheses syntax `sum()` takes an array only: `((sum(10, 20, 30)))` returns an empty string. For several numbers use the bracket form `((sum[10;20;30]))`.

### Formatting functions

| Function | Description |
|----------|-------------|
| `formatEach(array, template, separator)` | Formats each item with a template (the three arguments are required) |
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
| `avatar(url, format?, size?)` | Rewrites the extension and `size` query of a Discord avatar URL | `((avatar(userAvatar, "png", 256)))` |
| `banner(url, format?, size?)` | Same for a Discord banner URL | `((banner(userBanner, "webp", 1024)))` |

**Parameters:**
- `format` — one of the supported image formats (`png`, `jpg`, `jpeg`, `webp`, `gif`); default `webp`. An unsupported value falls back to `webp`.
- `size` — any integer, clamped between 16 and 4096 (default 1024). It is not restricted to powers of 2.

### Random functions

| Function | Description | Example |
|----------|-------------|---------|
| `coin()` | Random `"true"` or `""` | `((coin()))` |
| `random()` | Alias for `coin()` | `((random()))` |
| `randomchoice(a, b, ...)` | Picks one argument at random (alias: `randomtext`) | `((randomchoice("Yes", "No", "Maybe")))` |
| `randomint(min, max)` | Random integer in `[min, max]` (empty if `max < min`) | `((randomint(1, 100)))` |

**Notes:**
- Use `coin()` when you need a true/false condition (returns `"true"` or empty).
- Use `randomchoice()` to pick from a list of options inline.
- Use `randomint()` for numeric random values.

---

## Template functions — bracket syntax

Bracket-syntax functions are written **inside the double parentheses**: `((functionName[arg1;arg2;...]))`, with semicolon-separated
arguments. Written without the `((` `))`, for example `[calculate;5 * 2]`, the text is left unchanged.

### Math functions

| Function | Description | Example |
|----------|-------------|---------|
| `calculate[expr]` | Evaluates a math expression | `((calculate[5 * (2 + 3)]))` → `25` |
| `ceil[num]` | Rounds up to nearest integer | `((ceil[3.2]))` → `4` |
| `floor[num]` | Rounds down to nearest integer | `((floor[3.8]))` → `3` |
| `round[num]` | Rounds to nearest integer | `((round[3.5]))` → `4` |
| `sqrt[num]` | Square root | `((sqrt[16]))` → `4` |
| `max[a;b]` | Larger of two numbers (only the first two arguments are used) | `((max[42;17]))` → `42` |
| `min[a;b]` | Smaller of two numbers | `((min[42;17]))` → `17` |
| `modulo[a;b]` | Remainder after division | `((modulo[10;3]))` → `1` |
| `multi[a;b]` | Multiplication | `((multi[6;7]))` → `42` |
| `divide[a;b]` | Division (dividing by `0` gives `0`) | `((divide[10;2]))` → `5` |
| `sub[a;b]` | Subtraction | `((sub[10;3]))` → `7` |
| `sum[a;b;c]` | Sum of several numbers | `((sum[1;2;3;4]))` → `10` |
| `random[min;max]` | Random integer in `[min, max]` | `((random[1;100]))` |

**Note:** Use `calculate[]` for complex expressions with variables:
`((calculate[((userVarBalance)) * 1.2]))`.

### Logic functions

| Function | Description | Example |
|----------|-------------|---------|
| `checkcondition[expr]` | Evaluates a comparison expression | `((checkcondition[((age))>=18]))` → `"true"` or `"false"` |
| `and[cond1;cond2;...]` | True if ALL conditions are true | `((and[((a))>=10;((b))>=5]))` |
| `or[cond1;cond2;...]` | True if ANY condition is true | `((or[((role))==admin;((role))==mod]))` |

Variables inside a condition must themselves be written `((name))`: a bare name such as `age>=18` is compared as the literal text `age`.

**checkcondition operators:**

| Operator | Meaning |
|----------|---------|
| `>=` | Greater or equal |
| `<=` | Less or equal |
| `==` | Equals |
| `!=` | Not equals |
| `>` | Greater than |
| `<` | Less than |
| `contains` | String contains (case-insensitive) |
| `notContains` | String does not contain |
| `startsWith` | String starts with |
| `endsWith` | String ends with |

**Examples:**

```text
# Numeric comparison
((checkcondition[((hour))>=12]))
→ "true" if the hour is 12 or later, "false" otherwise

# String comparison
((checkcondition[((userName))==Alice]))
→ "true" if the user is Alice

# Combined with and/or
((and[((score))>=50;((level))>=10]))
→ "true" if both conditions pass
```

### Utility functions

| Function | Description | Example |
|----------|-------------|---------|
| `date[]` | Current date as `YYYY-MM-DD` | `((date[]))` |
| `trimcontent[text]` | Removes leading/trailing spaces (alias: `trimspace`) | `((trimcontent[  hello  ]))` → `hello` |
| `charcount[text]` | Character count (bracket variant) | `((charcount[hello]))` → `5` |
| `linescount[text]` | Line count (bracket variant) | `((linescount[((description))]))` |
| `croptext[text;max;suffix?]` | Truncates text with suffix | `((croptext[((bio));50;...]))` |
| `bytecount[text]` | UTF-8 byte count | `((bytecount[héllo]))` → `6` |
| `url[mode;text]` | URL encode/decode (`encode` turns a space into `+`) | `((url[encode;hello world]))` → `hello+world` |
| `tolowercase[text]` | Lowercase (bracket variant) | `((tolowercase[HELLO]))` → `hello` |
| `touppercase[text]` | Uppercase (bracket variant) | `((touppercase[hello]))` → `HELLO` |
| `totitlecase[text]` | Title case (bracket variant) | `((totitlecase[hello world]))` → `Hello World` |
| `randomtext[choice1;choice2;...]` | Picks one at random | `((randomtext[Yes;No;Maybe]))` |
| `listvar[separator?]` | Lists the temporary variables as `name: "value"` (default separator `, `) | `((listvar[, ]))` |
| `userperms[userId?;amount?;sep?]` | Lists the permissions of a user (from `permissions.byId.<id>`, or `member.permissions` for the author) | `((userperms[((author.id));5;, ]))` |
| `servernames[amount?;sep?]` | Lists the server names the bot is in (from `bot.guildNames`) | `((servernames[10;, ]))` |
| `variablescount[type?]` | Counts custom variables by scope; without an argument, all scopes | `((variablescount[global]))` |

**`variablescount` scope values:** `temp`, `global`, `user`, `guild` (or `server`), `channel`, `guildMember` (or `member`), `message`.

---

## Complete examples

### Welcome message
```text
Welcome ((userName)) to ((guild.name))! The bot is in ((bot.guildCount)) servers.
```

### User info with fallbacks
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

### Title case with bracket syntax
```text
((titlecase(channel.name)))         — parentheses syntax
((totitlecase[((channel.name))]))   — bracket syntax equivalent
```

### Math with variables
```text
Your balance with 20% bonus: ((calculate[((userVarBalance)) * 1.2]))
```

### Combined logic check
```text
((and[((score))>=50;((level))>=10]))
```

### URL encoding
```text
Search URL: https://google.com/search?q=((url[encode;((searchTerm))]))
```

### Count variables
```text
You have ((variablescount[user])) user variables set.
```

---

## Important behaviors

| Situation | Result |
|-----------|--------|
| Variable exists | Resolved value |
| Unknown variable | `""` (empty string) |
| Fallback with a match | First matching value |
| JSONPath not found | `""` |
| Unknown function | `""` |
| Array/object as final value | JSON-serialized string |

---

## Best practices

- Use `formatEach()` to turn JSON arrays into readable text
- Use `embedFields()` to dynamically build embed fields from data
- Use `|` only for fallback, not for data transformation
- Use `coin()` for true/false conditions
- For complex math, use `((calculate[...]))` — it evaluates expressions with
  parentheses and the operators `+ - * / % ^`
- For HTTP responses that return arrays of objects, prefer `formatEach()` over
  manual indices:
  ```text
  # Good
  ((formatEach(items.$, "{name}", ", ")))

  # Avoid
  ((items.$[0].name)), ((items.$[1].name)), ((items.$[2].name))
  ```
- Use the bracket syntax (`((func[arg1;arg2]))`) for math, logic, and system functions;
  use the parentheses syntax (`((func(arg1, arg2)))`) for text and array manipulation
