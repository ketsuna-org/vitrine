---
layout: doc
title: $botOwnerID
translation_key: docs
category: "Entity Info"
function_name: botOwnerID
syntax: $botOwnerID
description: Retourne l'ID Discord du propriétaire du bot.
---

# $botOwnerID

La fonction `$botOwnerID` **retourne l'ID Discord du propriétaire du bot**, tel que défini dans la console BDFD.

## Syntaxe

```
$botOwnerID
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- L'ID Discord du propriétaire du bot.

## Comportement

- Retourne l'ID du compte qui a enregistré le bot sur BDFD.
- ID fixe, ne change que si le bot est transféré.
- Utilisable pour des privilèges spéciaux ou des notifications.

## Exemples

### Commande contact propriétaire

```bdfd
$var[motif;$message[1]]
$if[$var[motif]==]
  $sendMessage[❌ Usage: !contact <message>]
  $stop
$endif

$sendDM[$botOwnerID;📬 **Contact de $userName** ($authorID)
Serveur : $serverName ($guildID)
Message : $var[motif]]

$sendMessage[✅ Votre message a été transmis au propriétaire du bot.]
```

### Accès owner uniquement

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Cette commande est réservée au propriétaire du bot.]
  $stop
$endif

;; Code réservé au owner
$sendMessage[✅ Commande owner exécutée.]
```

### Information bot

```bdfd
$title[🤖 $botName]
$addField[Propriétaire;<@$botOwnerID>;yes]
$addField[ID;$botID;yes]
$addField[Node;$botNode;yes]
$addField[Version;$nodeVersion;yes]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

## Notes

- ID fixe, ne change pas sans transfert de propriété.
- Mention du propriétaire : `<@$botOwnerID>`.
- Pour le nom du propriétaire, utilisez `$userName[$botOwnerID]` (nécessite un serveur commun).
- Pour envoyer un message au propriétaire, utilisez `$sendDM[$botOwnerID;message]`.
