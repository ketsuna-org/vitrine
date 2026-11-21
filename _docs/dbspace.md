---
layout: doc
title: $dbSpace
translation_key: docs
category: "Database"
function_name: dbSpace
syntax: $dbSpace[guild|user|bot]
description: Chooses where `$db*` functions store data for the rest of the run: the server (default), the user or the bot. Not in BDFD.
---

# $dbSpace

`$dbSpace` picks the **space** used by every `$db*` function that comes after it in the same run. Spaces never mix: the same collection and id in two spaces are two different documents.

## Syntax

```
$dbSpace[guild|user|bot]
```

## Parameters

| Parameter | Description |
|---|---|
| `guild|user|bot` | `guild`: the current server (default, the user's own space in a direct message). `user`: data that follows the person who runs the command, across servers. `bot`: one space shared by the whole bot. |

## Return value

- Nothing.

## Examples

### Remember a language per person

```bdfd
$dbSpace[user]
$dbSet[prefs;$authorID;{"lang":"fr"}]
```

### A setting for the whole bot

```bdfd
$dbSpace[bot]
$dbGet[settings;maintenance;on;false]
```
