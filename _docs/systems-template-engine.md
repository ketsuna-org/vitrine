---
layout: doc
title: "System — Template Engine"
translation_key: docs
category: systems
description: >
  Documentation for the ((...)) placeholder resolution system in the
  BDFD Bot Creator engine. Covers syntax, bracket functions [func;args],
  parenthesis functions func(args), dynamic variables (timestamp, date,
  uptime), the fallback system, and the complete internal architecture of
  template_resolver.dart (1809 lines).
---

# System — Template Engine

The **template resolver** is the component that replaces all `((key))` placeholders with their actual values at execution time. This resolution is essential because the transpiler deliberately inserts placeholders into action payloads when a value is not known at compile time.

Main file: `packages/shared/lib/utils/template_resolver.dart` (1809 lines). The function `resolveTemplatePlaceholders()` is called before every action execution to scan the text and replace all placeholders with their runtime values.

## Introduction

### Why placeholders?

The BDFD transpiler operates in two phases:

1. **Compile-time**: the BDFD source code is parsed and transformed into `List<Action>`. If a value is known (e.g., `$color[#FF0000]`), it is inserted directly.
2. **Runtime**: if a value depends on a variable that only exists at execution time (e.g., `$sendMessage[Hello $username]`), the transpiler **emits a placeholder** `((username))` in the payload.

```
Source BDFD : $sendMessage[Hello $username]

Transpiled Action payload:
  { "content": "Hello ((username))" }

Resolution at runtime:
  ((username)) → "Jean"
  { "content": "Hello Jean" }
```

---

## Placeholder syntax

### Basic syntax

```
((name.attribute))
```

Placeholders are always wrapped in **double parentheses** `((...))`. The access path uses the **dot** as a separator.

### Common examples

| Placeholder | Resolution | Description |
|-------------|-----------|-------------|
| `((guild.id))` | `"987654321098765432"` | Current server ID |
| `((guild.name))` | `"My Awesome Server"` | Current server name |
| `((author.id))` | `"123456789012345678"` | Message author ID |
| `((author.name))` | `"Jean"` | Author's username |
| `((message.content))` | `"!ping"` | Triggering message content |
| `((message.id))` | `"111222333444555666"` | Triggering message ID |
| `((channel.id))` | `"222333444555666777"` | Current channel ID |
| `((channel.name))` | `"general"` | Current channel name |
| `((member.displayName))` | `"Jean [Dev]"` | Member's display nickname |
| `((member.nickname))` | `"Jean"` | Member's nickname |
| `((global.myVar))` | `"42"` | Global variable `myVar` |
| `((lastMessageId))` | `"111222333"` | Result of a previous action |

---

## How the resolver works

### The 3 resolution stages

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLACEHOLDER RESOLUTION                         │
│                                                                   │
│  1. THE TRANSPILER EMITS PLACEHOLDERS                              │
│     ┌─────────────────────────────────────────────────────────┐  │
│     │ During transpilation, when a runtime variable is         │  │
│     │ encountered (e.g., $username in BDFD code), the          │  │
│     │ transpiler cannot resolve it → it inserts a              │  │
│     │ placeholder ((username)) in the Action payload.          │  │
│     └─────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              ▼                                    │
│  2. BEFORE EXECUTION, resolveTemplatePlaceholders() SCANS         │
│     ┌─────────────────────────────────────────────────────────┐  │
│     │ The function parses the payload text and detects all     │  │
│     │ ((...)) patterns. For each placeholder found:            │  │
│     │                                                          │  │
│     │   a. Parses the path (e.g., "author.id")                  │  │
│     │   b. Looks up the value in the VariablesMap              │  │
│     │   c. If found → replaces the placeholder with the value  │  │
│     │   d. If not found → applies operators (fallback)         │  │
│     │   e. If still nothing → empty placeholder or error       │  │
│     └─────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              ▼                                    │
│  3. VARIABLES COME FROM runtime_variables.dart                    │
│     ┌─────────────────────────────────────────────────────────┐  │
│     │ The VariablesMap is hydrated from two sources:           │  │
│     │                                                          │  │
│     │   • Discord context: message, author, guild, channel,    │  │
│     │     member, interaction (via event_contexts.dart)        │  │
│     │                                                          │  │
│     │   • Database (Store): persistent variables               │  │
│     │     (global, user, guild, channel, member, message)      │  │
│     │                                                          │  │
│     │ The variable catalog is defined in                       │  │
│     │ variable_catalog.dart (WorkflowVariableDefinition)       │  │
│     └─────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### resolveTemplatePlaceholders() function

