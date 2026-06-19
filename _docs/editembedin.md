---
layout: doc
title: $editEmbedIn[]
translation_key: docs
category: "Embed & Message"
function_name: editEmbedIn
syntax: $editEmbedIn[duration]
description: Programme l'édition of the embed of a message after a delay spécifié. Contrairement to $editIn[], seul the embed est modified — le contenu text of the message reste inchangé.
---

# $editEmbedIn[] — Édition Différée of Embed

`$editEmbedIn[]` programme la mise to day of the embed of a message after a delay. Seul the embed est modified — le text of the message (sent via `$sendMessage`) is not affecté.

## Syntax

```
$editEmbedIn[duration]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `duration` | Yes | Delay before édition. Format : number + unité. |

## Format of durée

| Format | Unité | Example |
|--------|-------|---------|
| `Xs` | Secondes | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |
| `Xh` | Times | `1h` |

## Return value

Programme l'édition différée of the embed. The new embed est set after the call to `$editEmbedIn[]`.

## Difference from $editIn[]

| $editEmbedIn[] | $editIn[] |
|---------------|-----------|
| Modifies only the embed | Modifies tout the message (text + embed) |
| Préserve le text of the message | Remplace tout le contenu |
| Idéal pour mises to day visualles | Idéal pour transitions completes |

## Usage

### Progress indicator

```bdfd
$sendMessage[Mise to day in progress...]
$title[Progression]
$description[🟡 Traitement of data...]
$color[#F1C40F]
$editEmbedIn[5s]
$title[Progression]
$description[🟢 Terminé with success !]
$color[#2ECC71]
```

### Changement of status

```bdfd
$title[🔍 Recherche in progress]
$description[Analyse of la base of datas...]
$color[#3498DB]
$footer[Patientez...]
$editEmbedIn[3s]
$title[✅ Recherche terminée]
$description[3 results founds]
$color[#2ECC71]
$footer[Terminé]
```

### Transition visualle

```bdfd
$sendMessage[Préparation of the rapport...]
$title[Rapport Mensuel]
$description[📊 Génération in progress...]
$color[#E67E22]
$editEmbedIn[5s]
$title[Rapport Mensuel - Juin 2026]
$description[✅ Rapport generated with success\n\n📈 Croissance : +15%\n💰 Revenus : 12 450€\n👥 Newx members : 230]
$color[#27AE60]
$footer[Generated le $date]
```

## Notes

- `$editEmbedIn[]` ne modifie que the embed ; le contenu text (first argument of `$sendMessage`) reste intact.
- Le new embed remplace entièrement l'old (no fusion).
- To modify to la fois text and embed, use `$editIn[]`.
- The duration maximale est generally of 15 minutes.
