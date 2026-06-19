---
layout: doc
title: $addModalTextDisplay[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextDisplay
syntax: $addModalTextDisplay[content]
description: Affiche un texte informatif statique dans un modal. Ce composant n'est pas interactif — il sert uniquement à présenter des instructions, descriptions ou informations à l'utilisateur.
parameters:
  - name: content
    type: string
    required: true
    description: Le texte à afficher. Supporte le formatage Discord (markdown) basique.
returns:
  type: void
  description: Ajoute un bloc de texte statique au modal en cours.
related:
  - newModal
  - addModalTextInput
examples:
  - description: Instructions dans un modal
    code: |
      $addModalTextDisplay[Veuillez remplir tous les champs ci-dessous. Les champs marqués d'un * sont obligatoires.]
  - description: Plusieurs blocs de texte
    code: |
      $addModalTextDisplay[**Étape 1 :** Informations personnelles]
      $addModalTextInput[name;Nom;short;;;;yes]
      $addModalTextDisplay[**Étape 2 :** Préférences]
      $addModalTextInput[color;Couleur préférée;short]
---

# $addModalTextDisplay[] — Texte d'Affichage dans un Modal

`$addModalTextDisplay[]` insère un bloc de texte non interactif dans un modal. C'est l'équivalent d'un paragraphe informatif — utile pour donner des instructions, séparer des sections, ou afficher des informations contextuelles.

## Syntaxe

```
$addModalTextDisplay[content]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `content` | Oui | Le texte à afficher. Supporte le markdown simple. |

## Valeur de retour

Ajoute un composant d'affichage texte au modal. Aucune valeur interactive n'est retournée — ce composant ne produit pas de données de formulaire.

## Utilisation

### Instructions générales

```bdfd
$newModal[Formulaire;form_modal]
$addModalTextDisplay[**Bienvenue !** Remplissez ce formulaire pour continuer.]
$addModalTextInput[name;Nom complet;short;;;yes;2;50]
```

### Sections avec séparateurs

```bdfd
$newModal[Inscription complète;full_register]
$addModalTextDisplay[__Section 1 : Identité__]
$addModalTextInput[firstname;Prénom;short;;;yes;2;30]
$addModalTextInput[lastname;Nom;short;;;yes;2;30]

$addModalTextDisplay[__Section 2 : Contact__]
$addModalTextInput[email;Email;short;;;yes;5;100]
$addModalTextInput[phone;Téléphone;short;;;no;10;15]
```

### Avertissements et notes

```bdfd
$newModal[Suppression;delete_modal]
$addModalTextDisplay[⚠️ **Attention :** Cette action est irréversible !]
$addModalTextDisplay[Toutes vos données seront supprimées définitivement.]
$addModalTextInput[confirm;Tapez CONFIRMER pour continuer;short;;;yes;8;8]
```

### Avec variables dynamiques

```bdfd
$newModal[Confirmation;confirm_modal]
$addModalTextDisplay[Vous allez acheter **$var[product_name]** pour **$var[price]€**.]
$addModalTextDisplay[Date de livraison estimée : $var[delivery_date]]
```

## Notes

- Le texte supporte le formatage Discord : `**gras**`, `*italique*`, `__souligné__`, `~~barré~~`.
- Les emojis sont supportés.
- Ce composant ne produit pas de valeur dans `$input[]`.
- Ne compte pas dans la limite des 5 composants interactifs (TextInput, Select) mais occupe un emplacement dans la rangée de composants du modal.
