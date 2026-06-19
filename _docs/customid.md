---
layout: doc
title: $customID
translation_key: docs
category: "Components"
function_name: customID
syntax: $customID
description: Returns the ID custom (customId) of the composant of interaction qui triggered le callback (bouton, select menu, modal). S'utilise in $onInteraction.
---
# $customID

The `$customID` function returns the **customId** of the composant (bouton, select menu, modal) qui triggered une interaction.

## Syntax

```
$customID
```

## Parameters

Aucun.

## Return value

- **Type** : String
- Le customId set during la création of the composant.

## Behavior

- Doit être utilisé in a callback `$onInteraction`.
- Allows différencier quel bouton/menu has been utilisé.

## Examples

### Gestionnaire of interaction

```bdfd
$onInteraction
$if[$customID==accept]
  $sendMessage[Demande acceptée.]
$elseIf[$customID==refuse]
  $sendMessage[Demande refusée.]
$elseIf[$customID==info]
  $sendMessage[More information bientôt.]
$endif
```

### Log interactions

```bdfd
$onInteraction
$log[Interaction receivede — customID: $customID — par $username]
```

### Switch dynamic

```bdfd
$onInteraction
$switch[$customID;
  confirm;$sendMessage[✅ Confirmé];
  cancel;$sendMessage[❌ Annulé];
  delete;$deleteChannels[$channelID]
]
```

## Notes

- Équivaslow functionnel to `$interactionData[customId]`.
- Essentiel for systèmes of buttons and menus interactifs.
- Le customId est set par le développeur in `$addButton[]`, `$addSelectMenu[]`, etc.
