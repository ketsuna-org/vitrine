---
layout: doc
title: $memberExists
translation_key: docs
category: "Entity Info"
function_name: memberExists
syntax: $memberExists[User ID;(Guild ID)]
description: Returns true when the user is a member of the current server (or of the given server), false otherwise.
---

# $memberExists

`$memberExists` tells whether a user is a **member of a server**. Unlike `$findUser`, it never falls back to the command author, and unlike `$userExists` it checks membership of the server, not the existence of the account.

## Syntax

```
$memberExists[User ID;(Guild ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `User ID` | Required. The ID of the user (positive integer, otherwise the error "Invalid user ID." is raised). |
| `Guild ID` | Optional. The server to check. If omitted or empty, the current server is used. An invalid ID raises "Invalid guild ID.". |

## Return value

- `true` if the user is a member of the server, `false` otherwise.

## Examples

### Check a given ID

```bdfd
$if[$memberExists[$message[1]]==true]
  <@$message[1]> is in this server.
$else
  This user is not a member of the server.
$endif
```

### Check another server

```bdfd
$memberExists[$authorID;123456789012345678]
```
