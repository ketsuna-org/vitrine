---
layout: doc
title: $addModalTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextInput
syntax: $addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Adds a field of saisie of text to a modal Discord. Supports thes styles "short" (a row) and "paragraph" (multi-lignes).
---

# $addModalTextInput[] — Champ Text in a Modal

`$addModalTextInput[]` ajoute a field of saisie of text inside of a modal previously initialisé with `$newModal[]`. Discord supporte two styles of champs text : court (single-line) and paragraphe (multi-line).

## Syntax

```
$addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the value after soumission. |
| `label` | Yes | — | Text of l'label above of the field. |
| `style` | No | `short` | `short` pour a row, `paragraph` pour multi-lignes. |
| `placeholder` | No | — | Text indicatif in the champ vide. |
| `default` | No | — | Value pré-remplie. |
| `required` | No | `yes` | `yes` si required, `no` otherwise. |
| `minLength` | No | — | Minimum number of becauseactères. |
| `maxLength` | No | — | Maximum number of becauseactères. |

## Return value

Ajoute le composant TextInput to the modal in progress. The value saisie est accessible via `$input[customId]` in the gestionnaire of interaction of the modal.

## Usage

### Champ court required

```bdfd
$newModal[Contact;contact_form]
$addModalTextInput[name;Nom complete;short;John Doe;;yes;2;50]
$addModalTextInput[email;Adresse email;short;contact@site.com;;yes;5;100]
```

### Zone of text libre

```bdfd
$newModal[Feedback;feedback_form]
$addModalTextInput[comments;Vos commentaires;paragraph;Écrivez votre message ici...;;yes;10;1000]
```

### Champ optional with placeholder

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
- Le `customId` must be unique to the sein of the modal.
- Maximum 5 lignes of components (5 `$addModalTextInput`) par modal according to Discord.
