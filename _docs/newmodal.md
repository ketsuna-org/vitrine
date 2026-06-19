---
layout: doc
title: $newModal[]
translation_key: docs
category: "Embed & Message"
function_name: newModal
syntax: $newModal[title;customId]
description: Creates a new modal (fenêtre pop-up interactive) with a titre and un identifier custom pour gérer les soumissions.
---

# $newModal[] — Create a Modal

The function `$newModal[]` initialise un new modal Discord. A modal est une fenêtre pop-up interactive qui se superpose to l'interface user. Il must be le first call before of ajouter components tels que champs text, sélecteurs or cases to cocher.

## Syntax

```
$newModal[title;customId]
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `title` | Le titre displayed en haut of the modal. Required. |
| `customId` | Identifier unique custom for the modal. Utilisé in thes interactions pour identifier quel modal was soumis. Required. |

## Return Value

This function ne retourne pas of value directly. Elle initialise un context internal in thequel les functions of ajout of components (`$addModalTextInput`, `$addModalSelect`, etc.) opèrent.

## Utilisation

### Modal of base

```bdfd
$newModal[Inscription;signup_modal]
$addModalTextInput[username;Nom of user;short;Entrez votre pseudo...;;yes;3;32]
$addModalTextInput[email;Email;short;exemple@email.com;;yes;5;100]
```

### Modal with affichage text

```bdfd
$newModal[Confirmation;confirm_modal]
$addModalTextDisplay[Veuillez check thes information before of confirmer.]
$addModalTextInput[code;Code of vérification;short;XXXX;;yes;4;4]
```

### Modal sent via une command slash or un bouton

```bdfd
$newModal[Avis produit;review_modal]
$addModalTextInput[rating;Note (1-5);short;;1;;1;1]
$addModalTextInput[review;Votre avis;paragraph;Partagez votre expérience...;;yes;10;500]
```

## Notes importantes

- `$newModal[]` must be la **first** function callée in the construction of un modal.
- Tous les components ajoutés after `$newModal[]` appartiennent to ce modal until ce qu'un new `$newModal[]` soit callé.
- Le `customId` est essentiel pour traiter les datas soumises in a gestionnaire of interaction.
- Les modals sont generally triggereds via interactions (buttons, commands slash, menus).
