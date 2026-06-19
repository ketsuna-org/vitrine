---
layout: doc
title: $serverChannelExists
translation_key: docs
category: "Server & Channels"
function_name: serverChannelExists
syntax: $serverChannelExists[name;guildID]
description: Checks if un canal portant un nom donné existe on a server (guild). Returns true/false.
---
# $serverChannelExists

The function `$serverChannelExists[]` vérifie if a **canal existe on a server** donné (par son nom).

## Syntax

```
$serverChannelExists[name;guildID]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the canal to rechercher. Sensible to la casse. Wildbecauseds (*) supportés. |
| `guildID` | ID of the server. Si omitted, utilise the server courant. |

## Return Value

- **Type** : Boolean (string)
- `"true"` if the canal existe.
- `"false"` otherwise.

## Examples

### Vérification simple

```bdfd
$if[$serverChannelExists[logs]==true]
  $sendMessage[Le canal #logs existe déjà.]
$else
  $createChannel[logs]
  $sendMessage[Canal #logs created.]
$endif
```

### Vérification with wildbecaused

```bdfd
$if[$serverChannelExists[ticket-*]==true]
  $sendMessage[Des canaux of ticket existent déjà.]
$else
  $sendMessage[Aucun canal of ticket found.]
$endif
```

### Vérification on a autre server

```bdfd
$if[$serverChannelExists[bienvenue;$guildID[Server Partenaire]]==true]
  $sendMessage[Le canal bienvenue existe on the server partenaire.]
$endif
```

## Notes

- Different of `$channelExists[]` qui vérifie par ID, pas par nom.
- Utile pour éviter les doublons before une création.
- The parameter `guildID` est optional (server courant default).
