---
layout: doc
title: $findChannel
translation_key: docs
category: "Entity Info"
function_name: findChannel
syntax: $findChannel[query]
description: Recherche un channel par nom partial or complete and retourne son ID. Insensible à la casse.
---

# $findChannel

The function `$findChannel` recherche un channel Discord par **nom partial or complete** and retourne son ID. The recherche est insensible à la casse.

## Syntax

```
$findChannel[query]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | The name or une partie du nom of the channel à rechercher. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the channel found, or `""` si no channel ne correspond. |

## Examples

### Recherche par nom partial

```bdfd
$sendMessage[Channel correspondant à "gén" : $findChannel[gén]]
```

### Envoyer un message dans un channel found

```bdfd
$channelSendMessage[$findChannel[logs];Nouvel event enregistré.]
```

### Vérifier si the channel existe

```bdfd
$if[$findChannel[annonces]!=]
  $sendMessage[Channel annonces found : <#$findChannel[annonces]>]
$else
  $sendMessage[Aucun channel ne correspond à "annonces".]
$endif
```

### Utilisation comme fallback

```bdfd
$if[$channelIDFromName[général]!=]
  $sendMessage[Channel général : $channelIDFromName[général]]
$else
  $sendMessage[Recherche étendue : $findChannel[gén]]
$endif
```

## Notes

- Si several channels correspondent, le **first** found est retourné.
- Pour une recherche exact, préférez `$channelIDFromName`.
- Pratique when the user ne connaît pas the name exact of the channel.
- Le préfixe `#` ne doit pas être included in the requête.
