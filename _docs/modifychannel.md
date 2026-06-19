---
layout: doc
title: $modifyChannel
translation_key: docs
category: "Moderation"
function_name: modifyChannel
syntax: $modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
description: "Modifies thes propertys d'un canal existing : nom, sujet, catégorie, status NSFW and slowmode."
---

# $modifyChannel

The function `$modifyChannel[]` allows **modifier les propertys d'un canal** existing.

## Syntax

```
$modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | ID of the canal à modifier. |
| `name` | New nom du canal. |
| `topic` | Optional - New sujet (max 1024 becauseactères). |
| `categoryID` | Optional - ID of the new catégorie, `0` pour noe. |
| `nsfw` | Optional - `true`/`false` pour NSFW. |
| `slowmode` | Optional - Delay en seconds (0-21600). |

## Return Value

This function ne retourne pas de value.

## Behavior

- The bot doit avoir la permission `MANAGE_CHANNELS`.
- The parameters optionals can be laissés vides pour conserver the value currentle.
- L'ordre des parameters est important — utilisez `;` vides pour sauter des parameters.

## Examples

### Renommer un canal

```bdfd
$modifyChannel[$channelID;archives-$date]
$sendMessage[Canal renommé.]
```

### Changer le slowmode

```bdfd
$modifyChannel[$channelID;$channelName;;;false;5]
$sendMessage[Slowmode défini à 5 seconds.]
```

### Déplacer vers une catégorie

```bdfd
$modifyChannel[$channelID;$channelName;;123456789]
$sendMessage[Canal déplacé.]
```

### Modification complete

```bdfd
$modifyChannel[$channelID;règlement;Règles of the server - mis à day $date;123456789;false;0]
$sendMessage[Canal mis à day avec success.]
```

## Notes

- Utilisez des parameters vides (`;`) pour sauter les options que vous ne voulez pas modifier.
- The name du canal suit les mêmes règles que `$createChannel[]`.
- Pour modifier les permissions, utilisez `$editChannelPerms[]` or `$modifyChannelPerms[]`.
