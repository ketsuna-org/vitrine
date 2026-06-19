---
layout: doc
title: $closeTicket
translation_key: docs
category: "Moderation"
function_name: closeTicket
syntax: $closeTicket[(errorMessage)]
description: Ferme and deletes the ticket (canal) courant. If the canal is not un ticket, a message error optional can be displayed.
---

# $closeTicket

The `$closeTicket[]` function **fermer and supprimer un ticket** (le canal courant). Équivaslow à `$deleteChannels[$channelID]` avec vérification.

## Syntax

```
$closeTicket[(errorMessage)]
```

## Parameters

| Parameter | Description |
|---|---|
| `errorMessage` | Optional - Message if the command is not dans un ticket. Default: "Ce canal is not un ticket." |

## Return value

Cette function does not return a value.

## Behavior

- Deletes the canal in thequel la command est executede.
- Conçu pour être utilisé dans des canaux createds par `$newTicket[]`.
- If the canal is not un ticket reconnu, displays the message error.
- The bot must have `MANAGE_CHANNELS`.

## Examples

### Fermeture simple

```bdfd
$closeTicket
```

### Fermeture avec confirmation

```bdfd
$sendMessage[Fermeture du ticket dans 5 seconds...]
$wait[5]
$closeTicket
```

### Fermeture avec log

```bdfd
$let[logChannel;123456789]
$channelSendMessage[$logChannel;Ticket fermé par $username.]
$closeTicket
```

### Fermeture conditionnelle

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $closeTicket
$else
  $closeTicket[Seuls les administrators and modérateurs peuvent fermer ce ticket.]
$endif
```

### Fermeture avec sauvegarde

```bdfd
$let[transcript;$getChannelMessages[$channelID;100]]
$setUserVar[lastTicketTranscript;$transcript]
$channelSendMessage[$logChannel;Transcript saved. Ticket fermé par $username.]
$closeTicket
```

## Notes

- `$closeTicket[]` deletes the canal — action irréversible.
- Sauvegardez les informations importantes before fermeture (transcript, logs).
- The message error custom allows éviter les fermetures accidentelles.
- Pour une fermeture without suppression, archivez plutôt le canal avec `$modifyChannel[]`.
