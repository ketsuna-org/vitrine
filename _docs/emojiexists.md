---
layout: doc
title: $emojiExists
translation_key: docs
category: "Moderation"
function_name: emojiExists
syntax: $emojiExists[name]
description: Checks if a emoji custom portant a name donné existe on the server courant. Returns true or false.
---

# $emojiExists

The `$emojiExists[]` function **check if a emoji custom existe** on the server courant.

## Syntax

```
$emojiExists[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The emoji name to check (without les two-points). |

## Return value

- **Type** : String (boolean)
- `true` if a emoji portant ce nom existe on the server.
- `false` si aucan emoji with ce nom n'est found.

## Behavior

- La recherche est sensible to la casse.
- Checks only les emojis of the server courant.
- Utile like garde before `$addEmoji[]` or `$removeEmoji[]`.

## Examples

### Avant suppression

```bdfd
$if[$emojiExists[$noMentionMessage]==true]
  $removeEmoji[$noMentionMessage]
  $sendMessage[✅ Emoji **$noMentionMessage** deleted.]
$else
  $sendMessage[❌ L'emoji **$noMentionMessage** does not exist.]
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
    $sendMessage[✅ Emoji **$name** created !]
  $else
    $sendMessage[❌ Joignez an image.]
  $endif
$endif
```

### Vérification in a formulaire

```bdfd
$if[$emojiExists[$message]==true]
  ✅ L'emoji **$message** is available.
  $customEmoji[$message]
$else
  ❌ L'emoji **$message** does not exist. Importez-le with `!addemoji $message`.
$endif
```

## Notes

- The name est sensible to la casse : `Cool` ≠ `cool`.
- Ne vérifie que les emojis of the server courant.
- For emojis externals, use `$emojiName[]` qui retourne vide si inaccessible.
