---
layout: doc
title: $dm
translation_key: docs
category: "Messages & DM"
function_name: dm
syntax: $dm[userID;content]
description: Sends a message private (DM) to a user. The bot must pouvoir DM the user cible.
---
# $dm

The `$dm[]` function **envoyer a message private** to a user Discord.

## Syntax

```
$dm[userID;content]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user destinataire. |
| `content` | Le contenu of the message (markdown, mentions supportés). |

## Return value

- **Type** : Snowflake (string)
- The ID of the message sent.
- String vide if the DM est impossible (user bloqué, DMs fermés).

## Behavior

- The bot must pouvoir envoyer DMs to the user (pas bloqué, DMs ouverts).
- Les embeds définis before `$dm[]` sont included.
- If the user a fermé their DMs, la function échoue silencieusement.

## Examples

### DM simple to the author

```bdfd
$dm[$authorID;Merci of avoir utilisé la command !]
```

### DM with embed

```bdfd
$title[📬 Notification]
$description[Votre demande a bien été prise into account.\n\nUn modérateur vous répondra sous peu.]
$color[#5865F2]
$footer[Équipe $serverName]
$dm[$authorID;]
```

### DM to a user mentionné

```bdfd
$if[$mentioned[1]!=]
  $dm[$mentioned[1];$username vous a sent this message : $noMentionMessage]
  $sendMessage[DM sent with success !]
$else
  $sendMessage[Mentionnez a user.]
$endif
```

## Notes

- Contrairement to `$sendMessage`, le DM n'apparaît pas in the channel courant.
- Limit of 2000 becauseactères par message.
- For DM of bienvenue, check that the user accepte les DMs.
