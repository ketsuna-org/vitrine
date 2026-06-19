---
layout: doc
title: $slashID
translation_key: docs
category: "Entity Info"
function_name: slashID
syntax: $slashID
description: Retourne l'ID Discord de la commande slash en cours d'exécution.
---

# $slashID

La fonction `$slashID` **retourne l'ID Discord (snowflake) de la commande slash** en cours d'exécution. Si la commande n'est pas une commande slash, retourne une chaîne vide.

## Syntaxe

```
$slashID
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- L'ID Discord de la commande slash (ex: `1234567890123456789`).
- Chaîne vide si la commande en cours est une commande prefix.

## Comportement

- L'ID est attribué par Discord lors de l'enregistrement de la commande.
- Utile pour le logging, le debugging, ou l'identification unique.
- Retourne vide pour les commandes prefix.

## Exemples

### Log détaillé

```bdfd
$if[$slashID!=]
  $log[🔹 SLASH | ID: $slashID | Name: $commandName | User: $userName ($authorID) | Server: $serverName]
$else
  $log[🔸 PREFIX | Name: $commandName | Trigger: $commandTrigger | User: $userName]
$endif
```

### Debug commande

```bdfd
$if[$authorID!=$botOwnerID]
  $stop
$endif

$title[🔍 Debug Commande]
$description[
**Nom :** $commandName
**Trigger :** $commandTrigger
**Type :** $commandType
**Folder :** $commandFolder
**Slash ID :** $if[$slashID!=]$slashID$elseN/A (prefix)$endif
**Auteur :** $userName ($authorID)
**Serveur :** $serverName ($guildID)
**Canal :** $channelName ($channelID)
]
$color[#5865F2]
$sendMessage[]
```

### Comportement conditionnel

```bdfd
$if[$slashID!=]
  $var[mode;slash]
  $var[args;$slashOption[1]]
$else
  $var[mode;prefix]
  $var[args;$message[1]]
$endif

$sendMessage[📌 Mode : $var[mode] | Args : $var[args]]
```

### Information commande pour support

```bdfd
$if[$slashID!=]
  $sendMessage[🆔 **Slash Command ID :** $slashID
  ┗ Nom : $commandName]
$else
  $sendMessage[📝 **Prefix Command**
  ┗ Trigger : $commandTrigger]
$endif
```

## Notes

- Retourne une chaîne vide pour les commandes prefix.
- L'ID est unique et attribué par Discord.
- Utile pour le support technique (fournir l'ID en cas de bug).
- Pour vérifier si une commande est slash, utilisez `$isSlash` ou `$commandType`.
