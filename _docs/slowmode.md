---
layout: doc
title: $slowmode
translation_key: docs
category: "Entity Info"
function_name: slowmode
syntax: $slowmode[(channelID)]
description: Retourne le délai de slowmode (mode lent) actuel d'un salon Discord, en secondes. Fonction en lecture seule (getter).
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon cible. Si omis, utilise le salon courant."
returns:
  - type: integer
    description: Le délai de slowmode en secondes (0, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200, 21600).
related:
  - $channelID
  - $channelTopic
examples:
  - description: Slowmode du salon courant
    code: $sendMessage[Slowmode : $slowmode secondes]
  - description: Vérifier si slowmode actif
    code: |
      $if[$slowmode>0]
        $sendMessage[Mode lent : $slowmode secondes entre chaque message.]
      $else
        $sendMessage[Pas de mode lent dans ce salon.]
      $endif
---

# $slowmode

La fonction `$slowmode` retourne le **délai de slowmode** (mode lent) actuel d'un salon Discord, exprimé en secondes. C'est une fonction en **lecture seule** (getter).

## Syntaxe

```
$slowmode[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | Le délai en secondes. `0` signifie pas de slowmode. |

## Valeurs possibles

Discord autorise les slowmodes suivants (en secondes) : `0`, `5`, `10`, `15`, `30`, `60`, `120`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `21600`.

## Exemples

### Afficher le slowmode

```bdfd
$sendMessage[Mode lent actuel : $slowmode seconde(s)]
```

### Vérifier si le slowmode est actif

```bdfd
$if[$slowmode>0]
  $sendMessage[⏳ Ce salon a un mode lent de $slowmode seconde(s).]
$else
  $sendMessage[Pas de mode lent dans ce salon.]
$endif
```

### Alerter si slowmode élevé

```bdfd
$if[$slowmode>=300]
  $sendMessage[⚠️ Attention, ce salon a un slowmode très élevé ($slowmode secondes).]
$endif
```

## Notes

- `$slowmode` est un **getter** : il ne modifie pas le slowmode.
- Retourne `0` si le salon n'a pas de slowmode.
- Ne fonctionne que sur les salons textuels.
