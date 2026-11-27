---
layout: doc
title: $isUserMentioned[]
translation_key: docs
category: "Entity Info"
function_name: isUserMentioned
syntax: $isUserMentioned[channelID;messageID;userID]
description: "Returns whether a user was mentioned in this message"
---
# $isUserMentioned — Returns whether a user was mentioned in this message

## Syntax

```
$isUserMentioned[channelID;messageID;userID]
```

## Parameters

- **channelID** *(id, required)* — Channel to pull the message from
- **messageID** *(id, required)* — The message to get mentions from
- **userID** *(id, required)* — The entity to check for mentions

## Return Value

- Boolean.

## Usage

```
$isUserMentioned[channelID;messageID;userID] → result
```

## Example

```bdfd
$sendMessage[$isUserMentioned[30;1000;20]]
```
