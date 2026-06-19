---
layout: doc
title: $removeButtons[]
translation_key: docs
category: "Embed & Message"
function_name: removeButtons
syntax: $removeButtons
description: Supprime tous les boutons d'un message en une seule opération. Les autres composants (menus, champs texte) sont conservés.
parameters: []
returns:
  type: void
  description: Supprime tous les composants de type bouton du message.
related:
  - removeComponent
  - removeAllComponents
  - $addButton
  - $editMessage
examples:
  - description: Supprimer tous les boutons après une interaction
    code: |
      $onInteraction[any_button]
      $removeButtons
      $editMessage[Interaction traitée !]
      $endInteraction
  - description: Désactiver l'interface après utilisation
    code: |
      $removeButtons
      $editMessage[✅ Merci d'avoir voté !]
---

# $removeButtons[] — Supprimer Tous les Boutons

`$removeButtons[]` retire tous les composants de type bouton d'un message. C'est la méthode la plus simple pour désactiver une interface après qu'un utilisateur a interagi avec elle.

## Syntaxe

```
$removeButtons
```

## Paramètres

Aucun paramètre.

## Valeur de retour

Supprime tous les boutons du message. Les autres composants (TextInput, Select Menus) ne sont pas affectés.

## Utilisation

### Désactiver après vote

```bdfd
$onInteraction[vote_yes]
$removeButtons
$editMessage[✅ Vote enregistré : **Oui**]
$endInteraction
```

### Interface qui se verrouille

```bdfd
$onInteraction[poll_choice]
$removeButtons
$var[choice;$input[poll_choice]]
$editMessage[Merci pour votre vote : **$var[choice]**]
$endInteraction
```

### Confirmation avec suppression

```bdfd
$addButton[confirm;Confirmer;Success;yes;confirm_action]
$addButton[cancel;Annuler;Danger;yes;cancel_action]

$onInteraction[confirm_action]
$removeButtons
$editMessage[✅ Action confirmée et exécutée !]
$endInteraction

$onInteraction[cancel_action]
$removeButtons
$editMessage[❌ Action annulée]
$endInteraction
```

### Panneau d'administration temporaire

```bdfd
$title[Panneau Admin]
$description[Choisissez une action :]
$addButton[ban;Bannir;Danger;;admin_ban]
$addButton[kick;Expulser;Secondary;;admin_kick]
$addButton[mute;Mute;Primary;;admin_mute]
$footer[Action unique — le panneau se désactive après usage]

$onInteraction[admin_ban]
$removeButtons
$editMessage[Utilisateur banni]
$endInteraction
```

## Notes

- Supprime **tous** les boutons, quel que soit leur customId.
- Les TextInput, Select Menus, et autres composants non-bouton sont conservés.
- Pour supprimer un bouton spécifique, utilisez `$removeComponent[customId]`.
- Pour supprimer absolument tous les composants, utilisez `$removeAllComponents[]`.
- Utilisé principalement dans les handlers `$onInteraction` après traitement.