```dart
String resolveTemplatePlaceholders(
  String input,
  Map<String, String> updates,
) {
  if (input.isEmpty) return input;

  final buffer = StringBuffer();
  var index = 0;
  while (index < input.length) {
    final start = input.indexOf('((', index);
    if (start == -1) {
      buffer.write(input.substring(index));
      break;
    }

    buffer.write(input.substring(index, start));
    var cursor = start + 2;
    var depth = 0;
    // ... parse parentheses, quotes, depth ...
    // Find the closing ))
    // Extract the expression between (( and ))
    buffer.write(resolveTemplateExpressionToString(expression, updates));
    index = cursor + 2;
  }

  return buffer.toString();
}
```

The function `resolveTemplatePlaceholders` is the entry point: it scans the input character by character, detects the `((` and `))` delimiters while respecting nesting depth, extracts the expression, then delegates to `resolveTemplateExpressionToString` and finally to `_evaluateExpression`.

---

## Operators

### Fallback operator `|`

The pipe operator `|` defines a fallback value if the first variable is empty or absent. It is implemented in `_evaluateExpression` via `_splitTopLevel(input, '|')`: each candidate is evaluated sequentially until a non-empty value is found.

```
((primary_source|fallback_source))
```

**Examples:**

| Expression | Behavior |
|-----------|-------------|
| `((message.mentions[0]\|author.id))` | First mentioned user, otherwise the author's ID |
| `((member.nickname\|author.name))` | Member's nickname, otherwise the username |
| `((channel.topic\|No topic))` | Channel topic, otherwise "No topic" |
| `((user.bc_color\|#FF0000))` | User variable `color`, otherwise default red |

**Typical BDFD code using fallback:**

```bdfd
$sendMessage[Welcome ((member.nickname|author.name)) to the server!]
$sendMessage[Channel topic: ((channel.topic|No topic set))]
$banMember[((message.mentions[0]|No user mentioned))]
```

---

## Indexing

Indexing allows access to a specific element of a list or array.

### Message indexing

| Expression | Result |
|-----------|---------|
| `((message.content[0]))` | First word of the message |
| `((message.content[1]))` | Second word of the message |
| `((message.content[-1]))` | Last word of the message |

**BDFD example:**

```bdfd
$if[$message[0] == !ban]
  $banMember[$message[1]]
$endif
```

Here, `$message[0]` is resolved by the transpiler into the placeholder `((message.content[0]))`, which is then resolved by the template resolver.

### Mention indexing

| Expression | Result |
|-----------|---------|
| `((message.mentions[0]))` | ID of the first mentioned user |
| `((message.mentions[1]))` | ID of the second mentioned user |
| `((message.mentions[-1]))` | ID of the last mentioned user |
| `((message.mentionRoles[0]))` | ID of the first mentioned role |
| `((message.mentionChannels[0]))` | ID of the first mentioned channel |

**BDFD example:**

```bdfd
$banMember[$message[0]]
$sendMessage[((message.mentions[0])) has been banned.]
```

### BDFD collection indexing (bracket syntax)

The resolver also supports collection indexing via the syntax `collection[index]` or `collection[separator;limit]`, used for complex scoped variables:

```dart
// _resolveBracketCollectionVariableValue(key, updates)
// Supports: key[5] → element at index 5 (1-based)
//           : key[;10] → limited to first 10 elements with empty separator
//           : key[\n;3] → first 3 elements, separated by newline
//           : key[, ] → all elements joined by ", "
```

---

## Scoped Variables

Scoped variables provide access to persistent data tied to a specific entity.

### User variables

Syntax: `((user[ID].bc_variableName))`

```bdfd
$sendMessage[Your favorite color: $getUserVar[color]]
$sendMessage[Your score: $getUserVar[score]]
```

Internal resolution:
```
$getUserVar[score] → transpiled into placeholder → ((user[123456789].bc_score))
                     → resolved at runtime → "150"
```

### Server variables

Syntax: `((guild.bc_variableName))`

```bdfd
$sendMessage[Welcome message: $getGuildVar[welcome]]
$if[$getGuildVar[modLog] != ]
  $channelSendMessage[$getGuildVar[modLog];Moderation alert]
$endif
```

