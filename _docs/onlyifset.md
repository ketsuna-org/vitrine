---
layout: doc
title: $onlyIfSet[]
translation_key: docs
category: "Variables"
function_name: onlyIfSet
syntax: $onlyIfSet[variable;message;(scope);(target);(guildID)]
description: "Stops the script with a message while a setting is empty. A setting (log channel, role…) is empty until the administrator fills it."
---
# $onlyIfSet — Stops the script with a message while a setting is empty

## Syntax

```
$onlyIfSet[variable;message;(scope);(target);(guildID)]
```

## Parameters

- **variable** *(text, required)* — The setting.
- **message** *(text, required)* — Sent when the setting is empty, then the script stops.
- **scope** *(text, optional)* — Same as `$increment`. Default: `server`.
- **target** *(ID, optional)* — Same as `$increment`.
- **guildID** *(ID, optional)* — Same as `$increment`.

## Return Value

- empty.

## Usage

```
$onlyIfSet[logChannel;An admin must set the log channel first.]
```

## Example

```bdfd
$sendMessage[$onlyIfSet[logChannel;An admin must set the log channel first.]]
```
