---
layout: doc
title: $modifyChannel
translation_key: docs
category: "Moderation"
function_name: modifyChannel
syntax: $modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
description: "Modifies thes propertys of un canal existing : nom, sujet, catégorie, status NSFW and slowmode."
---

# $modifyChannel

The function `$modifyChannel[]` allows **modifier les propertys of un canal** existing.

## Syntax

```
$modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | ID of the canal to modifier. |
| `name` | New nom of the canal. |
| `topic` | Optional - New sujet (max 1024 becauseactères). |
| `categoryID` | Optional - ID of the new catégorie, `0` pour noe. |
| `nsfw` | Optional - `true`/`false` pour NSFW. |
| `slowmode` | Optional - Delay en seconds (0-21600). |

## Return Value

This function ne retourne pas of value.

## Behavior

- The bot doit avoir la permission `MANAGE_CHANNELS`.
- The parameters optionals can be laissés vides pour conserver the value currentle.
- L'ordre parameters est important — utilisez `;` vides pour sauter parameters.

## Examples

### Renommer un canal

```bdfd
$modifyChannel[$channelID;archives-$date]
$sendMessage[Canal renommé.]
```

### Changer le slowmode

```bdfd
$modifyChannel[$channelID;$channelName;;;false;5]
$sendMessage[Slowmode défini to 5 seconds.]
```

### Déplacer vers une catégorie

```bdfd
$modifyChannel[$channelID;$channelName;;123456789]
$sendMessage[Canal déplacé.]
```

### Modification complete

```bdfd
$modifyChannel[$channelID;règlement;Règles of the server - mis to day $date;123456789;false;0]
$sendMessage[Canal mis to day with success.]
```

## Notes

- Utilisez parameters vides (`;`) pour sauter les options que vous ne voulez pas modifier.
- The name of the canal suit les mêmes règles que `$createChannel[]`.
- Pour modifier les permissions, utilisez `$editChannelPerms[]` or `$modifyChannelPerms[]`.
