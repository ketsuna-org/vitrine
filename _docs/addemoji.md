---
layout: doc
title: $addEmoji
translation_key: docs
category: "Moderation"
function_name: addEmoji
syntax: $addEmoji[name;url;(roleID)]
description: Ajoute un nouvel emoji personnalisé au serveur à partir d'une URL. Possibilité de restreindre l'emoji à un rôle spécifique.
---

# $addEmoji

La fonction `$addEmoji[]` permet d'**ajouter un nouvel emoji personnalisé** au serveur à partir d'une URL d'image. L'emoji peut être public ou restreint à un rôle spécifique.

## Syntaxe

```
$addEmoji[name;url;(roleID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom de l'emoji (2 à 32 caractères, alphanumérique + underscores). |
| `url` | L'URL de l'image (PNG, JPEG, GIF). L'image doit être accessible publiquement. |
| `roleID` | Optionnel - ID du rôle autorisé à utiliser l'emoji. Si omis, emoji public. |

## Valeur de retour

- **Type** : String
- Le markup de l'emoji créé au format `<:nom:ID>` en cas de succès.
- Message d'erreur si l'URL est invalide, le nom déjà pris ou les permissions insuffisantes.

## Comportement

- Le bot doit avoir la permission `MANAGE_EMOJIS_AND_STICKERS`.
- Le nom doit être unique parmi les emojis du serveur.
- Limite de 50 emojis standard (plus pour les serveurs boostés).
- Les GIFs animés sont acceptés et créent un emoji animé.

## Exemples

### Ajout simple

```bdfd
$if[$checkContains[$userPerms;ManageEmojisAndStickers]==true]
  $let[emoji;$addEmoji[cool;https://example.com/cool.png]]
  $sendMessage[✅ Emoji ajouté : $emoji]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Emoji avec pièce jointe

```bdfd
$let[url;$getAttachments[$noMentionMessage]]
$if[$url!=]
  $let[firstUrl;$splitText[$url;, ;1]]
  $let[emojiName;$noMentionMessage]
  $let[emoji;$addEmoji[$emojiName;$firstUrl]]
  $sendMessage[✅ Emoji créé : $emoji]
$else
  $sendMessage[❌ Aucune image trouvée. Joignez une image à votre message.]
$endif
```

### Emoji restreint au staff

```bdfd
$let[staffRole;$roleID[Staff]]
$let[emoji;$addEmoji[confidential;https://example.com/lock.png;$staffRole]]
$if[$emoji!=]
  $sendMessage[✅ Emoji **$emoji** créé et réservé au rôle <@&$staffRole>.]
$else
  $sendMessage[❌ Erreur lors de la création de l'emoji.]
$endif
```

### Validation du nom

```bdfd
$let[name;$message]
$if[$length[$name]<2]
  $sendMessage[❌ Le nom doit faire au moins 2 caractères.]
$elseif[$length[$name]>32]
  $sendMessage[❌ Le nom ne doit pas dépasser 32 caractères.]
$elseif[$emojiExists[$name]==true]
  $sendMessage[❌ Un emoji nommé **$name** existe déjà.]
$else
  $let[emoji;$addEmoji[$name;$getAttachments[$noMentionMessage]]]
  $sendMessage[✅ Emoji **$emoji** créé !]
$endif
```

## Notes

- L'URL doit pointer directement vers une image (extension .png, .jpg, .gif).
- Le serveur a une limite d'emojis selon son niveau de boost.
- Les emojis animés comptent dans une limite séparée.
- Le nom ne doit contenir que des lettres, chiffres et underscores.