Resolution:
```
$getGuildVar[welcome] → ((guild.bc_welcome)) → "Welcome to the server!"
```

### Scope summary table

| Scope | Placeholder prefix | BDFD example | Resolution |
|-------|-------------------|-------------|-----------|
| **Global** | `((global.name))` | `$getVar[count]` | `((global.bc_count))` |
| **User** | `((user[ID].bc_name))` | `$getUserVar[xp]` | `((user[123].bc_xp))` |
| **Guild** | `((guild.bc_name))` | `$getGuildVar[prefix]` | `((guild.bc_prefix))` |
| **Channel** | `((channel.bc_name))` | `$getChannelVar[topic]` | `((channel.bc_topic))` |
| **Member** | `((member.bc_name))` | `$getMemberVar[warns]` | `((member.bc_warns))` |
| **Message** | `((message.bc_name))` | `$getMessageVar[tag]` | `((message.bc_tag))` |

---

## Parenthesis functions `function(args)`

Parenthesis functions are invoked via the syntax `functionName(arg1, arg2, ...)`. They are parsed by `_parseFunctionCall()` and executed by `_applyFunction()`.

### Text transformations

| Function | Syntax | Description |
|---------|---------|-------------|
| `lowercase` / `lower` | `((lowercase(text)))` | Converts to lowercase |
| `uppercase` / `upper` | `((uppercase(text)))` | Converts to uppercase |
| `titlecase` / `title` | `((titlecase(text)))` | Converts to Title Case |
| `trim` | `((trim(text)))` | Strips leading/trailing whitespace |
| `replace` | `((replace(text;old;new)))` | Replaces all occurrences |
| `contains` | `((contains(haystack;needle)))` | Checks presence → `"true"` or `""` |
| `length` / `charcount` | `((length(text)))` | Length (characters, array elements, or map keys) |
| `linescount` | `((linescount(text)))` | Number of lines |
| `split` | `((split(text;separator;index?)))` | Splits a string, returns an element if index provided |
| `slice` | `((slice(text;start;end?)))` | Substring or sublist |
| `crop` / `croptext` | `((crop(text;max;suffix?)))` | Truncates to max characters, appends `...` by default |
| `join` | `((join(array;separator)))` | Joins array elements |
| `at` | `((at(array;index)))` | Element at the given index of an array |
| `first` | `((first(array)))` | First element of an array |
| `last` | `((last(array)))` | Last element of an array |
| `sum` | `((sum(array)))` | Sum of numeric array elements |
| `numberseparator` | `((numberseparator(number;sep?)))` | Formats a number with thousands separator |
| `formatEach` | `((formatEach(array;template;sep)))` | Formats each element with a template |
| `embedFields` | `((embedFields(array;nameTpl;valueTpl;inline?)))` | Generates embed fields from an array |

### Random functions

| Function | Syntax | Description |
|---------|---------|-------------|
| `coin` / `random` | `((coin()))` | Random boolean → `"true"` or `""` |
| `randomchoice` | `((randomchoice(a;b;c)))` | Random choice among arguments |
| `randomint` | `((randomint(min;max)))` | Random integer in [min, max] |

### Discord media functions

| Function | Syntax | Description |
|---------|---------|-------------|
| `avatar` | `((avatar(url;format?;size?)))` | Formats a Discord avatar URL (format, size) |
| `banner` | `((banner(url;format?;size?)))` | Formats a Discord banner URL |

### URL functions

| Function | Syntax | Description |
|---------|---------|-------------|
| `url` | `((url(encode;text)))` | URL-encodes |
| `url` | `((url(decode;text)))` | URL-decodes |

---

## Bracket functions `[function;args]`

Bracket functions use the syntax `[functionName;arg1;arg2;...]` and are parsed by `_parseBracketFunctionCall()` then executed by `_applyBdfdBracketFunction()`. The argument separator is the semicolon `;`.

### Mathematical operations

