---
layout: doc
title: $emojiExists
translation_key: docs
category: "Moderation"
function_name: emojiExists
syntax: $emojiExists[name]
description: Vérifie si un emoji personnalisé portant un nom donné existe sur le serveur courant. Retourne true ou false.
---

# $emojiExists

La fonction `$emojiExists[]` permet de **vérifier si un emoji personnalisé existe** sur le serveur courant.

## Syntaxe

```
$emojiExists[name]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom de l'emoji à vérifier (sans les deux-points). |

## Valeur de retour

- **Type** : String (booléen)
- `true` si un emoji portant ce nom existe sur le serveur.
- `false` si aucun emoji avec ce nom n'est trouvé.

## Comportement

- La recherche est sensible à la casse.
- Vérifie uniquement les emojis du serveur courant.
- Utile comme garde avant `$addEmoji[]` ou `$removeEmoji[]`.

## Exemples

### Avant suppression

```bdfd
$if[$emojiExists[$noMentionMessage]==true]
  $removeEmoji[$noMentionMessage]
  $sendMessage[✅ Emoji **$noMentionMessage** supprimé.]
$else
  $sendMessage[❌ L'emoji **$noMentionMessage** n'existe pas.]
$endif
```

### Avant création

```bdfd
$let[name;$noMentionMessage]
$if[$emojiExists[$name]==true]
  $sendMessage[❌ Un emoji nommé **$name** existe déjà.]
$else
  $let[url;$getAttachments[$noMentionMessage]]
  $if[$url!=]
    $addEmoji[$name;$url]
    $sendMessage[✅ Emoji **$name** créé !]
  $else
    $sendMessage[❌ Joignez une image.]
  $endif
$endif
```

### Vérification dans un formulaire

```bdfd
$if[$emojiExists[$message]==true]
  ✅ L'emoji **$message** est disponible.
  $customEmoji[$message]
$else
  ❌ L'emoji **$message** n'existe pas. Importez-le avec `!addemoji $message`.
$endif
```

## Notes

- Le nom est sensible à la casse : `Cool` ≠ `cool`.
- Ne vérifie que les emojis du serveur courant.
- Pour les emojis externes, utilisez `$emojiName[]` qui retourne vide si inaccessible.
