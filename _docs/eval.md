---
layout: doc
title: $eval[]
translation_key: docs
category: "Control Flow"
function_name: eval
syntax: $eval[bdfdCode]
description: Dynamically parses and executes a string of BDFD code at runtime. The code is treated as a sub-script and executed inline.
---
$eval is a metaprogramming function that enables **dynamic code execution** in BDFD. It takes a string of BDFD code and runs it as if it were written directly in the command. This opens up powerful patterns like template rendering, code generation, and late-binding of function calls.

## How It Works

1. `$eval[bdfdCode]` is encountered during execution.
2. The `bdfdCode` string is parsed as BDFD code.
3. The parsed code is executed as a sub-script via `BotCreatorActionType.runBdfdScript`.
4. Any output produced by the sub-script is returned by `$eval`.
5. Execution continues in the parent script on the next line.

## Variable Resolution

Variables inside the `$eval` string are resolved at **eval time**, not at definition time. This is the key difference between eval and direct execution:

```
$varSet[name;Alice]
$eval[$sendMessage[Hello $var[name]!]]
```

In this example, `$var[name]` is resolved when `$eval` executes the code, so it correctly outputs `Hello Alice!`.

## Powerful Patterns

### Dynamic Command Dispatch

Build and execute commands based on user input:

```
$varSet[command;$sendMessage[$message]]
$eval[$var[command]]
```

### Template Rendering

Define reusable message templates with placeholders:

```
$varSet[template;$title[$var[title]]
$description[$var[body]]
$color[$var[color]]]

$varSet[title;Welcome]
$varSet[body;Welcome to the server!]
$varSet[color;#00FF00]
$eval[$var[template]]
```

### Late-Binding Logic

Defer decisions about what code to run until runtime:

```
$varSet[action;$if[$var[condition]==true
$sendMessage[Condition true]
$else
$sendMessage[Condition false]
$endif]
$eval[$var[action]]
```

## Important Warnings

- **Security**: `$eval` executes arbitrary code. Never pass unsanitized user input directly to `$eval` — a malicious user could inject destructive BDFD code.
- **Performance**: each `$eval` call triggers a parse-and-execute cycle. Avoid using `$eval` in tight loops or high-frequency commands.
- **Error handling**: errors inside `$eval` are surfaced like any other runtime error. Use `$suppressErrors` if you expect potential failures.
- **Nesting**: `$eval` can contain other `$eval` calls, but deep nesting may cause performance issues and is generally a sign of over-engineering.

## When to Use

- **Template systems**: render parameterized messages and embeds.
- **Plugin-like architectures**: store code snippets in variables or databases and execute them dynamically.
- **Code generation**: build BDFD code programmatically based on complex runtime conditions.
- **Late binding**: resolve function names or logic paths at the last possible moment.

## When Not to Use

- **Simple conditionals**: use `$if`/`$else` — it's faster and more readable.
- **Reusable subroutines**: use `$callWorkflow` — it's cleaner, safer, and easier to debug.
- **Direct execution**: if the code is static and known at script-writing time, write it directly. `$eval` is for truly dynamic scenarios.

## Comparison with $callWorkflow

| Feature | $eval | $callWorkflow |
|---------|-------|---------------|
| Code source | String (dynamic) | Named workflow (static) |
| Arguments | Embedded in code string | Passed as parameters |
| Performance | Slower (parses at runtime) | Faster (pre-parsed) |
| Safety | Risk of injection | Safe (static reference) |
| Flexibility | Maximum (any code) | Limited to predefined workflows |
