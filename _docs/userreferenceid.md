---
layout: doc
title: $userReferenceID[]
translation_key: docs
category: "Entity Info"
function_name: userReferenceID
syntax: $userReferenceID[channelID;messageID]
description: "Returns the id of the user this message replies to"
---
# $userReferenceID — Returns the id of the user this message replies to

## Syntax

```
$userReferenceID[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get the message from
- **messageID** *(id, required)* — The message to get its reference user

## Return Value

- User.

## Usage

```
$userReferenceID[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$userReferenceID[30;1000]]
```
