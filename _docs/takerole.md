---
layout: doc
title: $takeRole
translation_key: docs
category: "Moderation"
function_name: takeRole
syntax: $takeRole[userID;roleID]
description: Retire un rôle à un utilisateur sur le serveur.
---

# $takeRole

La fonction `$takeRole` **retire un rôle** à un utilisateur sur le serveur Discord. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$takeRole[userID;roleID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur cible. Obligatoire. |
| `roleID` | L'ID du rôle à retirer. Obligatoire. |

## Valeur de retour

Aucune. Le rôle est retiré.

## Exemples

### Retrait simple

```bdfd
$takeRole[$mentioned[1];$roleID[Muet]]
$sendMessage[🔊 <@$mentioned[1]> n'est plus muet !]
```

### Retrait après vérification

```bdfd
$if[$checkContains[$userRoles[$mentioned[1]];$roleID[Muet]]==true]
  $takeRole[$mentioned[1];$roleID[Muet]]
  $sendMessage[Rôle Muet retiré.]
$else
  $sendMessage[Cet utilisateur n'a pas le rôle Muet.]
$endif
```

### Commande de retrait avec confirmation

```bdfd
$takeRole[$mentioned[1];$roleID[$message[2]]]
$sendMessage[✅ Rôle retiré de <@$mentioned[1]>.]
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Le bot ne peut pas retirer un rôle supérieur à son propre rôle le plus haut.
- Si l'utilisateur ne possède pas le rôle, rien ne se passe.
- Pour retirer plusieurs rôles, utilisez `$takeRoles`.
- Équivalent fonctionnel à `$roleRemove`.
