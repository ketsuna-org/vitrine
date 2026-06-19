---
layout: doc
title: $addModalSelect[]
translation_key: docs
category: "Embed & Message"
function_name: addModalSelect
syntax: $addModalSelect[customId;label;(placeholder);(required)]
description: Ajoute un menu déroulant (select/dropdown) à un modal Discord. Les options sont ajoutées avec $addSelectMenuOption[].
parameters:
  - name: customId
    type: string
    required: true
    description: Identifiant unique du menu, utilisé pour récupérer la valeur sélectionnée.
  - name: label
    type: string
    required: true
    description: Étiquette affichée au-dessus du menu déroulant.
  - name: placeholder
    type: string
    required: false
    description: Texte indicatif affiché quand aucune option n'est sélectionnée.
  - name: required
    type: string
    required: false
    default: "yes"
    description: "yes" si une sélection est obligatoire, "no" sinon.
returns:
  type: void
  description: Ajoute un menu Select au modal en cours de construction.
related:
  - newModal
  - addModalTextInput
  - addModalCheckbox
  - addModalRadioGroup
examples:
  - description: Menu déroulant simple
    code: |
      $addModalSelect[country;Pays;Choisissez votre pays...;yes]
  - description: Menu optionnel
    code: |
      $addModalSelect[color;Couleur préférée;Sélectionnez une couleur;no]
---

# $addModalSelect[] — Menu Déroulant dans un Modal

`$addModalSelect[]` ajoute un menu déroulant (select menu) à un modal. Les options du menu sont définies avec `$addSelectMenuOption[]` après cet appel.

## Syntaxe

```
$addModalSelect[customId;label;(placeholder);(required)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `customId` | Oui | — | Identifiant unique pour récupérer la valeur après soumission. |
| `label` | Oui | — | Texte affiché au-dessus du menu. |
| `placeholder` | Non | — | Texte indicatif dans le menu non sélectionné. |
| `required` | Non | `yes` | `yes` si obligatoire, `no` sinon. |

## Valeur de retour

Ajoute le composant Select au modal en cours. La valeur sélectionnée est accessible via `$input[customId]` dans le gestionnaire d'interaction.

## Utilisation

### Menu déroulant avec options

```bdfd
$newModal[Préférences;pref_modal]
$addModalSelect[language;Langue;Choisissez votre langue...;yes]
$addSelectMenuOption[Français;fr;Langue française]
$addSelectMenuOption[English;en;English language]
$addSelectMenuOption[Español;es;Idioma español]
```

### Menu optionnel

```bdfd
$newModal[Sondage;survey_modal]
$addModalTextDisplay[Question bonus (optionnelle) :]
$addModalSelect[os;Système d'exploitation;Sélectionnez votre OS;no]
$addSelectMenuOption[Windows;win]
$addSelectMenuOption[macOS;mac]
$addSelectMenuOption[Linux;linux]
```

### Récupération de la valeur

```bdfd
$onInteraction[modal_submit]
$var[lang;$input[language]]
$sendMessage[Langue sélectionnée : $var[lang]]
$endInteraction
```

## Notes

- Doit être suivi d'appels à `$addSelectMenuOption[]` pour définir les choix disponibles.
- Le `customId` doit être unique au sein du modal.
- Maximum 25 options par menu déroulant (limitation Discord).
- La valeur retournée par `$input[]` est la `value` de l'option sélectionnée, pas son `label`.