| Function | Syntax | Description |
|---------|---------|-------------|
| `[calculate;expr]` | `(([calculate;2+2*3]))` | Evaluates a mathematical expression (+, -, *, /, %, ^, parentheses) |
| `[ceil;value]` | `(([ceil;3.14]))` | Rounds up to the nearest integer → `4` |
| `[floor;value]` | `(([floor;3.14]))` | Rounds down to the nearest integer → `3` |
| `[round;value]` | `(([round;3.14]))` | Rounds to the nearest integer → `3` |
| `[sqrt;value]` | `(([sqrt;16]))` | Square root → `4` |
| `[max;a;b]` | `(([max;5;10]))` | Maximum of two numbers → `10` |
| `[min;a;b]` | `(([min;5;10]))` | Minimum of two numbers → `5` |
| `[modulo;a;b]` | `(([modulo;10;3]))` | Remainder of division → `1` |
| `[multi;a;b]` | `(([multi;3;4]))` | Multiplication → `12` |
| `[divide;a;b]` | `(([divide;10;2]))` | Division → `5` |
| `[sub;a;b]` | `(([sub;10;3]))` | Subtraction → `7` |

All math functions support decimal mode via the variable `temp._enableDecimals` = `"yes"` to display decimals instead of integers.

### Sum of array or arguments

| Function | Syntax | Description |
|---------|---------|-------------|
| `[sum;1;2;3;4]` | `(([sum;1;2;3;4]))` | Sum of arguments → `10` |
| `[sum;array]` | `(([sum;myArray]))` | Sum of numeric values in an array |

### Condition and logic

| Function | Syntax | Description |
|---------|---------|-------------|
| `[checkcondition;expr]` | `(([checkcondition;((var))>=10]))` | Evaluates a condition with operators (==, !=, >, <, >=, <=, contains, startswith, endswith) → `"true"` / `"false"` |
| `[and;cond1;cond2]` | `(([and;true;((x))>5]))` | Logical AND → `"true"` / `"false"` |
| `[or;cond1;cond2]` | `(([or;false;true]))` | Logical OR → `"true"` / `"false"` |

### Text transformations (bracket)

| Function | Syntax | Description |
|---------|---------|-------------|
| `[toTitleCase;text]` | `(([toTitleCase;hello world]))` | Title Case → `"Hello World"` |
| `[toLowerCase;text]` | `(([toLowerCase;HELLO]))` | Lowercase → `"hello"` |
| `[toUpperCase;text]` | `(([toUpperCase;hello]))` | Uppercase → `"HELLO"` |
| `[url;encode;text]` | `(([url;encode;Hello World]))` | URL-encode → `"Hello+World"` |
| `[url;decode;text]` | `(([url;decode;Hello+World]))` | URL-decode → `"Hello World"` |
| `[charCount;text]` | `(([charCount;hello]))` | Character count → `5` |
| `[linesCount;text]` | `(([linesCount;l1\nl2]))` | Line count → `2` |
| `[cropText;text;max;suffix?]` | `(([cropText;long text;10]))` | Truncates text |
| `[byteCount;text]` | `(([byteCount;hello]))` | UTF-8 byte count → `5` |
| `[trimContent;text]` | `(([trimContent;  hello  ]))` | Strips whitespace → `"hello"` |
| `[trimSpace;text]` | `(([trimSpace;  hello  ]))` | Alias for trimContent |

### Utility functions (bracket)

| Function | Syntax | Description |
|---------|---------|-------------|
| `[random]` | `(([random]))` | No args = coin (boolean), with 2 args = random(min, max) |
| `[randomText;a;b;c]` | `(([randomText;apple;banana;orange]))` | Random choice among arguments |
| `[date]` | `(([date]))` | Formatted date `YYYY-MM-DD` |
| `[listVar;separator?]` | `(([listVar]))` | Lists all scoped variables (`bc_*`) |
| `[userPerms;userId?;amount?;sep?]` | `(([userPerms;123456789]))` | Permissions of a user (BDFD names) |
| `[serverNames;amount?;sep?]` | `(([serverNames;5;\n]))` | Names of the bot's servers |
| `[variablesCount;type?]` | `(([variablesCount;user]))` | Counts variables by type (global/user/guild/channel) |

---

## Dynamic variables

The resolver automatically injects temporal variables that are resolved at the exact moment of template evaluation. These variables are available in all contexts, without needing to be pre-hydrated.

### Timestamp variables

| Placeholder | Resolution | Description |
|-------------|-----------|-------------|
| `((getTimestamp))` | `"1718755200"` | Current Unix timestamp (seconds) |
| `((getTimestampMs))` | `"1718755200123"` | Current Unix timestamp (milliseconds) |

### Date/time variables

