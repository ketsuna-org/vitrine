---
layout: doc
title: $oldMessage[]
translation_key: docs
category: "Events"
function_name: oldMessage
syntax: $oldMessage[property;(separator)]
description: "Previous state of the message before an edit (messageUpdate). Properties: id, content, type, channelID, timestamp, editTimestamp, pinned, system, attachments."
---
# $oldMessage — Previous state of the message before an edit (messageUpdate). Properties: id, content, type, channelID, timestamp, editTimestamp, pinned, system, attachments.

## Syntax

```
$oldMessage[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$oldMessage[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$oldMessage[property;(separator)]]
```
