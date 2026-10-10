---
layout: doc
title: $awaitFunc[]
translation_key: docs
category: "Control Flow"
function_name: awaitFunc
syntax: $awaitFunc[functionName;(userID);(channelID)]
description: Stores a pending "await" record for a user and channel. It does not suspend the script and nothing in the engine reads the record afterwards.
---

`$awaitFunc` registers a pending "await" record for a user. It does **not** suspend the script.

## Syntax

```text
$awaitFunc[functionName;(userID);(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `functionName` | Required. Name of the awaited function. It is trimmed, converted to lower case, and every character other than `a-z`, `0-9` and `_` becomes `_` (so `Follow Up!` is stored as `follow_up_`). An empty name raises `The awaited function name is required.` |
| `userID` | Optional. The user to wait for. Defaults to the author of the command (`author.id`). |
| `channelID` | Optional. The channel to wait in. Defaults to the current channel (`channel.id`). |

Both IDs must be numbers, otherwise `Invalid user or channel ID.` The function takes 1 to 3 arguments and returns an empty string.

## What it does

- It writes a record in the bot's storage, in the **user-scoped variables** of `userID`, under the key `await_<functionName>`. The record contains `name`, `userId`, `channelId` and `createdAt` (UTC date and time).
- The script **keeps running**: the code after `$awaitFunc` runs immediately, there is no pause and no timeout.
- Reading the code of the engine and of the host packages, **nothing reads these `await_*` records afterwards**: the engine does not resume a script, call a function or answer a button click or a message because of them.

## Example

```bdfd
Please type confirm in this channel.
$awaitFunc[confirm_handler;$authorID;$channelID]
```

This stores the record `await_confirm_handler` for the author of the command in the current channel, then the script ends and sends its text. Nothing is waited for.

## Notes

- To pause a script for a fixed time, use `$wait`.
- To react to a button or a menu, handle the interaction in the script run for it (see `$customID`).
