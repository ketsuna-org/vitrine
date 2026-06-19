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

Placeholders let you insert dynamic values into messages, embeds, and action
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
| `contains(text, needle)` | Returns `"true"` if found (case-insensitive) | `((contains(role, "admin")))` |
| `charcount(text)` | Number of characters (alias: `length`) | `((charcount(userName)))` |
| `linescount(text)` | Number of lines | `((linescount(description)))` |
| `split(text, sep, index?)` | Splits and optionally gets one part | `((split(tags, ",", 0)))` |
| `croptext(text, max, suffix?)` | Truncates text, adds suffix | `((croptext(bio, 100, "...")))` |
| `numberseparator(num, sep?)` | Formats number with thousands separator | `((numberseparator(memberCount, " ")))` |
| `url(mode, text)` | URL-encodes or decodes text | `((url("encode", rawText)))` |
| `bytecount(text)` | Number of UTF-8 bytes | `((bytecount(message)))` |

**Aliases:**
- `lower` = `lowercase`, `tolowercase` (bracket: `[tolowercase]`)
- `upper` = `uppercase`, `touppercase` (bracket: `[touppercase]`)
- `title` = `titlecase`, `totitlecase` (bracket: `[totitlecase]`)
- `charcounts` = `charcount` (bracket: `[charcount]`)

### Array / list functions

These work on JSON arrays (e.g. HTTP responses, stored lists).

| Function | Description | Example |
|----------|-------------|---------|
| `length(array)` | Number of elements | `((length(query.items.$)))` |
| `at(array, index)` | Element at position | `((at(query.items.$, 0)))` |
| `first(array)` | First element | `((first(query.items.$)))` |
| `last(array)` | Last element | `((last(query.items.$)))` |
| `slice(array, start, end?)` | Sub-array | `((slice(tags.$, 1, 3)))` |
| `join(array, separator)` | Joins elements into a string | `((join(tags.$, ", ")))` |
| `sum(array)` | Sum of numeric elements | `((sum(scores.$)))` |

**Note:** `slice()` also works on strings: `((slice("hello", 1, 4)))` → `"ell"`.
`sum()` also accepts multiple arguments: `((sum(10, 20, 30)))` → `60`.

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

### Random functions

| Function | Description | Example |
|----------|-------------|---------|
| `coin()` | Random `"true"` or `""` | `((coin()))` |
| `random()` | Alias for `coin()` | `((random()))` |
| `randomchoice(a, b, ...)` | Picks one argument at random | `((randomchoice("Yes", "No", "Maybe")))` |
| `randomint(min, max)` | Random integer in `[min, max]` | `((randomint(1, 100)))` |
| `randomtext(a, b, c)` | Picks one at random (bracket variant) | `[randomtext;Heads;Tails]` |

**Notes:**
- Use `coin()` when you need a true/false condition (returns `"true"` or empty).
- Use `randomchoice()` to pick from a list of options inline.
- Use `randomint()` for numeric random values.
- If you need to **store** a random result and reuse it across multiple actions,
  use the `$calculate[random...]` action instead.

---

## Template functions — bracket syntax

Bracket-syntax functions use `functionName[arg1;arg2;...]` with semicolon-separated
arguments. These are typically used for math, logic, and system queries.

### Math functions

| Function | Description | Example |
|----------|-------------|---------|
| `calculate[expr]` | Evaluates a math expression | `[calculate;5 * (2 + 3)]` → `25` |
| `ceil[num]` | Rounds up to nearest integer | `[ceil;3.2]` → `4` |
| `floor[num]` | Rounds down to nearest integer | `[floor;3.8]` → `3` |
| `round[num]` | Rounds to nearest integer | `[round;3.5]` → `4` |
| `sqrt[num]` | Square root | `[sqrt;16]` → `4` |
| `max[a;b]` | Larger of two numbers | `[max;42;17]` → `42` |
| `min[a;b]` | Smaller of two numbers | `[min;42;17]` → `17` |
| `modulo[a;b]` | Remainder after division | `[modulo;10;3]` → `1` |
| `multi[a;b]` | Multiplication | `[multi;6;7]` → `42` |
| `divide[a;b]` | Division | `[divide;10;2]` → `5` |
| `sub[a;b]` | Subtraction | `[sub;10;3]` → `7` |
| `sum[a;b;c]` | Sum of multiple numbers | `[sum;1;2;3;4]` → `10` |
| `random[min;max]` | Random integer in `[min, max]` | `[random;1;100]` |

