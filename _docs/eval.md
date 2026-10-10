---
layout: doc
title: $eval[]
translation_key: docs
category: "Control Flow"
function_name: eval
syntax: $eval[bdfdCode]
description: Dynamically parses and executes a string of BDFD code at runtime. The code is treated as a sub-script and executed inline.
---
`$eval` takes text, parses it as BDFD code and runs it in the current script.

## Syntax

```text
$eval[bdfdCode]
```

Exactly one argument; two arguments are rejected (`Invalid argument count for $eval: 2.`). An empty argument is accepted and produces nothing.

## How It Works

1. The argument is evaluated like any other argument: functions written inside it run **first**, and their results are put into the text.
2. That resulting text is then parsed as BDFD code. `$eval` is the only function that turns text back into code; a `$` that comes from a variable or from `$replaceText` is otherwise just text.
3. The parsed code runs in the same invocation as the caller (same context and variables).
4. When the script is producing a response (the normal case), the text produced by the evaluated code is written into the response where `$eval` stands, and `$eval` itself returns an empty string. Text written before `$eval` is flushed before the evaluated code runs.
5. A function name that does not exist in the evaluated text is not an error: it stays as literal text.

## Example

```bdfd
$onlyForIDs[123456789012345678;Owner only!]
$title[Code Evaluation]
$description[Result:
$eval[$message]]
$color[#5865F2]
```

Building the code with `$replaceText` (here `@@` stands for the dollar sign) shows that the text is parsed only by `$eval`:

```bdfd
$eval[$replaceText[@@toUpperCase[abc];@@;$]]
```

This sends `ABC`; without `$eval`, the same `$replaceText` would send the literal text `$toUpperCase[abc]`.

## Warnings

- **Security**: `$eval` runs any code it is given. Never pass unsanitized user input to it: the evaluated text is run as code.
