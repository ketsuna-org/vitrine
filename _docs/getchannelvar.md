---
layout: doc
title: $getChannelVar[]
translation_key: docs
category: "Variables"
function_name: getChannelVar
syntax: $getChannelVar[name] or $getChannelVar[name;Channel ID]
description: Reads the value of a channel-scoped variable. Returns the stored value for the current channel, or a specific channel when a Channel ID is provided.
---
$getChannelVar reads a variable scoped to a Discord channel. The variable value is specific to a channel. When called with only a `name`, it reads from the channel where the command is being executed (`((channel.id))`). When a Channel ID is provided, the variable is read from the specified channel; an empty Channel ID counts as omitted. If there is no current channel, the error `Missing context for channel variables.` is raised. The function takes 1 or 2 arguments.

Reading: the value stored for the selected context is returned. If nothing is stored there (or the stored value is empty, `null` or `empty/null`), the default value declared for this variable in the Bot Creator Variables catalogue is returned and stored when it is not empty; otherwise an empty string is returned. The name is trimmed and a leading `bc_` is ignored. Stored values are case-sensitive (`Score` and `score` are two different values), while declared defaults are matched case-insensitively.

> **JavaScript (BDJS) equivalent:** `await db.channel.get('name')` — see [db.channel](/docs/javascript/db-channel/).

## Examples

### Channel Slowmode Config

```bdfd
$title[Channel Settings]
$description[Custom slowmode: `$getChannelVar[customSlowmode;$channelID]` seconds]
$color[#5865F2]
```
