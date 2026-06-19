---
layout: doc
title: $executionTime
translation_key: docs
category: "Entity Info"
function_name: executionTime
syntax: $executionTime
description: Retourne le temps d'exécution de la commande actuelle en millisecondes. Permet de mesurer les performances du code BDFD.
---

# $executionTime

La fonction `$executionTime` permet de **mesurer le temps d'exécution** total de la commande en cours, en millisecondes.

## Syntaxe

```
$executionTime
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String (nombre)
- Le temps d'exécution en millisecondes (ms).
- Inclut le temps de traitement de l'ensemble de la commande (parsing + exécution).

## Comportement

- Mesure le temps écoulé depuis le début du traitement de la commande jusqu'à l'appel de la fonction.
- Utile pour le débogage et l'optimisation des performances.
- La valeur est un entier représentant les millisecondes.

## Exemples

### Affichage simple

```bdfd
$title[⚡ Performance]
$description[
**Temps d'exécution :** $executionTime ms
**Ping API :** $botPing ms
]
$color[#5865F2]
$sendMessage[]
```

### Footer dynamique

```bdfd
$title[📊 Statistiques]
$description[Commande complexe avec beaucoup de données...]
$footer[⏱️ Exécuté en $executionTime ms]
$color[#57F287]
$sendMessage[]
```

### Condition de lenteur

```bdfd
$if[$executionTime>1000]
  $sendMessage[⚠️ Cette commande est lente (>1s). Optimisation recommandée.]
$else
  $sendMessage[✅ Performance normale : $executionTime ms]
$endif
```

## Notes

- Le temps mesuré dépend de la complexité de la commande et de la latence réseau.
- `$executionTime` mesure le temps côté bot, pas la latence utilisateur.
- Pour la latence WebSocket/API, utilisez `$botPing` ou `$ping`.
