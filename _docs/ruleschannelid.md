---
layout: doc
title: $rulesChannelID[]
translation_key: docs
category: "Entity Info"
function_name: rulesChannelID
syntax: $rulesChannelID
description: Retourne l'identifiant (ID) du salon des règles configuré sur le serveur Discord (serveur Communauté).
parameters: []
returns:
  type: string
  description: L'ID du salon des règles, ou une chaîne vide si non configuré (serveur non-communauté).
related:
  - $systemChannelID
  - $afkChannelID
  - $serverFeatures
  - $channelID
examples:
  - description: Afficher le salon des règles
    code: |
      $sendMessage[Salon des règles : <#$rulesChannelID>]
  - description: Vérifier si configuré
    code: |
      $if[$rulesChannelID==]
      $sendMessage[Pas de salon des règles.]
      $endif
---

# $rulesChannelID[] — Salon des Règles

`$rulesChannelID[]` retourne l'ID du salon des règles configuré sur un serveur Communauté Discord. Ce salon est présenté aux nouveaux membres lorsqu'ils rejoignent le serveur.

> **Prérequis** : Le serveur doit avoir activé l'option "Communauté" dans ses paramètres.

## Syntaxe

```
$rulesChannelID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'ID du salon des règles, ou une chaîne vide si non configuré.

## Utilisation

### Affichage simple

```bdfd
$if[$rulesChannelID!=]
$sendMessage[📋 Règlement du serveur : <#$rulesChannelID>]
$else
$sendMessage[ℹ️ Ce serveur n'a pas de salon des règles dédié.]
$endif
```

### Message de bienvenue avec lien règles

```bdfd
$sendMessage[Bienvenue $username ! 
Merci de lire le règlement ici : <#$rulesChannelID> 📋]
```

### Embed configuration serveur

```bdfd
$title[⚙️ Configuration — $serverName]
$addField[📋 Règles;$if[$rulesChannelID!=]<#$rulesChannelID>$elseNon configuré$endif;yes]
$addField[📢 Système;$if[$systemChannelID!=]<#$systemChannelID>$elseNon configuré$endif;yes]
$addField[💤 AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseNon configuré$endif;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Redirection vers les règles

```bdfd
$if[$rulesChannelID!=$channelID]
$sendMessage[⚠️ Merci d'utiliser les commandes dans un salon approprié. Le règlement est disponible ici : <#$rulesChannelID>]
$endif
```

## Notes

- Le salon des règles est configuré dans les paramètres de serveur Communauté.
- Si le serveur n'est pas un serveur Communauté, cette fonction retourne une chaîne vide.
- Utilisez `$serverFeatures[]` pour vérifier si le serveur a activé la fonctionnalité `COMMUNITY`.
- Le salon est généralement en lecture seule pour les membres standards.
