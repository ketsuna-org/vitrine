---
layout: doc
title: $addModalCheckbox[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckbox
syntax: $addModalCheckbox[customId;label;(default)]
description: Adds an checkbox individuelle à a modal Discord.
---

# $addModalCheckbox[] — Case à Cocher dans un Modal

`$addModalCheckbox[]` ajoute une checkbox unique à a modal. Contrairement à `$addModalCheckboxGroup[]` qui crée a group, cette function crée a single checkbox isolée.

## Syntax

```
$addModalCheckbox[customId;label;(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the state. |
| `label` | Yes | — | Text displayed next to de la case. |
| `default` | No | `no` | `yes` si cochée by default, `no` otherwise. |

## Return value

Adds ae checkbox au modal. The value soumise est `yes` or `no`, accessible via `$input[customId]`.

## Usage

### Checkbox simple

```bdfd
$newModal[Inscription;register_modal]
$addModalTextInput[name;Nom;short;;;yes;2;50]
$addModalCheckbox[newsletter;Recevoir la newsletter;yes]
$addModalCheckbox[tos;Accepter les conditions;no]
```

### Vérification of the state

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

- For groups de checkboxes avec multiple options, use `$addModalCheckboxGroup[]` and `$addCheckboxGroupOption[]`.
- L'state retourné est a string : `yes` or `no`.
- La checkbox individuelle compte comme a component dans the limit de 5 components par modal.
