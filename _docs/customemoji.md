---
layout: doc
title: $customEmoji
translation_key: docs
category: "Moderation"
function_name: customEmoji
syntax: $customEmoji[name;(id)]
description: Generates le markup of a custom emoji in the format <:nom:ID> pour affichage in a message. If the ID est omitted, the bot cherche the emoji on the server courant.
---

# $customEmoji

The `$customEmoji[]` function **générer le markup of a custom emoji** utilisable in a message or an embed. Elle returns the format `<:nom:ID>` qui will be rendu like emoji par Discord.

## Syntax

```
$customEmoji[name;(id)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The emoji name custom. |
| `id` | Optional - The ID of the emoji. If omitted, recherché on the server by name. |

## Return value

- **Type** : String
- Le markup `<:nom:ID>` (or `<a:nom:ID>` for animés) affichable in Discord.
- String vide or nom text if the emoji est introuvable.

## Behavior

- Without ID, la function cherche the emoji by name on the server courant.
- Avec ID, elle génère directly le markup.
- Les emojis animés sont automatically détectés and formatteds with `<a:...>`.

## Examples

### Simple display

```bdfd
$title[Bienvenue !]
$description[
$customEmoji[wave] Bienvenue on the server $customEmoji[party] !
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

### Menu with emojis

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
$endif User vérifié
```

## Notes

- If the emoji does not exist on the server and qu'aucan ID n'is provided, le markup ne s'affichera pas correctment.
- For emojis of autres servers, the ID is required.
- The bot must have accès to the server hébergeant the emoji for the résoudre by name.