| Placeholder | Resolution | Description |
|-------------|-----------|-------------|
| `((day))` | `"19"` | Current UTC day (1-31) |
| `((month))` | `"6"` | Current UTC month (1-12) |
| `((year))` | `"2026"` | Current UTC year |
| `((hour))` | `"1"` | Current UTC hour (0-23) |
| `((minute))` | `"40"` | Current UTC minute (0-59) |
| `((second))` | `"30"` | Current UTC second (0-59) |
| `((time))` | `"01:40:30"` | Formatted time HH:MM:SS UTC |
| `((date))` | `"2026-06-19"` | Formatted date YYYY-MM-DD UTC |

### Bot uptime

| Placeholder | Resolution | Description |
|-------------|-----------|-------------|
| `((bot.uptime))` | `"02:15:30"` | Bot uptime formatted HH:MM:SS |
| `((uptime))` | `"02:15:30"` | Alias for bot.uptime |

### Always-available bot variables

The function `injectAlwaysAvailableVariables()` injects these variables into the VariablesMap before any resolution:

- `((bot.id))` — Bot ID
- `((bot.guildCount))` — Number of servers
- `((bot.uptime))` — Uptime in milliseconds (raw)
- `((bot.ping))` — Websocket ping in milliseconds

---

## Boolean and numeric fallback system

To ensure compatibility with BDFD (Bot Designer For Discord), the resolver provides automatic fallbacks for certain variables that may not be available.

### Numeric fallbacks → `"0"`

Member count variables return `"0"` if unavailable:

| Placeholder | Fallback |
|-------------|----------|
| `((membercount))` | `"0"` |
| `((allmemberscount))` | `"0"` |
| `((guild.membercount))` | `"0"` |
| `((guild.onlinemembers))` | `"0"` |
| `((guild.offlinemembers))` | `"0"` |
| `((guild.idlemembers))` | `"0"` |
| `((guild.dndmembers))` | `"0"` |
| `((guild.invisiblemembers))` | `"0"` |
| `((onlinemembers))` | `"0"` |

### Boolean fallbacks → `"false"`

Boolean properties return `"false"` if unavailable. This applies to all keys ending with these suffixes, as well as the exact keys:

| Suffix | Example | Fallback |
|---------|---------|----------|
| `.isBot` | `((author.isBot))` | `"false"` |
| `.isAdmin` | `((member.isAdmin))` | `"false"` |
| `.isBooster` | `((member.isBooster))` | `"false"` |
| `.exists` | `((channel.exists))` | `"false"` |
| `.isNsfw` / `.nsfw` | `((channel.isNsfw))` | `"false"` |
| `.isTimedOut` | `((member.isTimedOut))` | `"false"` |
| `.isBanned` | `((member.isBanned))` | `"false"` |

The exact keys `isbot`, `isadmin`, `isbooster`, `isnsfw`, `istimedout`, `isbanned`, `exists` also benefit from the same fallback.

### `.dataurl` support

The resolver automatically detects the `.dataurl` suffix and prefixes the value with the MIME type:

```
((avatar.dataurl)) → "data:image/png;base64,iVBORw0KGgo..."
```

---

## Internal architecture

### Detailed resolution flow

