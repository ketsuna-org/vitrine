---
layout: doc
title: $addTimestamp[]
translation_key: docs
category: "Embed & Message"
function_name: addTimestamp
syntax: $addTimestamp[(timestamp);(embedIndex)]
description: Adds a timestamp (timestamp) en bas of a Discord embed. Par default, displays the date and the hour currentles.
---

# $addTimestamp[]

The `$addTimestamp[]` function ajoute un **timestamp** (timestamp) in the pied of the Discord embed. Par default, il displays the date and the hour currentles. The timestamp is displayed en bas of the embed, next to of the footer s'it is présent.

## Syntax

```
$addTimestamp[(timestamp);(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `timestamp` | Optional. `now` (by default) for the hour currentle, or a timestamp Unix en seconds for ae date specific. |
| `embedIndex` | Optional. Index of the embed ciblé (0 by default). |

## Return value

Modifies the response in progress of construction. Returns nothing.

## Behavior

- If no parameter n'is provided (`$addTimestamp`), the date and the hour currentles are used.
- Le timestamp s'displays en bas of the embed, sous les fields and the footer.
- Discord formate automatically le timestamp in the fuseau horaire of the user qui le voit.

## Examples

### Timestamp current

```bdfd
$title[Logs]
$description[Une action of modération has been effectuée.]
$addTimestamp
$color[#ED4245]
$sendMessage[]
```

### Timestamp with date specific

```bdfd
$title[Event passé]
$description[Cet event a eu lieu le 19 novembre 2023.]
$addTimestamp[1700000000]
$color[#5865F2]
$sendMessage[]
```

### Timestamp with footer

```bdfd
$title[Bienvenue !]
$description[
Bienvenue on the server **$serverName**, $username !
Nous sommes ravis of t'accueillir parmi nous.
]
$footer[$serverName;$serverIcon]
$addTimestamp
$color[#57F287]
$sendMessage[]
```

### Embed of log with timestamp dynamic

```bdfd
$title[🔨 Moderation Log]
$description[
**Modérateur :** $username
**Action :** Kick
**Reason :** Non-respect règles
]
$addField[User concerné;$var[target];yes]
$addField[ID;$var[targetID];yes]
$footer[Moderation Bot v2.0]
$addTimestamp
$color[#ED4245]
$sendMessage[]
```

## Notes

- Le timestamp est automatically localisé par Discord according to the fuseau horaire of each user.
- Use `$getTimestamp[]` to obtain un timestamp Unix current to passer like parameter.
- Combinez with `$footer[]` for a pied of embed complete (text + icon + timestamp).
- Le format of affichage (relatif "there are 2 hours" or absolu "19/11/2023") dépend of la version of Discord of the destinataire.
