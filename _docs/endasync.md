---
layout: doc
title: $endAsync
translation_key: docs
category: "Control Flow"
function_name: endAsync
syntax: $endAsync
description: Closes a block opened by $async[name].
---

# $endAsync

`$endAsync` closes a block opened by [`$async[name]`](/docs/async/). It takes no argument.

## Syntax

```text
$endAsync
```

## Behavior

- Every `$async` needs exactly one `$endAsync`. A missing one raises `Missing $endasync.`, a stray one `Unexpected $endasync.`.
- The statements after `$endAsync` start immediately, while the body of the block runs at the same time. See [`$async`](/docs/async/) for the full semantics and limits (25 blocks per execution, text only available through [`$await`](/docs/await/)).

## Example

```bdfd
$async[work]
  $var[result;done]
  $var[result]
$endAsync
Started.
$await[work]
```