```
┌──────────────────────────────────────────────────────────────────┐
│             TEMPLATE RESOLVER INTERNAL ARCHITECTURE                │
│                                                                    │
│  resolveTemplatePlaceholders(input, updates)                       │
│  │                                                                 │
│  ├─ Character-by-character scan for (( ... ))                      │
│  │  ├─ Respects parenthesis nesting depth                          │
│  │  ├─ Respects quotes (single and double)                        │
│  │  └─ Detects closing ))                                          │
│  │                                                                 │
│  └─ For each placeholder → resolveTemplateExpressionToString()    │
│       │                                                             │
│       └─ resolveTemplateExpressionValue()                          │
│            │                                                        │
│            └─ _evaluateExpression(expression, updates)             │
│                 │                                                   │
│                 ├─ _splitTopLevel(expr, '|') → fallback candidates │
│                 │                                                   │
│                 └─ For each candidate → _evaluateSingleExpression  │
│                      │                                              │
│                      ├─ 1. String literal? ("abc" or 'abc')        │
│                      ├─ 2. null / true / false?                    │
│                      ├─ 3. Number? (int or double)                 │
│                      ├─ 4. Parenthesis function? func(args)        │
│                      │    └─ _parseFunctionCall → (name, inner)    │
│                      │    └─ _splitTopLevel(inner, ',') → args     │
│                      │    └─ _applyFunction(name, resolvedArgs)    │
│                      │                                              │
│                      ├─ 5. Bracket function? [func;args]           │
│                      │    └─ _parseBracketFunctionCall → (name,inner)│
│                      │    └─ _splitTopLevel(inner, ';') → args     │
│                      │    └─ _applyBdfdBracketFunction(...)        │
│                      │                                              │
│                      ├─ 6. Nested placeholder resolution           │
│                      │    └─ resolveTemplatePlaceholders() recursive│
│                      │                                              │
│                      ├─ 7. Direct lookup in updates                │
│                      │    └─ _lookupVariableValue(key, updates)    │
│                      │    └─ Case-insensitive, .dataurl fallback   │
│                      │    └─ Dynamic variables (time, date...)     │
│                      │    └─ Numeric and boolean fallbacks         │
│                      │                                              │
│                      ├─ 8. Scoped variable with JSONPath           │
│                      │    └─ _resolveComputedVariableValue(key)    │
│                      │    └─ key.$ → jsonDecode + extractJsonPath  │
│                      │                                              │
│                      ├─ 9. Collection bracket variable             │
│                      │    └─ _resolveBracketCollectionVariableValue│
│                      │    └─ collection[idx] or [sep;limit]        │
│                      │                                              │
│                      └─ 10. Literal fallback (non-alpha characters)│
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Key functions

| Function | Role |
|---------|------|
| `resolveTemplatePlaceholders(input, updates)` | Entry point: scans `((...))` and replaces |
| `_evaluateExpression(expr, updates)` | Handles `\|` fallback and evaluates candidates |
| `_evaluateSingleExpression(expr, updates)` | Resolves a single expression (10 strategies) |
| `_parseFunctionCall(expr)` | Parses `functionName(args)` → (name, inner) |
| `_parseBracketFunctionCall(expr)` | Parses `[functionName;args]` → (name, inner) |
| `_splitTopLevel(input, delimiter)` | Smart split respecting parentheses, brackets, strings |
| `_applyFunction(name, args, updates)` | Executes parenthesis functions |
| `_applyBdfdBracketFunction(name, rawArgs, resolvedArgs, updates)` | Executes bracket functions |
| `_lookupVariableValue(key, updates)` | Case-insensitive lookup with fallbacks |
| `_resolveComputedVariableValue(key, updates)` | Resolves `key.$.jsonpath` |
| `_resolveBracketCollectionVariableValue(key, updates)` | Resolves `collection[index]` or `collection[sep;limit]` |
| `extractJsonPathValue(data, path)` | JSON navigation with `$.path` and `[0]` |
| `_evaluateStringCondition(expr, updates)` | Evaluates conditions (==, !=, >, <, contains...) |
| `_isWrappedStringLiteral(input)` | Detects quoted strings |
| `_unescapeStringLiteral(body)` | Unescapes `\n`, `\r`, `\t`, `\\`, `\"`, `\'` |
| `_toTitleCase(input)` | Converts a string to Title Case |
| `_countLines(input)` | Counts lines |
| `_formatNumberWithSeparator(value, sep)` | Formats numbers with thousands separator |
| `injectAlwaysAvailableVariables(vars, ...)` | Injects bot.id, bot.uptime, getTimestamp, day, month... |

### Output format

The function `_stringifyResolvedValue()` unifies the output format:

| Input type | Output format |
|--------------|-----------------|
| `null` | `""` (empty string) |
| `String` | The string as-is |
| `num` (int/double) | `.toString()` |
| `bool` | `.toString()` (`"true"` / `"false"`) |
| `List` / `Map` / other | `jsonEncode(value)` |

---

## Complete resolution flow

### Step-by-step example

Consider the following BDFD code:

```bdfd
$sendMessage[
  Welcome ((member.nickname|author.name)) !
  Your ID: ((author.id))
  Message: ((message.content))
  Mentions: ((length(message.mentions)))
]
```

**Step 1: BDFD Compilation → AST**

The parser produces an AST representing the `$sendMessage` call with a text block containing variable references.

**Step 2: AST Transpilation → Action**

The transpiler detects that `member.nickname`, `author.name`, `author.id`, `message.content`, and `message.mentions` are runtime variables. It emits an action with the payload:

