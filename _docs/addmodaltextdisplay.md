---
layout: doc
title: $addModalTextDisplay[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextDisplay
syntax: $addModalTextDisplay[content]
description: Displays a text informatif static in a modal. Ce composant is not interactif — il serves only to présenter instructions, descriptions or information to the user.
---

# $addModalTextDisplay[] — Text of Affichage in a Modal

`$addModalTextDisplay[]` insère un bloc of text non interactif in a modal. This is l'équivaslow of un paragraphe informatif — utile pour donner instructions, separate sections, or display information contextuelles.

## Syntax

```
$addModalTextDisplay[content]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `content` | Yes | Le text to display. Supports the markdown simple. |

## Return value

Ajoute a component of affichage text to the modal. Auca value interactive n'is returnede — ce composant ne produit no datas of formulaire.

## Usage

### Instructions générales

```bdfd
$newModal[Formulaire;form_modal]
$addModalTextDisplay[**Bienvenue !** Remplissez ce formulaire pour continuer.]
$addModalTextInput[name;Nom complete;short;;;yes;2;50]
```

### Sections with separators

```bdfd
$newModal[Inscription complete;full_register]
$addModalTextDisplay[__Section 1 : Identité__]
$addModalTextInput[firstname;Prénom;short;;;yes;2;30]
$addModalTextInput[lastname;Nom;short;;;yes;2;30]

$addModalTextDisplay[__Section 2 : Contact__]
$addModalTextInput[email;Email;short;;;yes;5;100]
$addModalTextInput[phone;Téléphone;short;;;no;10;15]
```

### Avertissements and notes

```bdfd
$newModal[Suppression;delete_modal]
$addModalTextDisplay[⚠️ **Warning:** Cette action est irréversible !]
$addModalTextDisplay[Toutes vos datas will be deletedes permanently.]
$addModalTextInput[confirm;Tapez CONFIRMER pour continuer;short;;;yes;8;8]
```

### Avec variables dynamics

```bdfd
$newModal[Confirmation;confirm_modal]
$addModalTextDisplay[Vous allez acheter **$var[product_name]** pour **$var[price]€**.]
$addModalTextDisplay[Date of livreason estimée : $var[delivery_date]]
```

## Notes

- Le text supporte le formatage Discord : `**gras**`, `*italique*`, `__souligné__`, `~~barré~~`.
- Les emojis are supported.
- Ce composant ne produit no value in `$input[]`.
- Ne compte pas in the limit 5 components interactifs (TextInput, Select) mais occupe un placeholder in the rangée of components of the modal.
