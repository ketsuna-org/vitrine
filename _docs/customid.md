---
layout: doc
title: $customID
translation_key: docs
category: "Components"
function_name: customID
syntax: $customID
description: Returns the ID custom (customId) du composant d'interaction qui a déclenché le callback (bouton, select menu, modal). S'utilise dans $onInteraction.
---
# $customID

The `$customID` function returns the **customId** du composant (bouton, select menu, modal) qui a déclenché une interaction.

## Syntax

```
$customID
```

## Parameters

Aucun.

## Return value

- **Type** : String
- Le customId set during la création du composant.

## Behavior

- Doit être utilisé dans un callback `$onInteraction`.
- Allows différencier quel bouton/menu has been utilisé.

## Examples

### Gestionnaire d'interaction

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

### Log des interactions

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

- Équivaslow functionnel à `$interactionData[customId]`.
- Essentiel for systèmes de buttons and menus interactifs.
- Le customId est set par le développeur dans `$addButton[]`, `$addSelectMenu[]`, etc.
