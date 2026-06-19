---
layout: doc
title: $kickMention
translation_key: docs
category: "Moderation"
function_name: kickMention
syntax: $kickMention
description: Expulse l'utilisateur mentionné dans le message.
parameters: []
returns:
  - type: void
    description: Expulse le membre mentionné. Ne retourne rien.
related:
  - $kick
  - $ban
  - $mute
examples:
  - description: Expulser la mention
    code: |
      $kickMention
      $sendMessage[Utilisateur expulsé.]
---

# $kickMention

La fonction `$kickMention` **expulse automatiquement l'utilisateur mentionné** dans le message déclencheur. C'est un raccourci pratique qui évite de spécifier un ID. Le bot doit avoir la permission `KickMembers`.

## Syntaxe

```
$kickMention
```

## Paramètres

Aucun paramètre. La fonction détecte automatiquement l'utilisateur mentionné.

## Valeur de retour

Aucune. L'utilisateur mentionné est expulsé.

## Exemples

### Expulsion simple

```bdfd
$kickMention
$sendMessage[Membre expulsé avec succès !]
```

### Expulsion avec raison par défaut

```bdfd
$kickMention
$sendMessage[<@$mentioned[1]> a été expulsé pour non-respect des règles.]
```

## Notes

- Le message déclencheur doit contenir une mention d'utilisateur.
- Le bot doit avoir la permission `KickMembers`.
- Pour expulser un utilisateur spécifique par ID, utilisez `$kick`.
- Si aucune mention n'est présente, le comportement peut être indéfini.
