---
layout: doc
title: $customEmoji
translation_key: docs
category: "Moderation"
function_name: customEmoji
syntax: $customEmoji[name;(id)]
description: Génère le markup d'un emoji personnalisé au format <:nom:ID> pour affichage dans un message. Si l'ID est omis, le bot cherche l'emoji sur le serveur courant.
---

# $customEmoji

La fonction `$customEmoji[]` permet de **générer le markup d'un emoji personnalisé** utilisable dans un message ou un embed. Elle retourne le format `<:nom:ID>` qui sera rendu comme emoji par Discord.

## Syntaxe

```
$customEmoji[name;(id)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom de l'emoji personnalisé. |
| `id` | Optionnel - L'ID de l'emoji. Si omis, recherché sur le serveur par nom. |

## Valeur de retour

- **Type** : String
- Le markup `<:nom:ID>` (ou `<a:nom:ID>` pour les animés) affichable dans Discord.
- Chaîne vide ou nom texte si l'emoji est introuvable.

## Comportement

- Sans ID, la fonction cherche l'emoji par nom sur le serveur courant.
- Avec ID, elle génère directement le markup.
- Les emojis animés sont automatiquement détectés et formatés avec `<a:...>`.

## Exemples

### Affichage simple

```bdfd
$title[Bienvenue !]
$description[
$customEmoji[wave] Bienvenue sur le serveur $customEmoji[party] !
]
$sendMessage[]
```

### Avec ID explicite

```bdfd
$let[emoji;$customEmoji[boost;123456789012345678]]
$title[🚀 Boost détecté $emoji]
$description[Merci pour ton boost !]
$color[#F47FFF]
$sendMessage[]
```

### Menu avec emojis

```bdfd
$title[📋 Menu]
$description[
$customEmoji[rules] Règlement
$customEmoji[announce] Annonces
$customEmoji[chat] Discussion générale
]
$color[#5865F2]
$sendMessage[]
```

### Emoji conditionnel

```bdfd
$if[$emojiExists[verified]==true]
  $customEmoji[verified]
$else
  ✅
$endif Utilisateur vérifié
```

## Notes

- Si l'emoji n'existe pas sur le serveur et qu'aucun ID n'est fourni, le markup ne s'affichera pas correctement.
- Pour les emojis d'autres serveurs, l'ID est obligatoire.
- Le bot doit avoir accès au serveur hébergeant l'emoji pour le résoudre par nom.
