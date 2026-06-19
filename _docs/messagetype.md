---
layout: doc
title: $messageType
translation_key: docs
category: "Entity Info"
function_name: messageType
syntax: $messageType
description: Retourne le type du message déclencheur sous forme d'entier (0 = message normal, 1 = ajout membre, etc.).
returns:
  - type: integer
    description: Le type du message.
related:
  - $message
  - $messageID
  - $isMessageEdited
examples:
  - description: Type du message
    code: "$sendMessage[Type : $messageType]"
  - description: Vérifier si message système
    code: |
      $if[$messageType!=0]
        $sendMessage[Ceci est un message système (type $messageType).]
      $endif
---

# $messageType

La fonction `$messageType` retourne le **type** du message déclencheur sous forme d'entier. Le type `0` correspond à un message utilisateur normal, les autres types correspondent à des messages système Discord.

## Syntaxe

```
$messageType
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | Le type du message. |

## Types courants

| Type | Signification |
|---|---|
| `0` | Message normal (DEFAULT) |
| `1` | Ajout d'un membre au groupe DM (RECIPIENT_ADD) |
| `2` | Retrait d'un membre du groupe DM (RECIPIENT_REMOVE) |
| `3` | Message d'appel vocal (CALL) |
| `4` | Changement de nom de salon (CHANNEL_NAME_CHANGE) |
| `5` | Changement d'icône de salon (CHANNEL_ICON_CHANGE) |
| `6` | Message épinglé (CHANNEL_PINNED_MESSAGE) |
| `7` | Nouveau membre (GUILD_MEMBER_JOIN) |
| `8` | Boost serveur (USER_PREMIUM_GUILD_SUBSCRIPTION) |
| `9` | Boost niveau 1 (GUILD_TIER_1) |
| `10` | Boost niveau 2 (GUILD_TIER_2) |
| `11` | Boost niveau 3 (GUILD_TIER_3) |

## Exemples

### Afficher le type

```bdfd
$sendMessage[Type de message : $messageType]
```

### Ignorer les messages système

```bdfd
$if[$messageType!=0]
  $stop
$endif
$sendMessage[Message utilisateur traité.]
```

### Réagir aux arrivées

```bdfd
$if[$messageType==7]
  $sendMessage[Bienvenue $username !]
$endif
```

## Notes

- Utile pour filtrer les messages système et ne traiter que les messages utilisateurs.
- Retourne un entier, pas une chaîne descriptive.
