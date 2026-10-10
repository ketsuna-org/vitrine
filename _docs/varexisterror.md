---
layout: doc
title: $varExistError[]
translation_key: docs
category: "Variables"
function_name: varExistError
syntax: $varExistError[name;message]
description: Stops the script and displays the message if the variable name is not declared.
---

$varExistError checks that a variable is declared. If it is **not**, the script is stopped and the given message is displayed in place of the output; if it exists, nothing happens and an empty string is returned.

## Syntax

```
$varExistError[name;message]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | **Required.** The name of the variable to check. An empty name raises the error `A variable name is required.` |
| `message` | **Required.** The message displayed when the variable does not exist. It is only evaluated in that case. |

Exactly two arguments are required; any other count is refused ("Invalid argument count").

## Return Value

An empty string.

## Behavior

- Uses the same existence check as `$varExists`.
- If the variable does not exist, the script stops and the output is replaced by `message`. Webhook messages staged but not yet sent are discarded.
- If the variable exists, execution continues normally.

## Examples

### Guarding Against Missing Variable Definition

```bdfd
$varExistError[coins;❌ Variable `coins` has not been registered in your bot settings!]
$title[Variable Verified]
$description[Variable `coins` exists. Current value: **$getUserVar[coins]**]
$color[#57F287]
```
