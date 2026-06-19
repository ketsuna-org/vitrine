---
layout: doc
title: $systemChannelID[]
translation_key: docs
category: "Entity Info"
function_name: systemChannelID
syntax: $systemChannelID
description: Retourne l'identifiant (ID) du salon des messages système configuré sur le serveur Discord (messages de bienvenue et de boost).
---

# $systemChannelID[] — Salon des Messages Système

`$systemChannelID[]` retourne l'ID du salon où Discord envoie les messages système automatiques : annonces de nouveaux membres, messages de boost Nitro, etc.

## Syntaxe

```
$systemChannelID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'ID du salon système, ou une chaîne vide si non configuré.

## Utilisation

### Affichage simple

```bdfd
$if[$systemChannelID!=]
$sendMessage[📢 Les messages système sont envoyés dans <#$systemChannelID>]
$else
$sendMessage[ℹ️ Aucun salon système configuré.]
$endif
```

### Embed configuration

```bdfd
$title[⚙️ Configuration de $serverName]
$addField[📢 Salon système;$if[$systemChannelID!=]<#$systemChannelID>$elseNon configuré$endif;yes]
$addField[📋 Salon règles;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNon configuré$endif;yes]
$addField[💤 Salon AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseNon configuré$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Log de configuration

```bdfd
$log[Configuration $serverName | Système: $systemChannelID | Règles: $rulesChannelID | AFK: $afkChannelID]
```

### Message d'aide contextuel

```bdfd
$if[$systemChannelID==$channelID]
$sendMessage[ℹ️ Vous êtes dans le salon des messages système. Les nouveaux membres et boosts sont annoncés ici.]
$endif
```

## Notes

- Le salon système est configuré dans les paramètres du serveur (onglet "Aperçu").
- Les messages concernant les nouveaux membres et les boosts Nitro sont automatiquement postés dans ce salon.
- Si le salon n'est pas configuré, les messages système ne sont pas envoyés.
- Ce salon est distinct du salon des règles (`$rulesChannelID[]`).
