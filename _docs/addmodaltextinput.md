---
layout: doc
title: $addModalTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextInput
syntax: $addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Ajoute a field de saisie de text à a modal Discord. Supporte les styles "short" (a row) and "paragraph" (multi-lignes).
---

# $addModalTextInput[] — Champ Text dans un Modal

`$addModalTextInput[]` ajoute a field de saisie de text inside d'a modal previously initialisé avec `$newModal[]`. Discord supporte two styles de champs text : court (single-line) and paragraphe (multi-line).

## Syntax

```
$addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the value after soumission. |
| `label` | Yes | — | Text de l'label above of the field. |
| `style` | No | `short` | `short` pour a row, `paragraph` pour multi-lignes. |
| `placeholder` | No | — | Text indicatif in the champ vide. |
| `default` | No | — | Value pré-remplie. |
| `required` | No | `yes` | `yes` si required, `no` otherwise. |
| `minLength` | No | — | Minimum number de becauseactères. |
| `maxLength` | No | — | Maximum number de becauseactères. |

## Return value

Ajoute le composant TextInput au modal in progress. The value saisie est accessible via `$input[customId]` in the gestionnaire d'interaction of the modal.

## Usage

### Champ court required

```bdfd
$newModal[Contact;contact_form]
$addModalTextInput[name;Nom complete;short;John Doe;;yes;2;50]
$addModalTextInput[email;Adresse email;short;contact@site.com;;yes;5;100]
```

### Zone de text libre

```bdfd
$newModal[Feedback;feedback_form]
$addModalTextInput[comments;Vos commentaires;paragraph;Écrivez votre message ici...;;yes;10;1000]
```

### Champ optional avec placeholder

```bdfd
$newModal[Profil;profile_form]
$addModalTextInput[website;Site web;short;https://...;;no;0;200]
```

## Validation

- `minLength` and `maxLength` appliquent une validation côté clinkt Discord.
- Si `required` est `yes`, le modal cannot être soumis without value.
- Les limits Discord : `label` max 45 becauseactères, `placeholder` max 100 becauseactères, `minLength` 0-4000, `maxLength` 1-4000.

## Notes

- Doit être called after `$newModal[]` and before toute autre function qui finalise le modal.
- Le `customId` must be unique au sein of the modal.
- Maximum 5 lignes de components (5 `$addModalTextInput`) par modal selon Discord.
