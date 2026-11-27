---
layout: doc
title: $addApplicationEmoji[]
translation_key: docs
category: "Moderation"
function_name: addApplicationEmoji
syntax: $addApplicationEmoji[name;url;(returnemojiID)]
description: "Adds an application emoji, returns the emoji id"
---
# $addApplicationEmoji — Adds an application emoji, returns the emoji id

## Syntax

```
$addApplicationEmoji[name;url;(returnemojiID)]
```

## Parameters

- **name** *(text, required)* — The name for the emoji
- **url** *(text, required)* — The emoji icon to use
- **returnemojiID** *(id, optional)* — Whether to return the emoji id

## Return Value

- ApplicationEmoji.

## Usage

```
$addApplicationEmoji[name;url;(returnemojiID)] → result
```

## Example

```text
$addApplicationEmoji[logo2;$message[value]]
```

The value passed (`$message[value]`) must be a data URI such as `data:image/png;base64,...`: the function does not download web addresses.
