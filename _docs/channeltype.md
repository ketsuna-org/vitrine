---
layout: doc
title: $channelType
translation_key: docs
category: "Entity Info"
function_name: channelType
syntax: $channelType[(channelID)]
description: Retourne le type d'un salon Discord (text, voice, category, dm, etc.).
---

# $channelType

La fonction `$channelType` retourne le **type** d'un salon Discord. Les types possibles incluent `text`, `voice`, `category`, `news`, `stage`, `forum` et `dm`.

## Syntaxe

```
$channelType[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Le type du salon. Valeurs possibles : `text`, `voice`, `category`, `news`, `stage`, `forum`, `dm`, `group_dm`. |

## Exemples

### Afficher le type du salon

```bdfd
$sendMessage[Ce salon est de type : **$channelType**]
```

### Vérifier si salon vocal

```bdfd
$if[$channelType==voice]
  $sendMessage[Vous êtes dans un salon vocal.]
$else
  $sendMessage[Vous n'êtes pas dans un salon vocal.]
$endif
```

### Vérifier si catégorie

```bdfd
$if[$channelType==category]
  $sendMessage[Cette commande ne peut pas être utilisée dans une catégorie.]
  $stop
$endif
```

## Notes

- Les types sont retournés en minuscules.
- Utile pour conditionner le comportement d'une commande selon le type de salon.
- Les salons de type `dm` n'ont pas de catégorie parente.
