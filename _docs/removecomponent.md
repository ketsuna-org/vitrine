---
layout: doc
title: $removeComponent[]
translation_key: docs
category: "Embed & Message"
function_name: removeComponent
syntax: $removeComponent[customId]
description: Supprime un composant spécifique (bouton, menu, champ texte, etc.) d'un message en utilisant son identifiant personnalisé (customId).
---

# $removeComponent[] — Supprimer un Composant

`$removeComponent[]` retire un composant spécifique d'un message en se basant sur son `customId`. Cela permet de désactiver ou retirer dynamiquement des boutons, menus, ou champs de saisie après une interaction.

## Syntaxe

```
$removeComponent[customId]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `customId` | Oui | Identifiant du composant à supprimer (défini lors de sa création). |

## Valeur de retour

Supprime le composant du message. Si aucun composant avec ce `customId` n'existe, rien ne se passe.

## Utilisation

### Suppression après clic

```bdfd
$onInteraction[confirm_btn]
$removeComponent[confirm_btn]
$removeComponent[cancel_btn]
$editMessage[✅ Action confirmée !]
$endInteraction
```

### Désactiver un bouton après usage

```bdfd
$onInteraction[claim_reward]
$removeComponent[claim_reward]
$sendMessage[$username a récupéré la récompense !]
$endInteraction
```

### Supprimer plusieurs composants spécifiques

```bdfd
$onInteraction[reset_form]
$removeComponent[name_input]
$removeComponent[email_input]
$removeComponent[submit_btn]
$editMessage[Formulaire réinitialisé]
$endInteraction
```

### Menu qui disparaît après sélection

```bdfd
$onInteraction[select_role]
$removeComponent[role_menu]
$var[role;$input[role_menu]]
$giveRole[$authorID;$var[role]]
$editMessage[Rôle **$var[role]** attribué !]
$endInteraction
```

## Notes

- Le `customId` doit correspondre exactement à celui défini lors de la création du composant (`$addButton[customId;...]`, `$addTextInput[customId;...]`, etc.).
- Si le composant n'existe pas, la fonction échoue silencieusement.
- Utilisé principalement dans les handlers `$onInteraction` pour modifier le message après une action utilisateur.
- Pour supprimer tous les boutons d'un coup, utilisez `$removeButtons[]`.
- Pour tout supprimer, utilisez `$removeAllComponents[]`.
