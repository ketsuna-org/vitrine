---
layout: doc
title: $userExists
translation_key: docs
category: "Entity Info"
function_name: userExists
syntax: $userExists[userID/mention]
description: Checks if the user spécifié (par ID or mention) existe on Discord and retourne "true" or "false".
---

# $userExists

The function `$userExists[]` vérifie if a user Discord existe, à partir d'un **ID** or d'une **mention**.

## Syntax

```
$userExists[userID/mention]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID/mention` | The ID numérique (snowflake) or la mention (`<@ID>`) of the user à vérifier. |

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` si the user existe and est connu of the bot
- `"false"` si the ID est invalid or the user introuvable

## Behavior

- La vérification se base sur les users accessibles au bot (cache des servers partagés).
- Un user peut exister on Discord without être on the server of the bot — in this case, the result dépend du context.

## Examples

### Vérifier une mention

```bdfd
$if[$userExists[$mentioned]==true]
  $title[Informations sur <@$mentioned>]
  $description[
  **ID :** $mentioned
  **Nom :** $userName[$mentioned]
  ]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Je ne trouve pas cet user.]
$endif
```

### Vérifier un ID fixe

```bdfd
$if[$userExists[123456789012345678]==true]
  $sendMessage[Le owner existe toudays !]
$endif
```

## Notes

- Utilisez `$userExists[]` pour validr les entrées user before d'exécuter des actions qui pourraient échouer.
- `$userExists[]` ne vérifie pas si the user est **member of the server**, only s'il existe on Discord and est connu of the bot.
- Function utile pour éviter les errors in thes commands utilisant des IDs fournis par the user.
