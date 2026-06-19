---
layout: doc
title: $serverVerificationLevel[]
translation_key: docs
category: "Entity Info"
function_name: serverVerificationLevel
syntax: $serverVerificationLevel
description: Retourne le niveau de vérification du serveur sous forme d'entier (0 à 4).
---

# $serverVerificationLevel[] — Niveau de Vérification

`$serverVerificationLevel[]` retourne le niveau de vérification du serveur, qui détermine les critères qu'un membre doit remplir avant de pouvoir envoyer des messages.

## Syntaxe

```
$serverVerificationLevel
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Un entier de 0 à 4 représentant le niveau de vérification :

| Valeur | Niveau | Description |
|--------|--------|-------------|
| 0 | Aucun | Aucune restriction |
| 1 | Faible | Compte avec email vérifié |
| 2 | Moyen | Compte enregistré depuis plus de 5 minutes |
| 3 | Élevé | Membre du serveur depuis plus de 10 minutes |
| 4 | Très élevé | Compte avec numéro de téléphone vérifié |

## Utilisation

### Affichage simple

```bdfd
$sendMessage[🔒 Niveau de vérification : $serverVerificationLevel]
```

### Message interprété

```bdfd
$var[verifLevel;$serverVerificationLevel]
$if[$var[verifLevel]==0]
$var[verifText;Aucune restriction]
$elseIf[$var[verifLevel]==1]
$var[verifText;Email vérifié requis]
$elseIf[$var[verifLevel]==2]
$var[verifText;Compte de plus de 5 minutes]
$elseIf[$var[verifLevel]==3]
$var[verifText;Membre depuis 10 minutes]
$else
$var[verifText;Téléphone vérifié requis]
$endif
$sendMessage[🔒 Niveau de vérification : **$var[verifText]**]
```

### Embed info serveur

```bdfd
$title[Configuration de $serverName]
$addField[Niveau de vérification;$serverVerificationLevel;yes]
$addField[Temps AFK;$afkTimeout secondes;yes]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- Un niveau plus élevé offre une meilleure protection contre le spam et les raids.
- Le niveau 4 (téléphone vérifié) est le plus restrictif et nécessite que Discord ait vérifié le numéro de téléphone du compte.
- Cette information est utile pour les commandes de modération ou les messages de bienvenue contextuels.
