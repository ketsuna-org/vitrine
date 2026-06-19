---
layout: doc
title: $color[]
translation_key: docs
category: "Embed & Message"
function_name: color
syntax: $color[hexColor;(embedIndex)]
description: Définit la couleur de la barre latérale gauche d'un embed Discord. La couleur peut être spécifiée en hexadécimal ou en entier décimal.
parameters:
  - name: hexColor
    description: Couleur au format hexadécimal (ex: "FF0000" pour rouge, "#5865F2" pour le bleu Discord) ou entier décimal.
  - name: embedIndex
    description: "Optionnel. Index de l'embed ciblé (défaut : 0)."
returns:
  - type: void
    description: Modifie la réponse en cours de construction.
related:
  - $title[]
  - $description[]
  - $sendMessage[]
examples:
  - description: Embed avec la couleur bleue Discord
    code: |
      $title[Annonce]
      $description[Ceci est une annonce importante.]
      $color[#5865F2]
  - description: Couleur rouge en hexadécimal
    code: $color[FF0000]
  - description: Couleur en entier décimal (vert)
    code: $color[3066993]
---

# $color[]

La fonction `$color[]` définit la **couleur** de la barre latérale gauche d'un embed Discord. Cette barre colorée permet de catégoriser visuellement vos embeds (succès, erreur, info, etc.).

## Syntaxe

```
$color[hexColor;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `hexColor` | Code couleur au format hexadécimal (`FF0000`, `#5865F2`) ou entier décimal. |
| `embedIndex` | Optionnel. Index de l'embed à modifier (0 par défaut). |

## Valeur de retour

Cette fonction ne retourne rien : elle modifie la réponse en cours de construction.

## Formats acceptés

| Format | Exemple | Résultat |
|---|---|---|
| Hexadécimal avec # | `#5865F2` | Bleu Discord |
| Hexadécimal sans # | `5865F2` | Bleu Discord |
| Entier décimal | `5793266` | Bleu Discord |

## Couleurs courantes

| Nom | Code hex | Entier |
|---|---|---|
| Bleu Discord | `#5865F2` | 5793266 |
| Rouge | `#ED4245` | 15548997 |
| Vert | `#57F287` | 5763719 |
| Jaune | `#FEE75C` | 16705372 |
| Orange | `#F26522` | 15878690 |
| Blanc | `#FFFFFF` | 16777215 |
| Noir | `#000000` | 0 |

## Exemples

### Embed bleu (information)

```bdfd
$title[Information]
$description[Votre profil a été mis à jour.]
$color[#5865F2]
$sendMessage[]
```

### Embed rouge (erreur)

```bdfd
$title[Erreur]
$description[Vous n'avez pas la permission d'utiliser cette commande.]
$color[#ED4245]
$sendMessage[]
```

### Embed vert (succès)

```bdfd
$title[Succès]
$description[L'opération a été effectuée avec succès !]
$color[#57F287]
$sendMessage[]
```

## Notes

- Si `$color[]` n'est pas appelé, l'embed n'aura pas de barre de couleur (barre transparente).
- Le préfixe `#` est optionnel.
- Les lettres hexadécimales ne sont pas sensibles à la casse : `#ff0000` équivaut à `#FF0000`.
