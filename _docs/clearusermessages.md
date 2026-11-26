---
layout: doc
title: $clearUserMessages[]
translation_key: docs
category: "Moderation"
function_name: clearUserMessages
syntax: $clearUserMessages[channelID;userID;amount;(deletePinned)]
description: "Deletes recent messages of one user in a channel (1000 at most) and returns how many were removed."
---
# $clearUserMessages — Deletes recent messages of one user in a channel (1000 at most) and returns how many were removed.

## Syntax

```
$clearUserMessages[channelID;userID;amount;(deletePinned)]
```

## Parameters

- **channelID** *(String, required)* — Channel ID
- **userID** *(String, required)* — User ID
- **amount** *(Number, required)* — Amount (1 to 1000)
- **deletePinned** *(Boolean, optional)* — Delete pinned messages

## Return Value

- Number.

## Usage

```
$clearUserMessages[channelID;userID;amount;deletePinned] → result
```

## Example

```bdfd
$sendMessage[$clearUserMessages[channelID;userID;amount;deletePinned]]
```
