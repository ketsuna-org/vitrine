---
layout: doc
title: $newMessage[]
translation_key: docs
category: "Events"
function_name: newMessage
syntax: $newMessage[property;(separator)]
description: "State of the message after an edit (messageUpdate). Properties: id, content, type, channelID, timestamp, editTimestamp, pinned, system, attachments."
---
# $newMessage — State of the message after an edit (messageUpdate). Properties: id, content, type, channelID, timestamp, editTimestamp, pinned, system, attachments.

## Syntax

```
$newMessage[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$newMessage[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$newMessage[property;(separator)]]
```
