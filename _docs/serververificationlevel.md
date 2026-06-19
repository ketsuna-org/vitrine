---
layout: doc
title: $serverVerificationLevel[]
translation_key: docs
category: "Entity Info"
function_name: serverVerificationLevel
syntax: $serverVerificationLevel
description: Returns the level of vérification of the server sous forme of integer (0 to 4).
---

# $serverVerificationLevel[] — Level of Vérification

`$serverVerificationLevel[]` retourne le level of vérification of the server, qui détermine les critères qu'un member doit remplir before of pouvoir envoyer messages.

## Syntax

```
$serverVerificationLevel
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `integer`
- Un integer of 0 to 4 représentant le level of vérification :

| Value | Level | Description |
|--------|--------|-------------|
| 0 | Aucun | Aucune restriction |
| 1 | Faible | Counts with email vérifié |
| 2 | Moyen | Counts enregistré dethadditionally of 5 minutes |
| 3 | Élevé | Member of the server dethadditionally of 10 minutes |
| 4 | Très élevé | Counts with numéro of téléphone vérifié |

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🔒 Level of vérification : $serverVerificationLevel]
```

### Message interprété

```bdfd
$var[verifLevel;$serverVerificationLevel]
$if[$var[verifLevel]==0]
$var[verifText;Aucune restriction]
$elseIf[$var[verifLevel]==1]
$var[verifText;Email vérifié required]
$elseIf[$var[verifLevel]==2]
$var[verifText;Counts moreover of 5 minutes]
$elseIf[$var[verifLevel]==3]
$var[verifText;Member dethen 10 minutes]
$else
$var[verifText;Téléphone vérifié required]
$endif
$sendMessage[🔒 Level of vérification : **$var[verifText]**]
```

### Embed info server

```bdfd
$title[Configuration of $serverName]
$addField[Level of vérification;$serverVerificationLevel;yes]
$addField[Temps AFK;$afkTimeout seconds;yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Un level plus élevé offre une meilleure protection contre le spam and les raids.
- Le level 4 (téléphone vérifié) est le plus restrictif and requires que Discord ait vérifié le numéro of téléphone of the compte.
- Cette information est utile for the commands of modération or les messages of bienvenue contextuels.
