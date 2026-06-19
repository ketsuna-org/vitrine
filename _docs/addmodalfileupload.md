---
layout: doc
title: $addModalFileUpload[]
translation_key: docs
category: "Embed & Message"
function_name: addModalFileUpload
syntax: $addModalFileUpload[customId;label;(required)]
description: Ajoute un composant de téléversement de fichier à un modal Discord. Permet à l'utilisateur de joindre un fichier directement depuis le modal.
parameters:
  - name: customId
    type: string
    required: true
    description: Identifiant unique pour récupérer le fichier après soumission.
  - name: label
    type: string
    required: true
    description: Étiquette affichée au-dessus du champ de téléversement.
  - name: required
    type: string
    required: false
    default: "yes"
    description: "yes" si le fichier est obligatoire, "no" sinon.
returns:
  type: void
  description: Ajoute un composant de téléversement de fichier au modal.
related:
  - newModal
  - addFile
  - addModalTextInput
examples:
  - description: Upload de fichier obligatoire
    code: |
      $addModalFileUpload[document;Joindre un document;yes]
  - description: Upload optionnel
    code: |
      $addModalFileUpload[avatar;Photo de profil;no]
---

# $addModalFileUpload[] — Téléversement de Fichier dans un Modal

`$addModalFileUpload[]` ajoute un composant permettant à l'utilisateur de joindre un fichier directement depuis un modal Discord. Le fichier téléversé est ensuite accessible dans le gestionnaire d'interaction.

## Syntaxe

```
$addModalFileUpload[customId;label;(required)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `customId` | Oui | — | Identifiant unique du champ fichier. |
| `label` | Oui | — | Texte affiché au-dessus du champ. |
| `required` | Non | `yes` | `yes` si obligatoire, `no` sinon. |

## Valeur de retour

Ajoute le composant d'upload au modal. L'URL et les métadonnées du fichier sont accessibles via `$input[customId]` après soumission.

## Utilisation

### Upload obligatoire

```bdfd
$newModal[Candidature;apply_modal]
$addModalTextDisplay[Veuillez joindre votre CV au format PDF.]
$addModalTextInput[motivation;Lettre de motivation;paragraph;;;yes;50;1000]
$addModalFileUpload[cv;Votre CV (PDF);yes]
```

### Upload optionnel avec autres champs

```bdfd
$newModal[Signalement;report_modal]
$addModalTextInput[description;Description du problème;paragraph;;;yes;20;1000]
$addModalFileUpload[screenshot;Capture d'écran (optionnelle);no]
```

### Traitement du fichier

```bdfd
$onInteraction[apply_submit]
$var[cv_url;$input[cv]]
$var[motivation;$input[motivation]]
$sendMessage[Nouvelle candidature reçue !
CV : $var[cv_url]
Motivation : $var[motivation]]
$endInteraction
```

## Notes

- Le fichier est hébergé temporairement par Discord ; l'URL retournée est une URL CDN Discord.
- Le `customId` doit être unique au sein du modal.
- La taille maximale du fichier est déterminée par Discord (généralement 25 Mo selon le niveau de boost du serveur).
- Ce composant n'est disponible que dans les modals (pas dans les messages classiques).
