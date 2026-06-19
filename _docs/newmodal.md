---
layout: doc
title: $newModal[]
translation_key: docs
category: "Embed & Message"
function_name: newModal
syntax: $newModal[title;customId]
description: Crée un nouveau modal (fenêtre pop-up interactive) avec un titre et un identifiant personnalisé pour gérer les soumissions.
parameters:
  - name: title
    type: string
    required: true
    description: Le titre affiché en haut du modal.
  - name: customId
    type: string
    required: true
    description: Identifiant unique utilisé pour identifier les interactions avec ce modal.
returns:
  type: void
  description: Initialise un nouveau contexte de modal. Les composants suivants ($addModalTextInput, $addModalSelect, etc.) sont ajoutés à ce modal.
related:
  - addModalTextInput
  - addModalSelect
  - addModalCheckbox
  - addModalCheckboxGroup
  - addModalRadioGroup
  - addModalTextDisplay
  - addModalFileUpload
examples:
  - description: Créer un modal simple avec un champ texte
    code: |
      $newModal[Formulaire d'inscription;register_form]
      $addModalTextInput[name;Votre nom;short;Entrez votre nom...;;yes;2;50]
  - description: Modal avec titre et composants multiples
    code: |
      $newModal[Sondage;poll_modal]
      $addModalTextDisplay[Répondez aux questions suivantes :]
      $addModalTextInput[answer;Votre réponse;paragraph;Écrivez ici...]
  - description: Modal complet avec validation
    code: |
      $newModal[Feedback;feedback_modal]
      $addModalTextDisplay[Merci de nous donner votre avis !]
      $addModalTextInput[subject;Sujet;short;;;yes;3;100]
      $addModalTextInput[message;Message;paragraph;;;yes;10;1000]
---

# $newModal[] — Créer un Modal

La fonction `$newModal[]` initialise un nouveau modal Discord. Un modal est une fenêtre pop-up interactive qui se superpose à l'interface utilisateur. Il doit être le premier appel avant d'ajouter des composants tels que des champs texte, des sélecteurs ou des cases à cocher.

## Syntaxe

```
$newModal[title;customId]
```

## Paramètres

| Paramètre | Description |
|-----------|-------------|
| `title` | Le titre affiché en haut du modal. Obligatoire. |
| `customId` | Identifiant unique personnalisé pour le modal. Utilisé dans les interactions pour identifier quel modal a été soumis. Obligatoire. |

## Valeur de retour

Cette fonction ne retourne pas de valeur directement. Elle initialise un contexte interne dans lequel les fonctions d'ajout de composants (`$addModalTextInput`, `$addModalSelect`, etc.) opèrent.

## Utilisation

### Modal de base

```bdfd
$newModal[Inscription;signup_modal]
$addModalTextInput[username;Nom d'utilisateur;short;Entrez votre pseudo...;;yes;3;32]
$addModalTextInput[email;Email;short;exemple@email.com;;yes;5;100]
```

### Modal avec affichage texte

```bdfd
$newModal[Confirmation;confirm_modal]
$addModalTextDisplay[Veuillez vérifier les informations avant de confirmer.]
$addModalTextInput[code;Code de vérification;short;XXXX;;yes;4;4]
```

### Modal envoyé via une commande slash ou un bouton

```bdfd
$newModal[Avis produit;review_modal]
$addModalTextInput[rating;Note (1-5);short;;1;;1;1]
$addModalTextInput[review;Votre avis;paragraph;Partagez votre expérience...;;yes;10;500]
```

## Notes importantes

- `$newModal[]` doit être la **première** fonction appelée dans la construction d'un modal.
- Tous les composants ajoutés après `$newModal[]` appartiennent à ce modal jusqu'à ce qu'un nouveau `$newModal[]` soit appelé.
- Le `customId` est essentiel pour traiter les données soumises dans un gestionnaire d'interaction.
- Les modals sont généralement déclenchés via des interactions (boutons, commandes slash, menus).
