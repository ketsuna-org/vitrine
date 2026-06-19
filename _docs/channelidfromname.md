---
layout: doc
title: $channelIDFromName
translation_key: docs
category: "Entity Info"
function_name: channelIDFromName
syntax: $channelIDFromName[name]
description: Returns the ID of a channel Discord from its name.
---

# $channelIDFromName

The `$channelIDFromName` function returns the **ID** of a channel Discord from son **nom**. The recherche est insensible à la casse.

## Syntax

```
$channelIDFromName[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the channel à rechercher. Insensible à la casse (`général` = `Général`). |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the channel found, or `""` si auca channel ne correspond. |

## Examples

### Obtenir the ID

```bdfd
$sendMessage[ID de #général : $channelIDFromName[général]]
```

### Envoyer in a channel by name

```bdfd
$channelSendMessage[$channelIDFromName[annonces];New mise à day available !]
```

### Vérifier existence

```bdfd
$if[$channelIDFromName[logs]!=]
  $sendMessage[Channel #logs found ! ID : $channelIDFromName[logs]]
$else
  $sendMessage[Pas de channel #logs.]
$endif
```

### Dépannage de noms similars

```bdfd
$if[$channelIDFromName[général]!=]
  $sendMessage[Channel général found.]
$else
  $sendMessage[Error : channel introuvable. Essayez un autre nom.]
$endif
```

## Notes

- Si multipthe channels portent le même nom, seul le first found is returned.
- Use `$findChannel` to une recherche plus avancée avec requête partialle.
- The name ne doit pas inclure le préfixe `#`.
