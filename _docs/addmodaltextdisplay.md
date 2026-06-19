---
layout: doc
title: $addModalTextDisplay[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextDisplay
syntax: $addModalTextDisplay[content]
description: Displays a text informatif static in a modal. Ce composant is not interactif — il serves only à présenter des instructions, descriptions or informations à the user.
---

# $addModalTextDisplay[] — Text d'Affichage dans un Modal

`$addModalTextDisplay[]` insère un bloc de text non interactif in a modal. This is l'équivaslow d'un paragraphe informatif — utile pour donner des instructions, séparer des sections, or afficher des informations contextuelles.

## Syntax

```
$addModalTextDisplay[content]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `content` | Yes | Le text to display. Supporte le markdown simple. |

## Return value

Ajoute a component d'affichage text au modal. Auca value interactive n'is returnede — ce composant ne produit no datas de formulaire.

## Usage

### Instructions générales

```bdfd
$newModal[Formulaire;form_modal]
$addModalTextDisplay[**Bienvenue !** Remplissez ce formulaire pour continuer.]
$addModalTextInput[name;Nom complete;short;;;yes;2;50]
```

### Sections avec separators

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
$addModalTextDisplay[Date de livreason estimée : $var[delivery_date]]
```

## Notes

- Le text supporte le formatage Discord : `**gras**`, `*italique*`, `__souligné__`, `~~barré~~`.
- Les emojis are supported.
- Ce composant ne produit no value dans `$input[]`.
- Ne compte pas dans the limit des 5 components interactifs (TextInput, Select) mais occupe un placeholder in the rangée de components of the modal.
