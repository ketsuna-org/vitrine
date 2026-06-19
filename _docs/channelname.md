---
layout: doc
title: $channelName
translation_key: docs
category: "Entity Info"
function_name: channelName
syntax: $channelName[(channelID)]
description: Retourne le nom du salon Discord courant ou d'un salon spécifique via son ID.
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon dont on veut obtenir le nom. Si omis, utilise le salon courant."
returns:
  - type: string
    description: Le nom du salon.
related:
  - $channelID
  - $channelType
  - $channelNames
  - $findChannel
examples:
  - description: Nom du salon courant
    code: $sendMessage[Salon : #$channelName]
  - description: Nom d'un salon spécifique par ID
    code: $sendMessage[Le salon est : $channelName[123456789012345678]]
---

# $channelName

La fonction `$channelName` retourne le **nom** d'un salon Discord. Par défaut, elle retourne le nom du salon où la commande est exécutée, mais elle peut aussi retourner le nom d'un salon spécifique si un ID est fourni.

## Syntaxe

```
$channelName[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Le nom du salon (ex: `général`, `annonces`). |

## Exemples

### Nom du salon courant

```bdfd
$sendMessage[Bienvenue dans #$channelName !]
```

### Nom d'un salon spécifique

```bdfd
$sendMessage[Le salon est : $channelName[123456789012345678]]
```

### Vérifier le nom d'un salon

```bdfd
$if[$channelName==général]
  $sendMessage[Vous êtes dans le salon général.]
$endif
```

## Notes

- Pour les salons textuels, le nom est affiché sans le préfixe `#`. Ajoutez-le manuellement si besoin.
- Le nom des salons vocaux s'affiche de la même manière (ex: `Vocal 1`).
- Pour lister tous les salons, utilisez `$channelNames`.
