---
layout: doc
title: $customID
translation_key: docs
category: "Components"
function_name: customID
syntax: $customID
description: Retourne l'ID personnalisé (customId) du composant d'interaction qui a déclenché le callback (bouton, select menu, modal). S'utilise dans $onInteraction.
parameters: []
returns:
  - type: string
    description: Le customId du composant d'interaction.
related:
  - $onInteraction
  - $interactionData
  - $authorID
examples:
  - description: Récupérer le customID d'un bouton
    code: |
      $onInteraction
      $sendMessage[Bouton cliqué : $customID]
---
# $customID

La fonction `$customID` retourne le **customId** du composant (bouton, select menu, modal) qui a déclenché une interaction.

## Syntaxe

```
$customID
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Chaîne
- Le customId défini lors de la création du composant.

## Comportement

- Doit être utilisé dans un callback `$onInteraction`.
- Permet de différencier quel bouton/menu a été utilisé.

## Exemples

### Gestionnaire d'interaction

```bdfd
$onInteraction
$if[$customID==accept]
  $sendMessage[Demande acceptée.]
$elseIf[$customID==refuse]
  $sendMessage[Demande refusée.]
$elseIf[$customID==info]
  $sendMessage[Plus d'informations bientôt.]
$endif
```

### Log des interactions

```bdfd
$onInteraction
$log[Interaction reçue — customID: $customID — par $username]
```

### Switch dynamique

```bdfd
$onInteraction
$switch[$customID;
  confirm;$sendMessage[✅ Confirmé];
  cancel;$sendMessage[❌ Annulé];
  delete;$deleteChannels[$channelID]
]
```

## Notes

- Équivalent fonctionnel à `$interactionData[customId]`.
- Essentiel pour les systèmes de boutons et menus interactifs.
- Le customId est défini par le développeur dans `$addButton[]`, `$addSelectMenu[]`, etc.
