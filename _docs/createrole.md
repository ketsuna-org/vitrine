---
layout: doc
title: $createRole
translation_key: docs
category: "Moderation"
function_name: createRole
syntax: $createRole[name;(color);(hoist);(mentionable)]
description: Crée un nouveau rôle sur le serveur Discord.
---

# $createRole

La fonction `$createRole` **crée un nouveau rôle** sur le serveur Discord et retourne son ID. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$createRole[name;(color);(hoist);(mentionable)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom du rôle à créer. Obligatoire. |
| `color` | Optionnel. Couleur hexadécimale (ex: `"#FF0000"`, `"#3498DB"`). |
| `hoist` | Optionnel. `"yes"` pour afficher séparément dans la liste des membres. Défaut `"no"`. |
| `mentionable` | Optionnel. `"yes"` pour rendre le rôle mentionnable. Défaut `"no"`. |

## Valeur de retour

- **Type** : ID du rôle créé
- L'ID peut être stocké dans une variable pour une utilisation ultérieure.

## Exemples

### Création simple

```bdfd
$createRole[Membre VIP]
$sendMessage[✅ Rôle "Membre VIP" créé !]
```

### Création avec toutes les options

```bdfd
$var[newRole;$createRole[Staff;#E74C3C;yes;yes]]
$giveRole[$authorID;$var[newRole]]
$sendMessage[Rôle Staff créé et attribué !]
```

### Création avec conditions

```bdfd
$if[$isAdmin==true]
  $var[role;$createRole[$message[1];$message[2];no;no]]
  $sendMessage[Rôle créé avec l'ID : $var[role]]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Créer un rôle de couleur

```bdfd
$createRole[Couleur Personnalisée;#9B59B6;no;no]
$sendMessage[Rôle de couleur créé !]
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Le nom du rôle est obligatoire, les autres paramètres sont optionnels.
- La couleur doit être au format hexadécimal `#RRGGBB`.
- `hoist` : affiche les membres du rôle dans une section séparée de la liste des membres.
- `mentionable` : permet de mentionner le rôle avec `@role`.
- Utilisez le retour (ID du rôle) avec `$giveRole` pour attribuer immédiatement le nouveau rôle.
