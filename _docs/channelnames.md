---
layout: doc
title: $channelNames
translation_key: docs
category: "Entity Info"
function_name: channelNames
syntax: $channelNames[(separator)]
description: Retourne la liste de tous les noms de salons du serveur, séparés par un séparateur personnalisable.
parameters:
  - name: separator
    description: "Optionnel. Caractère ou chaîne de séparation (défaut : , )."
returns:
  - type: string
    description: La liste des noms de salons séparés.
related:
  - $channelName
  - $channelCount
  - $roleNames
examples:
  - description: Liste des salons (séparateur virgule)
    code: $sendMessage[Salons : $channelNames]
  - description: Liste avec retour à la ligne
    code: $sendMessage[Salons :\n$channelNames[\n]]
---

# $channelNames

La fonction `$channelNames` retourne la **liste complète des noms** de tous les salons du serveur, séparés par un délimiteur personnalisable.

## Syntaxe

```
$channelNames[(separator)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `separator` | Optionnel. Le séparateur entre chaque nom de salon. Par défaut : `, ` (virgule + espace). |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Tous les noms de salons concaténés avec le séparateur choisi. |

## Exemples

### Liste simple

```bdfd
$sendMessage[**Salons du serveur :** $channelNames]
```

### Liste avec retour à la ligne

```bdfd
$sendMessage[**Liste des salons :**
$channelNames[
]]
```

### Liste avec séparateur personnalisé

```bdfd
$sendMessage[Salons : $channelNames[ | ]]
```

### Compter les salons par nom

```bdfd
$sendMessage[Le serveur a $channelCount salons : $channelNames[, ]]
```

## Notes

- Seuls les salons visibles par le bot sont listés.
- Les catégories sont incluses dans la liste.
- Pour obtenir les IDs plutôt que les noms, utilisez plutôt une boucle avec `$findChannel`.
