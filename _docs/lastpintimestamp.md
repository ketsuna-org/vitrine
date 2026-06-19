---
layout: doc
title: $lastPinTimestamp
translation_key: docs
category: "Entity Info"
function_name: lastPinTimestamp
syntax: $lastPinTimestamp[(channelID)]
description: Retourne le timestamp du dernier message épinglé dans le salon courant ou spécifié.
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon cible. Si omis, utilise le salon courant."
returns:
  - type: timestamp (integer) ou string vide
    description: Le timestamp Unix en millisecondes du dernier pin, ou "" si aucun message n'est épinglé.
related:
  - $lastMessageID
  - $messageTimestamp
  - $messageEditedTimestamp
examples:
  - description: Dernier pin du salon
    code: "$sendMessage[Dernier pin : $lastPinTimestamp]"
  - description: Vérifier si des messages épinglés
    code: |
      $if[$lastPinTimestamp!=]
        $sendMessage[Dernier pin le $formatDate[$lastPinTimestamp;DD/MM/YYYY à HH:mm]]
      $else
        $sendMessage[Aucun message épinglé.]
      $endif
---

# $lastPinTimestamp

La fonction `$lastPinTimestamp` retourne le **timestamp du dernier message épinglé** dans un salon Discord. Si aucun message n'est épinglé, elle retourne une chaîne vide.

## Syntaxe

```
$lastPinTimestamp[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `integer` ou `""` | Timestamp en millisecondes du dernier pin, ou chaîne vide si aucun. |

## Exemples

### Afficher la date du dernier pin

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Dernier message épinglé le $formatDate[$lastPinTimestamp;DD/MM/YYYY à HH:mm]]
$else
  $sendMessage[Aucun message épinglé dans ce salon.]
$endif
```

### Format relatif Discord

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Dernier pin <t:$truncate[$lastPinTimestamp/1000]:R>]
$endif
```

### Vérifier un autre salon

```bdfd
$if[$lastPinTimestamp[123456789012345678]!=]
  $sendMessage[Le salon a des messages épinglés.]
$endif
```

## Notes

- Le timestamp est en **millisecondes** (divisez par 1000 pour les secondes).
- Retourne une chaîne vide (`""`) si aucun message n'est épinglé.
- Utile pour vérifier l'activité d'épinglage dans un salon.
