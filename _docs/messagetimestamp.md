---
layout: doc
title: $messageTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageTimestamp
syntax: $messageTimestamp
description: Retourne le timestamp (horodatage) de création du message déclencheur.
returns:
  - type: timestamp (integer)
    description: Le timestamp Unix du message en millisecondes.
related:
  - $messageEditedTimestamp
  - $messageID
  - $message
  - $lastPinTimestamp
examples:
  - description: Timestamp du message
    code: $sendMessage[Timestamp : $messageTimestamp]
  - description: Date formatée
    code: $sendMessage[Envoyé le : $formatDate[$messageTimestamp;DD/MM/YYYY à HH:mm]]
---

# $messageTimestamp

La fonction `$messageTimestamp` retourne le **timestamp** (horodatage) de création du message déclencheur, en millisecondes depuis l'époque Unix.

## Syntaxe

```
$messageTimestamp
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | Timestamp Unix en millisecondes. |

## Exemples

### Afficher le timestamp brut

```bdfd
$sendMessage[Timestamp du message : $messageTimestamp]
```

### Formater la date

```bdfd
$sendMessage[Message envoyé le $formatDate[$messageTimestamp;DD/MM/YYYY à HH:mm:ss]]
```

### Calculer l'âge du message

```bdfd
$sendMessage[Âge du message : $truncate[$sub[$dateNow;$messageTimestamp]/1000] secondes.]
```

### Afficher en format relatif Discord

```bdfd
$sendMessage[Message envoyé <t:$truncate[$messageTimestamp/1000]:R>]
```

## Notes

- Le timestamp est retourné en **millisecondes**. Divisez par `1000` pour obtenir des secondes.
- À utiliser avec `$formatDate` pour un affichage lisible.
- `$dateNow` retourne le timestamp actuel, utile pour calculer des durées.
- Pour le timestamp d'édition, utilisez `$messageEditedTimestamp`.
