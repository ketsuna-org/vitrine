---
layout: doc
title: $isEmojiAnimated
translation_key: docs
category: "Math & Text"
function_name: isEmojiAnimated
syntax: $isEmojiAnimated[emoji]
description: Vérifie si un emoji personnalisé est animé.
---

# $isEmojiAnimated

La fonction `$isEmojiAnimated[emoji]` **vérifie si un emoji personnalisé est animé**. Les emojis animés Discord commencent par `<a:` au lieu de `<:`.

## Syntaxe

```
$isEmojiAnimated[emoji]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `emoji` | L'emoji à tester, sous sa forme Discord (`<:nom:id>` ou `<a:nom:id>`). |

## Valeur de retour

- **Type** : Booléen
- `true` si l'emoji est animé.
- `false` si l'emoji est statique, standard (Unicode), ou invalide.

## Comportement

- Fonctionne uniquement avec les emojis personnalisés Discord.
- Les emojis Unicode standards (😀, 🎉) retournent `false`.
- Le format attendu est la mention d'emoji complète.

## Exemples

### Vérification d'un emoji

```bdfd
$var[emoji;$message[1]]
$if[$isEmojiAnimated[$var[emoji]]==true]
  $sendMessage[🎞️ $var[emoji] est un emoji animé !]
$else
  $sendMessage[🖼️ $var[emoji] est un emoji statique ou standard.]
$endif
```

### Statistiques d'emoji

```bdfd
$title[📊 Info Emoji]
$description[
**Emoji :** $message[1]
**Animé :** $if[$isEmojiAnimated[$message[1]]==true]Oui$elseNon$endif
**Nom :** $emojiName[$message[1]]
**ID :** $emojiID[$message[1]]
]
$sendMessage[]
```

### Filtrer les emojis animés

```bdfd
$var[emoji;$message[1]]
$if[$isEmojiAnimated[$var[emoji]]==true]
  $sendMessage[✅ Emoji animé détecté !]
  $sendMessage[$var[emoji]]
$else
  $sendMessage[❌ Seuls les emojis animés sont autorisés dans cette commande.]
$endif
```

## Notes

- Format animé : `<a:nom:id>` → `true`.
- Format statique : `<:nom:id>` → `false`.
- Emoji Unicode : `😀` → `false`.
- Pour obtenir le nom d'un emoji, utilisez `$emojiName[]`.
- Pour obtenir l'ID d'un emoji, utilisez `$emojiID[]`.
