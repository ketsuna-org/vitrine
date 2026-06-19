---
layout: doc
title: $unmute
translation_key: docs
category: "Moderation"
function_name: unmute
syntax: $unmute[userID]
description: Retire la sourdine d'un utilisateur.
parameters:
  - name: userID
    description: L'ID de l'utilisateur à réactiver en vocal. Obligatoire.
returns:
  - type: void
    description: Réactive le micro de l'utilisateur. Ne retourne rien.
related:
  - $mute
  - $timeout
  - $unTimeout
examples:
  - description: Réactiver le micro
    code: |
      $unmute[$mentioned[1]]
      $sendMessage[<@$mentioned[1]> peut de nouveau parler.]
---

# $unmute

La fonction `$unmute` **retire la sourdine** d'un utilisateur sur le serveur Discord, lui permettant de parler à nouveau dans les salons vocaux. Le bot doit avoir la permission `MuteMembers`.

## Syntaxe

```
$unmute[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur à réactiver. Obligatoire. |

## Valeur de retour

Aucune. L'utilisateur peut de nouveau parler en vocal.

## Exemples

### Réactivation simple

```bdfd
$unmute[$mentioned[1]]
$sendMessage[🔊 <@$mentioned[1]> peut de nouveau parler !]
```

### Réactivation conditionnelle

```bdfd
$if[$isAdmin==true]
  $unmute[$mentioned[1]]
  $sendMessage[Membre réactivé en vocal.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- Le bot doit avoir la permission `MuteMembers`.
- N'a d'effet que si l'utilisateur est actuellement muet.
- Pour retirer un timeout (silence textuel et vocal temporaire), utilisez `$unTimeout`.
