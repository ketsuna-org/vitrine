---
layout: doc
title: $removeEmoji
translation_key: docs
category: "Moderation"
function_name: removeEmoji
syntax: $removeEmoji[name]
description: Supprime un emoji personnalisé du serveur par son nom. L'emoji ne sera plus utilisable après suppression.
parameters:
  - name: name
    description: Le nom de l'emoji à supprimer (sans les deux-points).
returns:
  - type: string
    description: Chaîne vide en cas de succès, ou message d'erreur si l'emoji n'existe pas ou permissions insuffisantes.
related:
  - $addEmoji
  - $emojiName
  - $emojiExists
  - $emojiCount
examples:
  - description: Supprimer un emoji
    code: $removeEmoji[mon_emoji]
---

# $removeEmoji

La fonction `$removeEmoji[]` permet de **supprimer un emoji personnalisé** du serveur en utilisant son nom.

## Syntaxe

```
$removeEmoji[name]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom de l'emoji à supprimer (sans les deux-points `:`). |

## Valeur de retour

- **Type** : String (vide en cas de succès)
- Chaîne vide si la suppression réussit.
- Message d'erreur si l'emoji n'existe pas ou si le bot manque de permissions.

## Comportement

- Le bot doit avoir la permission `MANAGE_EMOJIS_AND_STICKERS`.
- L'emoji est définitivement supprimé du serveur.
- Tous les messages utilisant cet emoji afficheront le nom texte au lieu de l'image.

## Exemples

### Suppression simple

```bdfd
$if[$checkContains[$userPerms;ManageEmojisAndStickers]==true]
  $if[$emojiExists[$noMentionMessage]==true]
    $removeEmoji[$noMentionMessage]
    $sendMessage[✅ Emoji **$noMentionMessage** supprimé.]
  $else
    $sendMessage[❌ L'emoji **$noMentionMessage** n'existe pas.]
  $endif
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Suppression sécurisée avec confirmation

```bdfd
$let[name;$noMentionMessage]
$if[$emojiExists[$name]==true]
  $removeEmoji[$name]
  $title[🗑️ Emoji supprimé]
  $description[
  **Nom :** $name
  **Supprimé par :** $userName[$authorID]
  ]
  $color[#ED4245]
  $sendMessage[]
$else
  $sendMessage[❌ Aucun emoji nommé **$name** trouvé.]
$endif
```

## Notes

- Le nom de l'emoji est sensible à la casse.
- La suppression est irréversible.
- Vérifiez toujours l'existence de l'emoji avec `$emojiExists[]` avant de supprimer.
