---
layout: doc
title: $newModal[]
translation_key: docs
category: "Embed & Message"
function_name: newModal
syntax: $newModal[title;customId]
description: Creates a new modal (fenêtre pop-up interactive) with a titre and un identifier custom pour gérer les soumissions.
---

# $newModal[] — Créer un Modal

The function `$newModal[]` initialise un new modal Discord. A modal est une fenêtre pop-up interactive qui se superpose à l'interface user. Il must be le first call before d'ajouter des components tels que des champs text, des sélecteurs or des cases à cocher.

## Syntax

```
$newModal[title;customId]
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `title` | Le titre displayed en haut du modal. Required. |
| `customId` | Identifier unique custom for the modal. Utilisé in thes interactions pour identifier quel modal was soumis. Required. |

## Return Value

This function ne retourne pas de value directly. Elle initialise un context internal in thequel les functions d'ajout de components (`$addModalTextInput`, `$addModalSelect`, etc.) opèrent.

## Utilisation

### Modal de base

```bdfd
$newModal[Inscription;signup_modal]
$addModalTextInput[username;Nom d'user;short;Entrez votre pseudo...;;yes;3;32]
$addModalTextInput[email;Email;short;exemple@email.com;;yes;5;100]
```

### Modal avec affichage text

```bdfd
$newModal[Confirmation;confirm_modal]
$addModalTextDisplay[Veuillez vérifier les informations before de confirmer.]
$addModalTextInput[code;Code de vérification;short;XXXX;;yes;4;4]
```

### Modal sent via une command slash or un bouton

```bdfd
$newModal[Avis produit;review_modal]
$addModalTextInput[rating;Note (1-5);short;;1;;1;1]
$addModalTextInput[review;Votre avis;paragraph;Partagez votre expérience...;;yes;10;500]
```

## Notes importantes

- `$newModal[]` must be la **first** function callée in the construction d'un modal.
- Tous les components ajoutés after `$newModal[]` appartiennent à ce modal until ce qu'un new `$newModal[]` soit callé.
- Le `customId` est essentiel pour traiter les datas soumises dans un gestionnaire d'interaction.
- Les modals sont generally déclenchés via des interactions (buttons, commands slash, menus).
