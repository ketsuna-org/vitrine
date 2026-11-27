---
layout: doc
title: $deleteComponentFrom[]
translation_key: docs
category: "Moderation"
function_name: deleteComponentFrom
syntax: $deleteComponentFrom[channelID;messageID;customID]
description: "Deletes a message component with given custom id from a message"
---
# $deleteComponentFrom — Deletes a message component with given custom id from a message

## Syntax

```
$deleteComponentFrom[channelID;messageID;customID]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to remove component from
- **customID** *(id, required)* — The component's custom id to delete

## Return Value

- Boolean.

## Usage

```
$deleteComponentFrom[channelID;messageID;customID] → result
```

## Example

```bdfd
$sendMessage[$deleteComponentFrom[30;1000;no]]
```
