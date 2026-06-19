---
layout: doc
title: $emojiCount / $emoteCount
translation_key: docs
category: "Moderation"
function_name: emojiCount
syntax: $emojiCount / $emoteCount
description: Retourne le nombre total d'emojis personnalisés sur le serveur courant. $emoteCount est un alias de $emojiCount.
parameters: []
returns:
  - type: string (number)
    description: Le nombre d'emojis personnalisés sur le serveur.
related:
  - $addEmoji
  - $removeEmoji
  - $emojiExists
  - $serverEmojis
examples:
  - description: Nombre d'emojis du serveur
    code: $emojiCount
  - description: Utilisation de l'alias
    code: $emoteCount
---

# $emojiCount / $emoteCount

La fonction `$emojiCount` (alias `$emoteCount`) permet de **récupérer le nombre total d'emojis personnalisés** présents sur le serveur courant.

## Syntaxe

```
$emojiCount
```
ou
```
$emoteCount
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String (nombre)
- Le nombre total d'emojis personnalisés sur le serveur.
- Inclut à la fois les emojis statiques et animés.

## Comportement

- `$emoteCount` est un alias exact de `$emojiCount` (même comportement).
- Compte tous les emojis personnalisés du serveur.
- Utile pour vérifier l'utilisation des slots d'emojis disponibles.

## Exemples

### Statistiques d'emojis

```bdfd
$title[🎨 Emojis du serveur]
$description[
**Nombre total :** $emojiCount
**Limite :** 50 emojis (plus pour les serveurs boostés)
**Slots restants :** $math[50-$emojiCount]
]
$color[#5865F2]
$sendMessage[]
```

### Alerte de limite

```bdfd
$if[$emojiCount>=50]
  $sendMessage[⚠️ La limite d'emojis est atteinte ($emojiCount/50). Supprimez des emojis inutilisés.]
$else
  $sendMessage[✅ $math[50-$emojiCount] slots d'emojis disponibles.]
$endif
```

### Affichage avec alias

```bdfd
$title[📊 Infos serveur]
$description[
**Membres :** $membersCount
**Salons :** $channelCount
**Rôles :** $roleCount
**Emojis :** $emoteCount
]
$sendMessage[]
```

## Notes

- Les deux noms (`$emojiCount` et `$emoteCount`) sont interchangeables.
- La limite de base est 50 emojis, extensible avec les boosts du serveur.
- Les emojis animés et statiques partagent des limites séparées.
