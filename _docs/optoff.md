---
layout: doc
title: $optOff
translation_key: docs
category: "Flags & Debug"
function_name: optOff
syntax: $optOff
description: Désactive l'optimisation du code pour la commande en cours. Tout le code est exécuté linéairement sans optimisation du parseur.
---
# $optOff

La fonction `$optOff` **désactive l'optimisation du code** pour la commande en cours. BDFD exécute alors le code de manière strictement linéaire.

## Syntaxe

```
$optOff
```

## Paramètres

Aucun.

## Valeur de retour

Aucune.

## Comportement

- Sans `$optOff`, BDFD peut réorganiser le code pour optimiser l'exécution.
- Avec `$optOff`, l'ordre d'exécution est exactement celui du code source.
- Utile quand l'optimisation cause des bugs d'ordre d'exécution.

## Exemples

### Forcer l'ordre d'exécution

```bdfd
$optOff
$var[x;1]
$sendMessage[x = $var[x]]
$var[x;2]
$sendMessage[x = $var[x]]
```

### Éviter les bugs d'optimisation

```bdfd
$optOff
$let[a;1]
$onlyIf[$let[a]!=;Valeur manquante]
$sendMessage[$let[a]]
```

## Notes

- Impacte les performances : n'utilisez que si nécessaire.
- Certaines fonctions complexes peuvent nécessiter `$optOff` pour fonctionner correctement.
- À placer au début de la commande.
