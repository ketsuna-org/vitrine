---
layout: doc
title: $isEmojiAnimated
translation_key: docs
category: "Math & Text"
function_name: isEmojiAnimated
syntax: $isEmojiAnimated[emoji]
description: Checks if un emoji custom est animé.
---

# $isEmojiAnimated

The function `$isEmojiAnimated[emoji]` **vérifie if a emoji custom est animé**. The emojis animés Discord commencent par `<a:` instead of `<:`.

## Syntax

```
$isEmojiAnimated[emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `emoji` | L'emoji to tester, sous sa forme Discord (`<:nom:id>` or `<a:nom:id>`). |

## Return Value

- **Type** : Boolean
- `true` si l'emoji est animé.
- `false` si l'emoji est static, standard (Unicode), or invalid.

## Behavior

- Functionne only with thes emojis customs Discord.
- Les emojis Unicode standards (😀, 🎉) retournent `false`.
- Le format attendu est la mention of emoji complete.

## Examples

### Vérification of un emoji

```bdfd
$var[emoji;$message[1]]
$if[$isEmojiAnimated[$var[emoji]]==true]
  $sendMessage[🎞️ $var[emoji] est un emoji animé !]
$else
  $sendMessage[🖼️ $var[emoji] est un emoji static or standard.]
$endif
```

### Statistiques of emoji

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
  $sendMessage[❌ Seuls les emojis animés sont alloweds in cette command.]
$endif
```

## Notes

- Format animé : `<a:nom:id>` → `true`.
- Format static : `<:nom:id>` → `false`.
- Emoji Unicode : `😀` → `false`.
- Pour obtenir the name of un emoji, utilisez `$emojiName[]`.
- Pour obtenir the ID of un emoji, utilisez `$emojiID[]`.
