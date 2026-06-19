---
layout: doc
title: $userServerAvatar
translation_key: docs
category: "Entity Info"
function_name: userServerAvatar
syntax: $userServerAvatar
description: Returns the URL of the avatar spécifique au server of the user (avatar par server for the abonnés Nitro).
---

# $userServerAvatar

The variable `$userServerAvatar` retourne l'**URL of the avatar spécifique au server** of the user. The abonnés Discord Nitro peuvent définir un avatar different for each server.

## Syntax

```
$userServerAvatar
```

## Return Value

- **Type** : String de becauseactères (URL)
- The URL of the avatar spécifique au server, or l'avatar global si the user n'a pas défini d'avatar par server

## Behavior

- `$userServerAvatar` ne prend **no argument**.
- Si the user a défini un avatar spécifique pour ce server (functionnalité Nitro), cette URL est retournée.
- Sinon, retourne l'avatar global (identical à `$userAvatar`).

## Examples

### Comparer avatar global and server

```bdfd
$title[Avatars de $userName]
$description[
**Avatar global :**
**Avatar server :**
]
$thumbnail[$userAvatar]
$image[$userServerAvatar]
$color[#5865F2]
$sendMessage[]
```

### Détecter un avatar server custom

```bdfd
$if[$userServerAvatar!=$userAvatar]
  $sendMessage[Vous avez un avatar custom pour ce server !]
$else
  $sendMessage[Vous utilisez votre avatar global.]
$endif
```

## Notes

- La personnalisation d'avatar par server est une functionnalité **Discord Nitro**.
- Si the user n'a pas Nitro or n'a pas défini d'avatar server, `$userServerAvatar` est identical à `$userAvatar`.
- Utile for the logs and les commands de modération où l'apparence par server est pertinente.
