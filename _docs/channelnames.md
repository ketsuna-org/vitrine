---
layout: doc
title: $channelNames
translation_key: docs
category: "Entity Info"
function_name: channelNames
syntax: $channelNames[(separator)]
description: Returns the list de all noms de channels of the server, separateds par un separator personnalisable.
---

# $channelNames

The `$channelNames` function returns the **list complete des noms** de all channels of the server, separateds par un délimitur personnalisable.

## Syntax

```
$channelNames[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional. The separator between each nom de channel. Par default: `, ` (virgule + espace). |

## Return value

| Type | Description |
|---|---|
| `string` | All noms de channels concaténés with the separator choisi. |

## Examples

### List simple

```bdfd
$sendMessage[**Channels of the server :** $channelNames]
```

### List avec return à la ligne

```bdfd
$sendMessage[**List of channels :**
$channelNames[
]]
```

### List avec separator custom

```bdfd
$sendMessage[Channels : $channelNames[ | ]]
```

### Compter les channels by name

```bdfd
$sendMessage[The server a $channelCount channels : $channelNames[, ]]
```

## Notes

- Seuls les channels visibles par the bot sont listés.
- Les catégories sont includedes in the list.
- Pour obtenir les IDs plutôt que les noms, use plutôt une boucle avec `$findChannel`.
