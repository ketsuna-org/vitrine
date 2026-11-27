---
layout: doc
title: $fetchApplicationEmojis[]
translation_key: docs
category: "Moderation"
function_name: fetchApplicationEmojis
syntax: $fetchApplicationEmojis
description: "Caches all application emojis of the client."
---
# $fetchApplicationEmojis — Caches all application emojis of the client.

## Syntax

```
$fetchApplicationEmojis
```

## Parameters

None.

## Return Value

- string.

## Usage

```
$fetchApplicationEmojis → result
```

## Example

```bdfd
$fetchApplicationEmojis
$sendMessage[Done]
```
