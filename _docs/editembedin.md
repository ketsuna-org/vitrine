---
layout: doc
title: $editEmbedIn[]
translation_key: docs
category: "Embed & Message"
function_name: editEmbedIn
syntax: $editEmbedIn[duration]
description: Programme l'édition de l'embed d'un message après un délai spécifié. Contrairement à $editIn[], seul l'embed est modifié — le contenu texte du message reste inchangé.
parameters:
  - name: duration
    type: string
    required: true
    description: Délai avant édition de l'embed. Format : "5s", "1m", "2h".
returns:
  type: void
  description: Programme l'édition différée de l'embed du message courant.
related:
  - editIn
  - deleteIn
  - $editMessage
  - sendEmbedMessage
examples:
  - description: Mise à jour d'embed après 5 secondes
    code: |
      $title[Chargement...]
      $description[Patientez...]
      $editEmbedIn[5s]
      $title[Terminé]
      $description[Les données ont été chargées]
      $color[#2ECC71]
  - description: Transition de statut
    code: |
      $title[Statut : En cours]
      $color[#F1C40F]
      $editEmbedIn[3s]
      $title[Statut : Complété]
      $color[#2ECC71]
---

# $editEmbedIn[] — Édition Différée d'Embed

`$editEmbedIn[]` programme la mise à jour de l'embed d'un message après un délai. Seul l'embed est modifié — le texte du message (envoyé via `$sendMessage`) n'est pas affecté.

## Syntaxe

```
$editEmbedIn[duration]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `duration` | Oui | Délai avant édition. Format : nombre + unité. |

## Format de durée

| Format | Unité | Exemple |
|--------|-------|---------|
| `Xs` | Secondes | `3s`, `10s` |
| `Xm` | Minutes | `1m`, `5m` |
| `Xh` | Heures | `1h` |

## Valeur de retour

Programme l'édition différée de l'embed. Le nouvel embed est défini après l'appel à `$editEmbedIn[]`.

## Différence avec $editIn[]

| $editEmbedIn[] | $editIn[] |
|---------------|-----------|
| Modifie uniquement l'embed | Modifie tout le message (texte + embed) |
| Préserve le texte du message | Remplace tout le contenu |
| Idéal pour mises à jour visuelles | Idéal pour transitions complètes |

## Utilisation

### Indicateur de progression

```bdfd
$sendMessage[Mise à jour en cours...]
$title[Progression]
$description[🟡 Traitement des données...]
$color[#F1C40F]
$editEmbedIn[5s]
$title[Progression]
$description[🟢 Terminé avec succès !]
$color[#2ECC71]
```

### Changement de statut

```bdfd
$title[🔍 Recherche en cours]
$description[Analyse de la base de données...]
$color[#3498DB]
$footer[Patientez...]
$editEmbedIn[3s]
$title[✅ Recherche terminée]
$description[3 résultats trouvés]
$color[#2ECC71]
$footer[Terminé]
```

### Transition visuelle

```bdfd
$sendMessage[Préparation du rapport...]
$title[Rapport Mensuel]
$description[📊 Génération en cours...]
$color[#E67E22]
$editEmbedIn[5s]
$title[Rapport Mensuel - Juin 2026]
$description[✅ Rapport généré avec succès\n\n📈 Croissance : +15%\n💰 Revenus : 12 450€\n👥 Nouveaux membres : 230]
$color[#27AE60]
$footer[Généré le $date]
```

## Notes

- `$editEmbedIn[]` ne modifie que l'embed ; le contenu texte (premier argument de `$sendMessage`) reste intact.
- Le nouvel embed remplace entièrement l'ancien (pas de fusion).
- Pour modifier à la fois texte et embed, utilisez `$editIn[]`.
- La durée maximale est généralement de 15 minutes.
