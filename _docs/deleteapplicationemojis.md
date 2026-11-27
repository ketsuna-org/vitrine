---
layout: doc
title: $deleteApplicationEmojis[]
translation_key: docs
category: "Moderation"
function_name: deleteApplicationEmojis
syntax: $deleteApplicationEmojis[emojis...]
description: "Deletes application emojis, returns the count of emojis deleted"
---
# $deleteApplicationEmojis — Deletes application emojis, returns the count of emojis deleted

## Syntax

```
$deleteApplicationEmojis[emojis...]
```

## Parameters

- **emojis...** *(text, required)* — The emojis to delete

## Return Value

- Number.

## Usage

```
$deleteApplicationEmojis[emojis...] → result
```

## Example

```bdfd
$sendMessage[$deleteApplicationEmojis[800]]
```
