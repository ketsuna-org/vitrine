---
layout: doc
title: $addTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addTextInput
syntax: $addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Ajoute a field de saisie de text directly in a message (composant de message, non modal). Supporte les styles "short" and "paragraph".
---

# $addTextInput[] — Champ Text dans un Message

`$addTextInput[]` ajoute a component de saisie de text directly in a Discord message. Contrairement à `$addModalTextInput[]` qui requires a modal, cette function insère le champ text comme composant interactif of the message.

## Syntax

```
$addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the field. |
| `label` | Yes | — | Text de l'label. |
| `style` | No | `short` | `short` or `paragraph`. |
| `placeholder` | No | — | Text indicatif. |
| `default` | No | — | Value by default. |
| `required` | No | `yes` | `yes` or `no`. |
| `minLength` | No | — | Number min de becauseactères. |
| `maxLength` | No | — | Number max de becauseactères. |

## Return value

Ajoute le TextInput au message. The value saisie is retrievede via `$input[customId]` in the handler d'interaction.

## Usage

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

### Traitement de the response

```bdfd
$onInteraction[search_action]
$var[query;$input[query]]
$sendMessage[Results pour : **$var[query]**]
$endInteraction
```

## Différences avec $addModalTextInput[]

| Message TextInput | Modal TextInput |
|-------------------|-----------------|
| Directly in the message | Dans a modal (pop-up) |
| Souvent accompagné de buttons | Soumis with the bouton Submit of the modal |
| Pas de limit de 5 components | Limité à 5 components par modal |

## Notes

- Le `customId` must be unique au sein of the message.
- La value is retrievede via `$input[customId]` dans un `$onInteraction`.
- `minLength` and `maxLength` sont validés côté clinkt Discord.
- Label max 45 becauseactères, placeholder max 100 becauseactères.
