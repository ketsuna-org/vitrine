---
layout: doc
title: $serverVerificationLevel[]
translation_key: docs
category: "Entity Info"
function_name: serverVerificationLevel
syntax: $serverVerificationLevel
description: Returns the level de vérification of the server sous forme d'integer (0 à 4).
---

# $serverVerificationLevel[] — Level de Vérification

`$serverVerificationLevel[]` retourne le level de vérification of the server, qui détermine les critères qu'un member doit remplir before de pouvoir envoyer des messages.

## Syntax

```
$serverVerificationLevel
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- Un integer de 0 à 4 représentant le level de vérification :

| Value | Level | Description |
|--------|--------|-------------|
| 0 | Aucun | Aucune restriction |
| 1 | Faible | Counts avec email vérifié |
| 2 | Moyen | Counts enregistré dethadditionally de 5 minutes |
| 3 | Élevé | Member of the server dethadditionally de 10 minutes |
| 4 | Très élevé | Counts avec numéro de téléphone vérifié |

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🔒 Level de vérification : $serverVerificationLevel]
```

### Message interprété

```bdfd
$var[verifLevel;$serverVerificationLevel]
$if[$var[verifLevel]==0]
$var[verifText;Aucune restriction]
$elseIf[$var[verifLevel]==1]
$var[verifText;Email vérifié required]
$elseIf[$var[verifLevel]==2]
$var[verifText;Counts moreover de 5 minutes]
$elseIf[$var[verifLevel]==3]
$var[verifText;Member dethen 10 minutes]
$else
$var[verifText;Téléphone vérifié required]
$endif
$sendMessage[🔒 Level de vérification : **$var[verifText]**]
```

### Embed info server

```bdfd
$title[Configuration de $serverName]
$addField[Level de vérification;$serverVerificationLevel;yes]
$addField[Temps AFK;$afkTimeout seconds;yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Un level plus élevé offre une meilleure protection contre le spam and les raids.
- Le level 4 (téléphone vérifié) est le plus restrictif and requires que Discord ait vérifié le numéro de téléphone du compte.
- Cette information est utile for the commands de modération or les messages de bienvenue contextuels.
