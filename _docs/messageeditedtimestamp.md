---
layout: doc
title: $messageEditedTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageEditedTimestamp
syntax: $messageEditedTimestamp
description: Retourne le timestamp de la dernière édition du message déclencheur, ou une chaîne vide si non édité.
returns:
  - type: timestamp (integer) ou string vide
    description: Le timestamp Unix de l'édition en millisecondes, ou "" si le message n'a jamais été édité.
related:
  - $messageTimestamp
  - $isMessageEdited
  - $messageID
  - $message
examples:
  - description: Timestamp d'édition
    code: $sendMessage[Édité le : $messageEditedTimestamp]
  - description: Vérifier si édité
    code: |
      $if[$messageEditedTimestamp!=]
        $sendMessage[Message édité le $formatDate[$messageEditedTimestamp;DD/MM/YYYY à HH:mm]]
      $else
        $sendMessage[Message non édité.]
      $endif
---

# $messageEditedTimestamp

La fonction `$messageEditedTimestamp` retourne le **timestamp de la dernière édition** du message déclencheur. Si le message n'a jamais été édité, elle retourne une chaîne vide.

## Syntaxe

```
$messageEditedTimestamp
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `integer` ou `""` | Timestamp en millisecondes, ou chaîne vide si le message n'a pas été édité. |

## Exemples

### Afficher la date d'édition

```bdfd
$if[$messageEditedTimestamp!=]
  $sendMessage[Message édité le $formatDate[$messageEditedTimestamp;DD/MM/YYYY à HH:mm]]
$else
  $sendMessage[Message original (non édité).]
$endif
```

### Afficher en format relatif

```bdfd
$if[$messageEditedTimestamp!=]
  $sendMessage[Édité <t:$truncate[$messageEditedTimestamp/1000]:R>]
$endif
```

### Log des éditions

```bdfd
$if[$messageEditedTimestamp!=]
  $channelSendMessage[$channelIDFromName[logs];$username a édité son message (ID: $messageID) le $formatDate[$messageEditedTimestamp;DD/MM/YYYY HH:mm]]
$endif
```

## Notes

- Retourne une chaîne **vide** (`""`) si jamais édité, pas `0`.
- Utilisez `$isMessageEdited` pour un test booléen plus simple.
- Le timestamp est en millisecondes ; divisez par `1000` pour les secondes.
