---
layout: doc
title: $roleNames
translation_key: docs
category: "Entity Info"
function_name: roleNames
syntax: $roleNames[(separator);(guildID)]
description: Retourne la liste de tous les noms de rôles du serveur, séparés par un délimiteur personnalisable.
---

# $roleNames

La fonction `$roleNames` retourne la **liste complète des noms** de tous les rôles du serveur, séparés par un délimiteur personnalisable.

## Syntaxe

```
$roleNames[(separator);(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `separator` | Optionnel. Le séparateur entre chaque nom de rôle. Par défaut : `, `. |
| `guildID` | Optionnel. L'ID du serveur cible. Par défaut : serveur courant. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Tous les noms de rôles concaténés avec le séparateur choisi. |

## Exemples

### Liste simple

```bdfd
$sendMessage[**Rôles du serveur :** $roleNames]
```

### Liste avec retours à la ligne

```bdfd
$sendMessage[**Liste des rôles :**
$roleNames[
]]
```

### Avec séparateur personnalisé

```bdfd
$sendMessage[Rôles : $roleNames[ | ]]
```

### Compter et lister

```bdfd
$sendMessage[Le serveur a $roleCount rôles : $roleNames[, ]]
```

## Notes

- Le rôle `@everyone` est généralement inclus dans la liste.
- Les rôles sont listés selon leur ordre hiérarchique (du plus haut au plus bas).
- Pour les IDs plutôt que les noms, utilisez une autre approche.
