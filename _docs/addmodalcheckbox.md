---
layout: doc
title: $addModalCheckbox[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckbox
syntax: $addModalCheckbox[customId;label;(default)]
description: Ajoute une case à cocher individuelle à un modal Discord.
parameters:
  - name: customId
    type: string
    required: true
    description: Identifiant unique de la case à cocher.
  - name: label
    type: string
    required: true
    description: Texte affiché à côté de la case à cocher.
  - name: default
    type: string
    required: false
    default: "no"
    description: État par défaut. "yes" pour cochée, "no" pour décochée.
returns:
  type: void
  description: Ajoute une case à cocher simple au modal en cours.
related:
  - newModal
  - addModalCheckboxGroup
  - addCheckboxGroupOption
examples:
  - description: Case à cocher simple
    code: |
      $addModalCheckbox[newsletter;S'abonner à la newsletter;yes]
  - description: Case décochée par défaut
    code: |
      $addModalCheckbox[tos;J'accepte les conditions d'utilisation;no]
---

# $addModalCheckbox[] — Case à Cocher dans un Modal

`$addModalCheckbox[]` ajoute une case à cocher unique à un modal. Contrairement à `$addModalCheckboxGroup[]` qui crée un groupe, cette fonction crée une seule checkbox isolée.

## Syntaxe

```
$addModalCheckbox[customId;label;(default)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `customId` | Oui | — | Identifiant unique pour récupérer l'état. |
| `label` | Oui | — | Texte affiché à côté de la case. |
| `default` | Non | `no` | `yes` si cochée par défaut, `no` sinon. |

## Valeur de retour

Ajoute une checkbox au modal. La valeur soumise est `yes` ou `no`, accessible via `$input[customId]`.

## Utilisation

### Case à cocher simple

```bdfd
$newModal[Inscription;register_modal]
$addModalTextInput[name;Nom;short;;;yes;2;50]
$addModalCheckbox[newsletter;Recevoir la newsletter;yes]
$addModalCheckbox[tos;Accepter les conditions;no]
```

### Vérification de l'état

```bdfd
$onInteraction[modal_register]
$if[$input[tos]==yes]
  $sendMessage[Conditions acceptées ✓]
$else
  $sendMessage[Vous devez accepter les conditions !]
$endif
$endInteraction
```

## Notes

- Pour des groupes de cases à cocher avec plusieurs options, utilisez `$addModalCheckboxGroup[]` et `$addCheckboxGroupOption[]`.
- L'état retourné est une chaîne : `yes` ou `no`.
- La case à cocher individuelle compte comme un composant dans la limite de 5 composants par modal.
