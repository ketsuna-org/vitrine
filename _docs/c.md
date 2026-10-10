---
layout: doc
title: $c
translation_key: docs
category: "Math & Text"
function_name: c
syntax: $c[expression]
description: Comment: the text between the brackets is never evaluated and the function returns an empty string. It is not an alias of $calculate.
---
# $c — Comment

`$c[text]` is a **comment**. The text between the brackets is ignored: functions written inside are not run, and `$c[]` returns an empty string. It is **not** a shorter name for `$calculate[]`: `$c[2+3]` returns nothing, not `5`.

## Syntax

```
$c[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Required, exactly one argument. Never evaluated. A `;` inside the text would split it into several arguments, which is refused ("Invalid argument count for $c: 2"), so do not use `;` in a comment. `$c` without brackets is refused as well. |

## Return Value

An empty string.

## Behavior

- Nothing inside the brackets is executed: `$c[$sendMessage[x]]` sends nothing.
- Balanced nested brackets are allowed in the text (`$c[note [nested] text]` returns an empty string).
- It can be written anywhere a function can, including inside an argument of another function: `$replaceText[hello;l;$c[ignored]L]` returns `heLlo`.

## Examples

### Documenting a command

```bdfd
$c[This command greets the user]
$sendMessage[Hello!]
```

### Disabling a call temporarily

```bdfd
$c[$sendMessage[This message is never sent]]
$sendMessage[Only this one is sent]
```

## Notes

- To compute a value, use `$calculate[]`.
