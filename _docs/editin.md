---
layout: doc
title: $editIn[]
translation_key: docs
category: "Embed & Message"
function_name: editIn
syntax: $editIn[duration;(messageId)]
description: Programme l'édition d'un message après un délai spécifié. Le message actuel sera remplacé par le nouveau contenu défini après le délai.
---

# $editIn[] — Édition Différée de Message

`$editIn[]` programme l'édition automatique d'un message après un délai donné. C'est utile pour créer des messages qui se mettent à jour, des compteurs, ou des transitions d'état.

## Syntaxe

```
$editIn[duration;(messageId)]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `duration` | Oui | Délai avant édition. Format : nombre + unité (`s`, `m`, `h`). |
| `messageId` | Non | ID du message cible. Si omis, le message courant. |

## Format de durée

| Format | Unité | Exemple |
|--------|-------|---------|
| `Xs` | Secondes | `5s`, `30s` |
| `Xm` | Minutes | `1m`, `10m` |
| `Xh` | Heures | `1h`, `2h` |

## Valeur de retour

Programme l'édition différée. Le nouveau contenu est défini après l'appel à `$editIn[]`.

## Utilisation

### Indicateur de chargement

```bdfd
$sendMessage[⏳ Traitement en cours...]
$editIn[3s]
$sendMessage[✅ Traitement terminé !]
```

### Compte à rebours

```bdfd
$sendMessage[Début dans 5 secondes...]
$editIn[1s]
$sendMessage[Début dans 4 secondes...]
$editIn[2s]
$sendMessage[Début dans 3 secondes...]
$editIn[3s]
$sendMessage[Début dans 2 secondes...]
$editIn[4s]
$sendMessage[Début dans 1 seconde...]
$editIn[5s]
$sendMessage[🚀 C'est parti !]
```

### Mise à jour après action

```bdfd
$sendMessage[Recherche en cours... 🔍]
$editIn[2s]
$title[Résultats de recherche]
$description[3 résultats trouvés pour "$var[query]"]
$color[#5865F2]
```

### Avec messageId spécifique

```bdfd
$var[msgId;$sendMessage[Statut : En attente...;yes]]
$editIn[10s;$var[msgId]]
$sendMessage[Statut : Complété ✅]
```

## Notes

- La durée maximale est généralement de 15 minutes (limitation BDFD/Discord).
- Le contenu après `$editIn[]` remplace entièrement le contenu du message cible.
- Si `messageId` est omis, le message en cours d'envoi est ciblé.
- Pour éditer uniquement l'embed sans toucher au texte, utilisez `$editEmbedIn[]`.
