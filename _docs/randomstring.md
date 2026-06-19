---
layout: doc
title: $randomString[]
translation_key: docs
category: "Math & Text"
function_name: randomString
syntax: $randomString[length]
description: Génère une chaîne alphanumérique aléatoire de la longueur spécifiée.
---

# $randomString[]

La fonction `$randomString[]` génère une chaîne de caractères alphanumériques aléatoire d'une longueur donnée.

## Syntaxe

```
$randomString[length]
```

## Paramètres

| Paramètre | Description |
|-----------|-------------|
| `length` | La longueur de la chaîne aléatoire à générer (en nombre de caractères). |

## Valeur de retour

Une chaîne de caractères alphanumériques aléatoires contenant :
- Des lettres minuscules (a-z)
- Des lettres majuscules (A-Z)
- Des chiffres (0-9)

## Exemples

### Générer un identifiant unique

```bdfd
$title[Votre ID de session]
$description[ID : `$randomString[8]`]
$footer[Conservez cet identifiant]
```

### Code de vérification

```bdfd
Votre code de vérification est : **$randomString[6]**
```

### Token d'accès

```bdfd
$randomString[32]
```

## Cas d'usage

- Génération d'identifiants uniques pour des tickets, sessions ou clés.
- Création de codes de vérification ou de mots de passe temporaires.
- Génération de tokens aléatoires.
