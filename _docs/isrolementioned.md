---
layout: doc
title: $isRoleMentioned[]
translation_key: docs
category: "Entity Info"
function_name: isRoleMentioned
syntax: $isRoleMentioned[channelID;messageID;roleID]
description: "Returns whether a role was mentioned in this message"
---
# $isRoleMentioned — Returns whether a role was mentioned in this message

## Syntax

```
$isRoleMentioned[channelID;messageID;roleID]
```

## Parameters

- **channelID** *(id, required)* — Channel to pull the message from
- **messageID** *(id, required)* — The message to get mentions from
- **roleID** *(id, required)* — The entity to check for mentions

## Return Value

- Boolean.

## Usage

```
$isRoleMentioned[channelID;messageID;roleID] → result
```

## Example

```bdfd
$sendMessage[$isRoleMentioned[30;1000;70]]
```
