---
layout: doc
title: $addRadioGroupOption[]
translation_key: docs
category: "Embed & Message"
function_name: addRadioGroupOption
syntax: $addRadioGroupOption[menuId;label;value;(description);(default)]
description: Ajoute une option individuelle à un groupe de boutons radio dans un modal. Le menuId peut être omis pour cibler le dernier groupe créé.
---

# $addRadioGroupOption[] — Option de Groupe Radio

`$addRadioGroupOption[]` ajoute une option à un groupe de boutons radio créé avec `$addModalRadioGroup[]`. Une seule option du groupe peut être sélectionnée à la fois.

## Syntaxe

```
$addRadioGroupOption[menuId;label;value;(description);(default)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `menuId` | Non | Dernier groupe | Identifiant du groupe radio parent. |
| `label` | Oui | — | Texte affiché pour l'option. |
| `value` | Oui | — | Valeur retournée si sélectionnée. |
| `description` | Non | — | Description optionnelle. |
| `default` | Non | `no` | `yes` si sélectionnée par défaut. |

## Valeur de retour

Ajoute l'option au groupe parent. La valeur sélectionnée est accessible via `$input[menuId]`.

## Utilisation

### Groupe avec options détaillées

```bdfd
$newModal[Abonnement;sub_modal]
$addModalRadioGroup[tier;Niveau d'abonnement;yes]
$addRadioGroupOption[tier;Gratuit;free;Fonctionnalités de base;yes]
$addRadioGroupOption[tier;Pro;pro;Tout illimité, support prioritaire;no]
$addRadioGroupOption[tier;Enterprise;ent;Solution sur mesure, SLA garanti;no]
```

### Sans menuId explicite

```bdfd
$newModal[Feedback;feedback_modal]
$addModalRadioGroup[satisfaction;Satisfaction;yes]
$addRadioGroupOption[;Très satisfait;5;Excellent !;no]
$addRadioGroupOption[;Satisfait;4;Bon;no]
$addRadioGroupOption[;Neutre;3;Moyen;no]
$addRadioGroupOption[;Insatisfait;2;Peut mieux faire;no]
$addRadioGroupOption[;Très insatisfait;1;À revoir;no]
```

### Option par défaut conditionnelle

```bdfd
$newModal[Langue;lang_modal]
$addModalRadioGroup[locale;Langue de l'interface;yes]
$addRadioGroupOption[;Français;fr;;yes]
$addRadioGroupOption[;English;en;;no]
```

## Notes

- Une seule option peut avoir `default` à `yes` dans un même groupe radio.
- Si `menuId` est vide, l'option cible le dernier groupe créé.
- La valeur retournée est le `value` de l'option sélectionnée (pas le `label`).
- Maximum 25 options par groupe radio.
