---
layout: doc
title: $kick
translation_key: docs
category: "Moderation"
function_name: kick
syntax: $kick[userID;(reason)]
description: Expulse un utilisateur du serveur Discord.
parameters:
  - name: userID
    description: L'ID de l'utilisateur à expulser. Obligatoire.
  - name: reason
    description: Optionnel. La raison de l'expulsion.
returns:
  - type: void
    description: Expulse l'utilisateur. Ne retourne rien.
related:
  - $ban
  - $kickMention
  - $mute
examples:
  - description: Expulser par mention
    code: |
      $kick[$mentioned[1];Comportement inapproprié]
      $sendMessage[<@$mentioned[1]> a été expulsé.]
---

# $kick

La fonction `$kick` **expulse (kick) un utilisateur** du serveur Discord. Contrairement au bannissement, l'utilisateur peut revenir avec une nouvelle invitation. Le bot doit avoir la permission `KickMembers`.

## Syntaxe

```
$kick[userID;(reason)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur à expulser. Obligatoire. |
| `reason` | Optionnel. La raison de l'expulsion. |

## Valeur de retour

Aucune. L'utilisateur est expulsé du serveur.

## Exemples

### Expulsion simple

```bdfd
$kick[$mentioned[1];Non-respect des règles]
$sendMessage[<@$mentioned[1]> a été expulsé.]
```

### Commande d'expulsion avec confirmation

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !kick <@mention> <raison>]
  $stop
$endif

$kick[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[✅ Expulsion effectuée.]
```

### Vérification avant expulsion

```bdfd
$if[$isAdmin==true]
  $kick[$mentioned[1];Abus]
  $sendMessage[Membre expulsé.]
$else
  $sendMessage[Permission refusée. Admin requis.]
$endif
```

## Notes

- Le bot doit avoir la permission `KickMembers`.
- L'utilisateur expulsé peut être réinvité.
- Utilisez `$ban` pour une exclusion permanente.
- Pour expulser l'utilisateur mentionné sans spécifier l'ID, utilisez `$kickMention`.
