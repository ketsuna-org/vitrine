---
layout: doc
title: $addModalRadioGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalRadioGroup
syntax: $addModalRadioGroup[customId;label;(required)]
description: Crée un groupe de boutons radio dans un modal. L'utilisateur ne peut sélectionner qu'une seule option à la fois. Les options sont ajoutées avec $addRadioGroupOption[].
---

# $addModalRadioGroup[] — Groupe de Boutons Radio

`$addModalRadioGroup[]` crée un conteneur de boutons radio dans un modal. Contrairement aux cases à cocher, un seul choix peut être sélectionné parmi les options du groupe.

## Syntaxe

```
$addModalRadioGroup[customId;label;(required)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `customId` | Oui | — | Identifiant unique du groupe. |
| `label` | Oui | — | Étiquette au-dessus du groupe. |
| `required` | Non | `yes` | `yes` si obligatoire. |

## Valeur de retour

Initialise un groupe radio. La valeur de l'option sélectionnée est accessible via `$input[customId]`.

## Utilisation

### Groupe radio simple

```bdfd
$newModal[Inscription;signup_modal]
$addModalTextInput[name;Nom;short;;;yes;2;50]
$addModalRadioGroup[gender;Genre;yes]
$addRadioGroupOption[gender;Masculin;male]
$addRadioGroupOption[gender;Féminin;female]
$addRadioGroupOption[gender;Non-binaire;nb]
```

### Groupe avec option par défaut

```bdfd
$newModal[Préférences;pref_modal]
$addModalRadioGroup[lang;Langue préférée;yes]
$addRadioGroupOption[;Français;fr;;yes]
$addRadioGroupOption[;English;en]
$addRadioGroupOption[;Español;es]
```

### Récupération de la sélection

```bdfd
$onInteraction[signup_submit]
$var[gender;$input[gender]]
$if[$var[gender]==male]
  $sendMessage[Bienvenue sur le serveur !]
$elseif[$var[gender]==female]
  $sendMessage[Bienvenue sur le serveur !]
$endif
$endInteraction
```

## Différences Radio vs Checkbox

| Radio Group | Checkbox Group |
|-------------|---------------|
| Une seule option sélectionnable | Plusieurs options sélectionnables |
| Retourne une seule valeur | Retourne une liste de valeurs |
| Idéal pour choix exclusifs | Idéal pour sélections multiples |

## Notes

- Les options sont ajoutées avec `$addRadioGroupOption[]`.
- Comme pour les checkbox groups, le `menuId` peut être omis dans `$addRadioGroupOption[]` pour cibler le dernier groupe créé.
- Maximum 25 options par groupe radio.
