---
layout: doc
title: $getSlowmode
translation_key: docs
category: "Server & Channels"
function_name: getSlowmode
syntax: $getSlowmode[(channelID)]
description: Récupère la valeur du mode lent (slowmode) d'un canal, en secondes. Retourne le délai minimum entre deux messages.
---
# $getSlowmode

La fonction `$getSlowmode[]` retourne la **valeur du mode lent** (slowmode) d'un canal, en secondes.

## Syntaxe

```
$getSlowmode[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | *(Optionnel)* ID du canal. Défaut : canal courant. |

## Valeur de retour

- **Type** : Nombre (chaîne)
- Le slowmode en secondes (`0`, `5`, `10`, `15`, `30`, `60`, `120`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `21600`).

## Exemples

### Vérification simple

```bdfd
$sendMessage[Slowmode actuel : $getSlowmode secondes]
```

### Comparaison

```bdfd
$if[$getSlowmode==0]
  $sendMessage[Ce canal n'a pas de slowmode.]
$else
  $sendMessage[Ce canal a un slowmode de $getSlowmode secondes.]
$endif
```

### Vérifier un autre canal

```bdfd
$sendMessage[Slowmode du canal de logs : $getSlowmode[123456789]s]
```

### Alerte si slowmode actif

```bdfd
$if[$getSlowmode>0]
  $title[⏱️ Canal en slowmode]
  $description[Le canal <#$channelID> a un slowmode de **$getSlowmode secondes**.]
  $color[#FEE75C]
  $sendMessage[]
$endif
```

## Notes

- `0` signifie slowmode désactivé.
- Les valeurs possibles sont limitées par Discord (5s, 10s, 15s, 30s, 1m, 2m, 5m, 10m, 15m, 30m, 1h, 2h, 6h).
- Pour modifier le slowmode, utilisez `$modifyChannel[]`.
