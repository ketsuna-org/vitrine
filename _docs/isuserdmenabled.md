---
layout: doc
title: $isUserDmEnabled
translation_key: docs
category: "Math & Text"
function_name: isUserDmEnabled
syntax: $isUserDmEnabled[userID]
description: Vérifie si les messages privés (DM) d'un utilisateur sont ouverts.
---

# $isUserDmEnabled

La fonction `$isUserDmEnabled[userID]` **vérifie si un utilisateur accepte les messages privés** (DMs) de la part de membres du même serveur ou du bot.

## Syntaxe

```
$isUserDmEnabled[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur à vérifier. |

## Valeur de retour

- **Type** : Booléen
- `true` si les DMs de l'utilisateur sont ouverts pour le bot.
- `false` si les DMs sont fermés ou inaccessibles.

## Comportement

- Vérifie si le bot peut envoyer un message privé à cet utilisateur.
- Un utilisateur peut fermer ses DMs via ses paramètres de confidentialité Discord.
- Le bot doit partager au moins un serveur avec l'utilisateur.

## Exemples

### Notification conditionnelle

```bdfd
$if[$isUserDmEnabled[$mentioned[1]]==true]
  $sendDM[$mentioned[1];📬 Vous avez reçu un avertissement sur **$serverName** : $message[2]]
  $sendMessage[✅ Avertissement envoyé en DM à <@$mentioned[1]>.]
$else
  $sendMessage[⚠️ Impossible d'envoyer un DM à <@$mentioned[1]>. Notification publique.]
$endif
```

### Vérification avant envoi

```bdfd
$var[userID;$mentioned[1]]
$var[contenu;$message[2]]
$if[$isUserDmEnabled[$var[userID]]==true]
  $sendDM[$var[userID];$var[contenu]]
  $sendEphemeral[✅ Message envoyé en privé.]
$else
  $sendEphemeral[❌ Cet utilisateur a désactivé ses DMs.]
$endif
```

### Boucle de notification

```bdfd
$for[i;1;$mentionedCount;1]
  $if[$isUserDmEnabled[$mentioned[$for[i]]]==true]
    $sendDM[$mentioned[$for[i]];Rappel : réunion demain à 14h]
  $endif
$endfor
$sendMessage[✅ Rappels envoyés aux membres disponibles.]
```

## Notes

- Les DMs peuvent être fermés par paramètre de confidentialité utilisateur.
- Le bot ne peut pas forcer l'ouverture des DMs d'un utilisateur.
- Pour envoyer un message privé, utilisez `$sendDM[]`.
- Si les DMs sont fermés, `$sendDM[]` échouera silencieusement.
