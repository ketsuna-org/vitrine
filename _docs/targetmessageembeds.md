---
layout: doc
title: $targetMessageEmbeds[]
translation_key: docs
category: "Interactions"
function_name: targetMessageEmbeds
syntax: $targetMessageEmbeds
description: "Embeds (JSON) of the message a message context menu command was run on."
---
# $targetMessageEmbeds — Embeds (JSON) of the message a message context menu command was run on.

## Syntax

```
$targetMessageEmbeds
```

## Parameters

None.

## Return Value

- Json.

## Usage

```
$targetMessageEmbeds → result
```

## Example

```bdfd
$sendMessage[$targetMessageEmbeds]
```
