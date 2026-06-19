---
layout: doc
title: $addTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addTextInput
syntax: $addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Adds a field of saisie of text directly in a message (composant of message, non modal). Supports thes styles "short" and "paragraph".
---

# $addTextInput[] — Champ Text in a Message

`$addTextInput[]` ajoute a component of saisie of text directly in a Discord message. Contrairement to `$addModalTextInput[]` qui requires a modal, cette function insère le champ text like composant interactif of the message.

## Syntax

```
$addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the field. |
| `label` | Yes | — | Text of l'label. |
| `style` | No | `short` | `short` or `paragraph`. |
| `placeholder` | No | — | Text indicatif. |
| `default` | No | — | Value by default. |
| `required` | No | `yes` | `yes` or `no`. |
| `minLength` | No | — | Number min of becauseactères. |
| `maxLength` | No | — | Number max of becauseactères. |

## Return value

Ajoute le TextInput to the message. The value saisie is retrievede via `$input[customId]` in the handler of interaction.

## Usage

### Champ of recherche

```bdfd
$title[Recherche]
$description[Entrez votre terme of recherche ci-dessous]
$addTextInput[query;Terme of recherche;short;Rechercher...;;yes;2;100]
$addButton[search;Rechercher;Primary;;search_action]
```

### Formulaire of feedback

```bdfd
$title[Feedback]
$description[Nous voulons votre avis !]
$addTextInput[name;Votre nom;short;Anonyme;;no;0;50]
$addTextInput[message;Votre message;paragraph;Écrivez votre feedback...;;yes;10;1000]
$addButton[submit;Envoyer;Success]
```

### Traitement of the response

```bdfd
$onInteraction[search_action]
$var[query;$input[query]]
$sendMessage[Results pour : **$var[query]**]
$endInteraction
```

## Différences with $addModalTextInput[]

| Message TextInput | Modal TextInput |
|-------------------|-----------------|
| Directly in the message | Dans a modal (pop-up) |
| Souvent accompagné of buttons | Soumis with the bouton Submit of the modal |
| Pas of limit of 5 components | Limité to 5 components par modal |

## Notes

- Le `customId` must be unique to the sein of the message.
- La value is retrievede via `$input[customId]` in a `$onInteraction`.
- `minLength` and `maxLength` sont validés côté clinkt Discord.
- Label max 45 becauseactères, placeholder max 100 becauseactères.
