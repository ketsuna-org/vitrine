---
layout: doc
title: $serverOwner[]
translation_key: docs
category: "Entity Info"
function_name: serverOwner
syntax: $serverOwner
description: Returns the identifier (ID) of the owner of the Discord server.
---

# $serverOwner[] — Owner of the Server

`$serverOwner[]` returns the Discord identifier (ID) of the owner of the server. This ID can be used to mention the owner, check permissions, or restrict commands.

## Syntax

```
$serverOwner
```

## Parameters

None.

## Return Value

- **Type**: `string`
- The ID (Snowflake) of the owner of the server.

## Usage

### Mention the owner

```bdfd
$sendMessage[👑 Owner of the server: <@$serverOwner>]
```

### Restrict a command to the owner

```bdfd
$if[$authorID!=$serverOwner]
$sendMessage[⛔ Only the server owner can use this command.]
$stop
$endif
$sendMessage[Owner command executed.]
```

### Informative embed

```bdfd
$title[Information on $serverName]
$description[Server managed by <@$serverOwner>]
$addField[Server ID;$serverID;yes]
$addField[Owner;$serverOwner;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Notification to the owner

```bdfd
$sendMessage[<@$serverOwner>, a user is requesting your attention.]
```

## Notes

- The owner is the user who created the server or to whom the ownership was transferred.
- The ID of the owner remains unchanged as long as the ownership is not transferred.
- Use `$username[$serverOwner]` to get the name of the owner without mentioning them.
- To check if the current user is the owner, you can also use `$isOwner[]`.
