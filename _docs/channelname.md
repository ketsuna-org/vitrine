---
layout: doc
title: $channelName
translation_key: docs
category: "Entity Info"
function_name: channelName
syntax: $channelName[(channelID)]
description: Returns the name of the channel Discord courant or of a channel specific via its ID.
---

# $channelName

The `$channelName` function returns the **nom** of a channel Discord. Par default, elle retourne the name of the channel où la command est executede, mais elle peut also retourner the name of a channel specific if a ID is provided.

## Syntax

```
$channelName[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. If omitted, the channel courant is used. |

## Return value

| Type | Description |
|---|---|
| `string` | The name of the channel (ex: `général`, `annonces`). |

## Examples

### Nom of the channel courant

```bdfd
$sendMessage[Bienvenue in #$channelName !]
```

### Nom of a channel specific

```bdfd
$sendMessage[The channel est : $channelName[123456789012345678]]
```

### Vérifier the name of a channel

```bdfd
$if[$channelName==général]
  $sendMessage[Vous êtes in the channel général.]
$endif
```

## Notes

- For channels textuels, the name is displayed without le préfixe `#`. Ajoutez-le manually si besoin.
- The name of channels vocaux s'displays of la même manière (ex: `Vocal 1`).
- Pour listr all channels, use `$channelNames`.
