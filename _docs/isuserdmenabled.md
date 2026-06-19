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

The function `$isUserDmEnabled[userID]` **vérifie if a user accepte les messages privates** (DMs) de la part de members du même server or of the bot.

## Syntax

```
$isUserDmEnabled[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user à vérifier. |

## Return Value

- **Type** : Boolean
- `true` if thes DMs of the user sont ouverts for the bot.
- `false` if thes DMs sont fermés or inaccessibles.

## Behavior

- Checks if the bot peut envoyer un message private à cet user.
- Un user peut fermer their DMs via their parameters de confidentialité Discord.
- The bot doit partager au moins un server with the user.

## Examples

### Notification conditionnelle

```bdfd
$if[$isUserDmEnabled[$mentioned[1]]==true]
  $sendDM[$mentioned[1];📬 Vous avez received un avertissement sur **$serverName** : $message[2]]
  $sendMessage[✅ Avertissement sent en DM à <@$mentioned[1]>.]
$else
  $sendMessage[⚠️ Impossible d'envoyer un DM à <@$mentioned[1]>. Notification public.]
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

### Boucle de notification

```bdfd
$for[i;1;$mentionedCount;1]
  $if[$isUserDmEnabled[$mentioned[$for[i]]]==true]
    $sendDM[$mentioned[$for[i]];Rcall : réunion tomorrow à 14h]
  $endif
$endfor
$sendMessage[✅ Rcalls sents aux members availables.]
```

## Notes

- Les DMs can be fermés par parameter de confidentialité user.
- The bot ne peut pas forcer l'ouverture des DMs of a user.
- Pour envoyer un message private, utilisez `$sendDM[]`.
- Si les DMs sont fermés, `$sendDM[]` échouera silencieusement.
