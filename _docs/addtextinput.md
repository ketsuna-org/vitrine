---
layout: doc
title: $addTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addTextInput
syntax: $addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Ajoute un champ de saisie de texte directement dans un message (composant de message, non modal). Supporte les styles "short" et "paragraph".
---

# $addTextInput[] — Champ Texte dans un Message

`$addTextInput[]` ajoute un composant de saisie de texte directement dans un message Discord. Contrairement à `$addModalTextInput[]` qui nécessite un modal, cette fonction insère le champ texte comme composant interactif du message.

## Syntaxe

```
$addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `customId` | Oui | — | Identifiant unique du champ. |
| `label` | Oui | — | Texte de l'étiquette. |
| `style` | Non | `short` | `short` ou `paragraph`. |
| `placeholder` | Non | — | Texte indicatif. |
| `default` | Non | — | Valeur par défaut. |
| `required` | Non | `yes` | `yes` ou `no`. |
| `minLength` | Non | — | Nombre min de caractères. |
| `maxLength` | Non | — | Nombre max de caractères. |

## Valeur de retour

Ajoute le TextInput au message. La valeur saisie est récupérée via `$input[customId]` dans le handler d'interaction.

## Utilisation

### Champ de recherche

```bdfd
$title[Recherche]
$description[Entrez votre terme de recherche ci-dessous]
$addTextInput[query;Terme de recherche;short;Rechercher...;;yes;2;100]
$addButton[search;Rechercher;Primary;;search_action]
```

### Formulaire de feedback

```bdfd
$title[Feedback]
$description[Nous voulons votre avis !]
$addTextInput[name;Votre nom;short;Anonyme;;no;0;50]
$addTextInput[message;Votre message;paragraph;Écrivez votre feedback...;;yes;10;1000]
$addButton[submit;Envoyer;Success]
```

### Traitement de la réponse

```bdfd
$onInteraction[search_action]
$var[query;$input[query]]
$sendMessage[Résultats pour : **$var[query]**]
$endInteraction
```

## Différences avec $addModalTextInput[]

| Message TextInput | Modal TextInput |
|-------------------|-----------------|
| Directement dans le message | Dans un modal (pop-up) |
| Souvent accompagné de boutons | Soumis avec le bouton Submit du modal |
| Pas de limite de 5 composants | Limité à 5 composants par modal |

## Notes

- Le `customId` doit être unique au sein du message.
- La valeur est récupérée via `$input[customId]` dans un `$onInteraction`.
- `minLength` et `maxLength` sont validés côté client Discord.
- Label max 45 caractères, placeholder max 100 caractères.
