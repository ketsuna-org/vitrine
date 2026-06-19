---
layout: doc
title: $addModalTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextInput
syntax: $addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Ajoute un champ de saisie de texte à un modal Discord. Supporte les styles "short" (une ligne) et "paragraph" (multi-lignes).
parameters:
  - name: customId
    type: string
    required: true
    description: Identifiant unique du champ, utilisé pour récupérer la valeur soumise.
  - name: label
    type: string
    required: true
    description: Étiquette affichée au-dessus du champ de saisie.
  - name: style
    type: string
    required: false
    default: "short"
    description: Style du champ. "short" pour une ligne, "paragraph" pour texte multi-lignes.
  - name: placeholder
    type: string
    required: false
    description: Texte indicatif affiché dans le champ vide.
  - name: default
    type: string
    required: false
    description: Valeur par défaut pré-remplie dans le champ.
  - name: required
    type: string
    required: false
    default: "yes"
    description: "yes" si le champ est obligatoire, "no" sinon.
  - name: minLength
    type: integer
    required: false
    description: Longueur minimale du texte saisi.
  - name: maxLength
    type: integer
    required: false
    description: Longueur maximale du texte saisi.
returns:
  type: void
  description: Ajoute un TextInput au modal en cours de construction.
related:
  - newModal
  - addModalSelect
  - addTextInput
examples:
  - description: Champ court obligatoire
    code: |
      $addModalTextInput[name;Votre nom;short;Entrez votre nom...;;yes;2;50]
  - description: Champ paragraphe optionnel
    code: |
      $addModalTextInput[bio;Biographie;paragraph;Parlez-nous de vous...;;no;0;500]
  - description: Champ avec valeur par défaut
    code: |
      $addModalTextInput[email;Email;short;exemple@mail.com;user@domain.com;yes;5;100]
---

# $addModalTextInput[] — Champ Texte dans un Modal

`$addModalTextInput[]` ajoute un champ de saisie de texte à l'intérieur d'un modal préalablement initialisé avec `$newModal[]`. Discord supporte deux styles de champs texte : court (single-line) et paragraphe (multi-line).

## Syntaxe

```
$addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `customId` | Oui | — | Identifiant unique pour récupérer la valeur après soumission. |
| `label` | Oui | — | Texte de l'étiquette au-dessus du champ. |
| `style` | Non | `short` | `short` pour une ligne, `paragraph` pour multi-lignes. |
| `placeholder` | Non | — | Texte indicatif dans le champ vide. |
| `default` | Non | — | Valeur pré-remplie. |
| `required` | Non | `yes` | `yes` si obligatoire, `no` sinon. |
| `minLength` | Non | — | Nombre minimum de caractères. |
| `maxLength` | Non | — | Nombre maximum de caractères. |

## Valeur de retour

Ajoute le composant TextInput au modal en cours. La valeur saisie est accessible via `$input[customId]` dans le gestionnaire d'interaction du modal.

## Utilisation

### Champ court obligatoire

```bdfd
$newModal[Contact;contact_form]
$addModalTextInput[name;Nom complet;short;John Doe;;yes;2;50]
$addModalTextInput[email;Adresse email;short;contact@site.com;;yes;5;100]
```

### Zone de texte libre

```bdfd
$newModal[Feedback;feedback_form]
$addModalTextInput[comments;Vos commentaires;paragraph;Écrivez votre message ici...;;yes;10;1000]
```

### Champ optionnel avec placeholder

```bdfd
$newModal[Profil;profile_form]
$addModalTextInput[website;Site web;short;https://...;;no;0;200]
```

## Validation

- `minLength` et `maxLength` appliquent une validation côté client Discord.
- Si `required` est `yes`, le modal ne peut pas être soumis sans valeur.
- Les limites Discord : `label` max 45 caractères, `placeholder` max 100 caractères, `minLength` 0-4000, `maxLength` 1-4000.

## Notes

- Doit être appelé après `$newModal[]` et avant toute autre fonction qui finalise le modal.
- Le `customId` doit être unique au sein du modal.
- Maximum 5 lignes de composants (5 `$addModalTextInput`) par modal selon Discord.