```json
{
  "type": "sendMessage",
  "payload": {
    "channelId": "((channel.id))",
    "content": "Welcome ((member.nickname|author.name)) !\nYour ID: ((author.id))\nMessage: ((message.content))\nMentions: ((length(message.mentions)))"
  }
}
```

**Step 3: Before execution — resolveTemplatePlaceholders()**

The `WorkflowExecutor` calls `resolveTemplatePlaceholders()` on the payload. The VariablesMap is hydrated with context data:

```
VariablesMap:
  member.nickname = "Jean"
  author.name = "JeanDupont"
  author.id = "123456789"
  message.content = "!hello @Bot"
  message.mentions = ["111222333"]
  channel.id = "987654321"
```

Sequential resolution:

```
((member.nickname|author.name))
  → member.nickname = "Jean" (found, no need for fallback)
  → "Jean"

((author.id))
  → "123456789"

((message.content))
  → "!hello @Bot"

((length(message.mentions)))
  → message.mentions = ["111222333"]
  → length(["111222333"]) = 1
  → "1"
```

**Step 4: Resolved payload**

```json
{
  "channelId": "987654321",
  "content": "Welcome Jean !\nYour ID: 123456789\nMessage: !hello @Bot\nMentions: 1"
}
```

**Step 5: Execution**

The `MessagingExecutor` sends the message with the resolved content to channel `987654321`.

---

## The complete resolution chain

```
┌──────────────────────────────────────────────────────────────────┐
│               PLACEHOLDER RESOLUTION CHAIN                         │
│                                                                    │
│  BDFD Source                                                       │
│  $sendMessage[Hello ((username))]                                  │
│       │                                                            │
│       ▼                                                            │
│  ┌──────────────────┐                                              │
│  │ Transpiler        │  Emits placeholders in payloads            │
│  │ (compile-time)    │  for all unresolvable values               │
│  └────────┬─────────┘                                              │
│           │                                                        │
│           ▼                                                        │
│  Action { payload: { content: "Hello ((username))" } }             │
│           │                                                        │
│           ▼                                                        │
│  ┌──────────────────┐                                              │
│  │ WorkflowExecutor  │  Before each Action:                        │
│  │ executeActions()  │  → hydrateRuntimeVariables()                │
│  └────────┬─────────┘  → resolveTemplatePlaceholders()             │
│           │                                                        │
│           ▼                                                        │
│  ┌──────────────────┐                                              │
│  │ Template Resolver │  Scans text for ((...))                     │
│  │                   │  → Parses the expression                    │
│  │                   │  → Looks up in VariablesMap                 │
│  │                   │  → Applies operators (fallback |)           │
│  │                   │  → Resolves indexing [n]                    │
│  │                   │  → Evaluates parenthesis functions func()   │
│  │                   │  → Evaluates bracket functions [func;args]  │
│  │                   │  → Resolves dynamic variables (time,date)   │
│  │                   │  → Applies boolean/numeric fallbacks        │
│  └────────┬─────────┘                                              │
│           │                                                        │
│           ▼                                                        │
│  Resolved payload: { content: "Hello Jean" }                      │
│           │                                                        │
│           ▼                                                        │
│  ┌──────────────────┐                                              │
│  │ ActionHandler     │  Dispatches the action to the appropriate   │
│  │ handleAction()    │  executor with the resolved payload         │
│  └──────────────────┘                                              │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Source files

| File | Role |
|---------|------|
| `packages/shared/lib/utils/template_resolver.dart` | Function `resolveTemplatePlaceholders()` (1809 lines): scans and replaces `((...))`, bracket functions, parenthesis functions, dynamic variables, fallbacks |
| `packages/shared/lib/utils/runtime_variables.dart` | Construction of the `VariablesMap`: hydration from Discord context + DB |
| `packages/shared/lib/utils/variable_catalog.dart` | Definition of all available variables (`WorkflowVariableDefinition`) |
| `packages/shared/lib/utils/bdfd_ast_transpiler.dart` | Transpiler that emits placeholders in payloads |
| `packages/shared/lib/utils/workflow_executor.dart` | Orchestrates hydration and calls `resolveTemplatePlaceholders()` before execution |
| `packages/shared/lib/utils/math_parser.dart` | Mathematical expression parser used by `[calculate;...]` |
| `packages/shared/lib/actions/executors/operations_expander.dart` | Placeholder and complex operation expansion in payloads |
