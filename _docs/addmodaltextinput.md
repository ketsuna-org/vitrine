---
layout: doc
title: $addModalTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextInput
syntax: $addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Ajoute un champ de saisie de texte à un modal Discord. Supporte les styles "short" (une ligne) et "paragraph" (multi-lignes).
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
