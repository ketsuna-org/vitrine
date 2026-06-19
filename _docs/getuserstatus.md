---
layout: doc
title: $getUserStatus
translation_key: docs
category: "Entity Info"
function_name: getUserStatus
syntax: $getUserStatus[userID]
description: Returns the status online (online, idle, dnd, offline) of the user spécifié.
---

# $getUserStatus

The function `$getUserStatus[]` retourne le **status de présence** of a user on Discord.

## Syntax

```
$getUserStatus[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user dont on souhaite connaître le status. |

## Return Value

- **Type** : String de becauseactères
- Values possibles :
  - `online` — Online (🟢)
  - `idle` — Inactif/Absent (🟡)
  - `dnd` — Ne pas déranger (🔴)
  - `offline` — Offline (⚫)
  - `invisible` — Invisible (apparaît comme offline)

## Behavior

- Requires the **ID user** en parameter.
- Le status reflète la présence en temps réel on Discord.
- Le status `invisible` est rapporté comme `offline` for the autres users.

## Examples

### Afficher le status avec emoji

```bdfd
$let[status;$getUserStatus[$userID]]
$if[$status==online]
  $let[emoji;🟢]
$elseif[$status==idle]
  $let[emoji;🟡]
$elseif[$status==dnd]
  $let[emoji;🔴]
$else
  $let[emoji;⚫]
$endif

$title[Status de $userName]
$description[**Status :** $emoji $status]
$color[#5865F2]
$sendMessage[]
```

### Vérifier le status of a user mentionné

```bdfd
$if[$mentioned!=]
  $let[status;$getUserStatus[$mentioned]]
  $sendMessage[<@$mentioned> est currentlement : **$status**]
$else
  $sendMessage[Mentionnez un user.]
$endif
```

### Ne pas déranger

```bdfd
$if[$getUserStatus[$mentioned]==dnd]
  $sendMessage[⚠️ Cet user est en mode Ne pas déranger.]
$endif
```

## Notes

- Le status `offline` peut signifier que the user est réellement déconnected or en mode invisible.
- Les users peuvent masquer leur status selon leurs parameters de confidentialité.
- Utile for the commands qui nécessitent de savoir if a user is available (ex: envoi de messages privates conditionnels).
