---
layout: doc
title: $getMessageVar[]
translation_key: docs
category: "Variables"
function_name: getMessageVar
syntax: $getMessageVar[name] or $getMessageVar[name;Message ID]
description: Reads the value of a message-scoped variable. Returns the stored value for the current message, or a specific message when a Message ID is provided.
---
$getMessageVar reads a variable scoped to a specific Discord message. The variable value is tied directly to a single message. When called with only a `name`, it reads from the message of the current context (`((message.id))`). When a Message ID is provided, the variable is read from the specified message; an empty Message ID counts as omitted. If there is no current message ID, the error `Missing context for message variables.` is raised. The function takes 1 or 2 arguments.

This is particularly useful for message-tracking features, reaction roles, polls, or any scenario where you need to attach persistent metadata to a specific message.

Reading: the value stored for the selected context is returned. If nothing is stored there (or the stored value is empty, `null` or `empty/null`), the default value declared for this variable in the Bot Creator Variables catalogue is returned and stored when it is not empty; otherwise an empty string is returned. The name is trimmed and a leading `bc_` is ignored. Stored values are case-sensitive (`Score` and `score` are two different values), while declared defaults are matched case-insensitively.

> **JavaScript (BDJS) equivalent:** `await db.message.get('name')` — see [db.message](/docs/javascript/db-message/).

## Examples

### Message Reaction Counter

```bdfd
$title[Reaction Count]
$description[Upvotes on message: **$getMessageVar[upvotes;$messageID]** 👍]
$color[#5865F2]
```
