---
layout: doc
title: $afkChannelID[]
translation_key: docs
category: "Entity Info"
function_name: afkChannelID
syntax: $afkChannelID
description: Retourne l'identifiant (ID) du salon AFK configuré sur le serveur Discord.
---

# $afkChannelID[] — Salon AFK

`$afkChannelID[]` retourne l'ID du salon vocal AFK (Away From Keyboard) du serveur. Les membres inactifs dans un salon vocal sont automatiquement déplacés vers ce salon après le délai défini par `$afkTimeout[]`.

## Syntaxe

```
$afkChannelID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'ID du salon AFK, ou une chaîne vide si non configuré.

## Utilisation

### Affichage du salon AFK

```bdfd
$if[$afkChannelID!=]
$sendMessage[💤 Salon AFK : <#$afkChannelID> (délai : $afkTimeout secondes)]
$else
$sendMessage[ℹ️ Aucun salon AFK n'est configuré sur ce serveur.]
$endif
```

### Embed configuration serveur

```bdfd
$title[⚙️ Configuration de $serverName]
$addField[💤 Salon AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseNon configuré$endif;yes]
$addField[⏱️ Délai AFK;$afkTimeout secondes;yes]
$addField[📋 Salon des règles;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNon configuré$endif;yes]
$addField[📢 Salon système;$if[$systemChannelID!=]<#$systemChannelID>$elseNon configuré$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Log de configuration

```bdfd
$log[Configuration serveur $serverName | AFK: $afkChannelID | Timeout: $afkTimeout | Règles: $rulesChannelID | Système: $systemChannelID]
```

## Notes

- Le salon AFK doit être un salon vocal.
- Si aucun salon AFK n'est configuré, la fonction retourne une chaîne vide.
- Le délai avant déplacement est donné par `$afkTimeout[]` (en secondes).
- Les membres dans le salon AFK sont automatiquement mis en sourdine par Discord.