**Note:** Use `calculate[]` for complex expressions with variables:
`[calculate;((userVarBalance)) * 1.2]`.

### Logic functions

| Function | Description | Example |
|----------|-------------|---------|
| `checkcondition[expr]` | Evaluates a comparison expression | `[checkcondition;((age))>=18]` → `"true"` or `"false"` |
| `and[cond1;cond2;...]` | True if ALL conditions are true | `[and;((a))>=10;((b))>=5]` |
| `or[cond1;cond2;...]` | True if ANY condition is true | `[or;((role))==admin;((role))==mod]` |

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
[checkcondition;((hour))>=12]
→ "true" if it's PM, "false" if AM

# String comparison
[checkcondition;((userName))==Alice]
→ "true" if the user is Alice

# Combined with and/or
[and;[checkcondition;((score))>=50];[checkcondition;((level))>=10]]
→ "true" if both conditions pass
```

### Utility functions

| Function | Description | Example |
|----------|-------------|---------|
| `date[]` | Current date as `YYYY-MM-DD` | `[date]` → `2026-06-19` |
| `trimcontent[text]` | Removes spaces (alias: `trimspace`) | `[trimcontent;  hello  ]` → `hello` |
| `charcount[text]` | Character count (bracket variant) | `[charcount;hello]` → `5` |
| `linescount[text]` | Line count (bracket variant) | `[linescount;((description))]` |
| `croptext[text;max;suffix?]` | Truncates text with suffix | `[croptext;((bio));50;...]` |
| `bytecount[text]` | UTF-8 byte count | `[bytecount;((message))]` |
| `url[mode;text]` | URL encode/decode | `[url;encode;hello world]` → `hello%20world` |
| `tolowercase[text]` | Lowercase (bracket variant) | `[tolowercase;HELLO]` → `hello` |
| `touppercase[text]` | Uppercase (bracket variant) | `[touppercase;hello]` → `HELLO` |
| `totitlecase[text]` | Title case (bracket variant) | `[totitlecase;hello world]` → `Hello World` |
| `randomtext[choice1;choice2;...]` | Picks one at random | `[randomtext;Yes;No;Maybe]` |
| `listvar[separator?]` | Lists all variable names | `[listvar;, ]` |
| `userperms[userId?;amount?;sep?]` | Lists user's permissions | `[userperms;((author.id));5;, ]` |
| `servernames[amount?;sep?]` | Lists server names | `[servernames;10;, ]` |
| `variablescount[type]` | Counts variables by scope | `[variablescount;global]` |

**`variablescount` scope values:** `global`, `user`, `guild` (or `server`), `channel`.

---

## Complete examples

### Welcome message
```text
Welcome ((userName)) to ((guild.name))! We now have ((bot.guildCount)) members.
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
[totitlecase;((channel.name))]      — bracket syntax equivalent
```

### Conditional with coin
```text
$if[$checkCondition[((coin()))==true]]
  You won the coin flip!
$else
  Better luck next time!
$endif
```

### Math with variables
```text
Your balance with 20% bonus: [calculate;((userVarBalance)) * 1.2]
```

### Combined logic check
```text
[and;[checkcondition;((score))>=50];[checkcondition;((level))>=10]]
```

### URL encoding
```text
Search URL: https://google.com/search?q=[url;encode;((searchTerm))]
```

### Count variables
```text
You have [variablescount;user] user variables set.
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
| Embed URL without scheme | Field silently ignored |

---

## Best practices

- Use `formatEach()` to turn JSON arrays into readable text
- Use `embedFields()` to dynamically build embed fields from data
- Use `|` only for fallback, not for data transformation
- Use `coin()` for true/false conditions (not `random()`)
- When you need to **store and reuse** a random value, use the `$calculate` action
  with `random`, `randomFloat`, or `randomString` operations
- For complex math, use `calculate[]` — it evaluates full expressions with
  support for parentheses and all standard operators
- For HTTP responses that return arrays of objects, prefer `formatEach()` over
  manual indices:
  ```text
  # Good
  ((formatEach(items.$, "{name}", ", ")))

  # Avoid
  ((items.$[0].name)), ((items.$[1].name)), ((items.$[2].name))
  ```
- Use bracket syntax (`[func;arg1;arg2]`) for math, logic, and system functions;
  use parentheses syntax (`func(arg1, arg2)`) for text and array manipulation
