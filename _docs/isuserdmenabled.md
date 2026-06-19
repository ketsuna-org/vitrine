---
layout: doc
title: $isUserDmEnabled
translation_key: docs
category: "Math & Text"
function_name: isUserDmEnabled
syntax: $isUserDmEnabled[userID]
description: Checks if les messages privates (DM) of a user sont ouverts.
---

# $isUserDmEnabled

The function `$isUserDmEnabled[userID]` **vérifie if a user accepte les messages privates** (DMs) of la part of members of the même server or of the bot.

## Syntax

```
$isUserDmEnabled[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to vérifier. |

## Return Value

- **Type** : Boolean
- `true` if thes DMs of the user sont ouverts for the bot.
- `false` if thes DMs sont fermés or inaccessibles.

## Behavior

- Checks if the bot peut envoyer un message private to cet user.
- Un user peut fermer their DMs via their parameters of confidentialité Discord.
- The bot doit share to the moins un server with the user.

## Examples

### Notification conditionnelle

```bdfd
$if[$isUserDmEnabled[$mentioned[1]]==true]
  $sendDM[$mentioned[1];📬 Vous avez received un avertissement on **$serverName** : $message[2]]
  $sendMessage[✅ Avertissement sent en DM to <@$mentioned[1]>.]
$else
  $sendMessage[⚠️ Impossible of envoyer un DM to <@$mentioned[1]>. Notification public.]
$endif
```

### Vérification before envoi

```bdfd
$var[userID;$mentioned[1]]
$var[contenu;$message[2]]
$if[$isUserDmEnabled[$var[userID]]==true]
  $sendDM[$var[userID];$var[contenu]]
  $sendEphemeral[✅ Message sent en private.]
$else
  $sendEphemeral[❌ Cet user a désenabled their DMs.]
$endif
```

### Boucle of notification

```bdfd
$for[i;1;$mentionedCount;1]
  $if[$isUserDmEnabled[$mentioned[$for[i]]]==true]
    $sendDM[$mentioned[$for[i]];Rcall : réunion tomorrow to 14h]
  $endif
$endfor
$sendMessage[✅ Rcalls sents to the members availables.]
```

## Notes

- Les DMs can be fermés par parameter of confidentialité user.
- The bot ne peut pas forcer l'ouverture DMs of a user.
- Pour envoyer un message private, utilisez `$sendDM[]`.
- Si les DMs sont fermés, `$sendDM[]` échouera silencieusement.
