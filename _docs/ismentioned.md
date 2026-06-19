---
layout: doc
title: $isMentioned
translation_key: docs
category: "Entity Info"
function_name: isMentioned
syntax: $isMentioned
description: Retourne "true" si l'utilisateur qui a déclenché la commande a été mentionné dans le message, "false" sinon.
parameters: []
returns:
  - type: boolean (string)
    description: '"true" si l''utilisateur a été mentionné, "false" sinon.'
related:
  - $mentioned
  - $mentions
  - $mentionedRoles
  - $mentionedChannels
examples:
  - description: Vérifier si mentionné
    code: $isMentioned
  - description: Répondre uniquement si mentionné
    code: |
      $if[$isMentioned==true]
        $sendMessage[Vous avez été mentionné !]
      $endif
---

# $isMentioned

La variable `$isMentioned` retourne `"true"` si l'utilisateur qui a déclenché la commande a été **mentionné** dans le message (via `@mention`).

## Syntaxe

```
$isMentioned
```

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : l'utilisateur déclencheur est mentionné dans le message
- `"false"` : l'utilisateur déclencheur n'est pas mentionné

## Comportement

- `$isMentioned` ne prend **aucun argument**.
- Vérifie si l'**utilisateur déclencheur** fait partie des mentions du message.
- Détecte les mentions directes (`@user`), pas les `@everyone`/`@here`.

## Exemples

### Réagir à une mention

```bdfd
$if[$isMentioned==true]
  $sendMessage[Hé <@$userID>, vous avez été mentionné !]
$endif
```

### Commande avec mention obligatoire

```bdfd
$if[$isMentioned==true]
  $sendMessage[Que puis-je faire pour vous, $userName ?]
$else
  $sendMessage[Mentionnez-moi pour attirer mon attention !]
$endif
```

## Notes

- `$isMentioned` vérifie si l'utilisateur **déclencheur** est mentionné, pas si le bot est mentionné.
- Pour savoir qui a été mentionné, utilisez `$mentioned` (première mention) ou `$mentions` (toutes les mentions).
- Ne détecte pas les mentions `@everyone` ou `@here`.
