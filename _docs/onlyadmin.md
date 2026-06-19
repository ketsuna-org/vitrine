---
layout: doc
title: $onlyAdmin
translation_key: docs
category: "Moderation"
function_name: onlyAdmin
syntax: $onlyAdmin
description: Fonction guard qui arrête l'exécution de la commande si l'utilisateur n'est pas administrateur du serveur.
---

# $onlyAdmin

La fonction guard `$onlyAdmin` arrête immédiatement l'exécution de la commande si l'utilisateur qui l'a déclenchée ne possède pas la permission **Administrateur** sur le serveur.

## Syntaxe

```
$onlyAdmin
```

## Paramètres

Aucun paramètre. `$onlyAdmin` s'utilise seul, sans argument.

## Comportement

- Si l'utilisateur est administrateur, la commande continue normalement.
- Si l'utilisateur n'est **pas** administrateur, la commande est immédiatement interrompue (`$stop` implicite).
- Aucun message d'erreur n'est envoyé par défaut — le bot reste silencieux.
- Équivalent fonctionnel à `$onlyPerms[Administrator]` mais plus lisible et concis.

## Exemples

### Réserver une commande aux admins

```bdfd
$onlyAdmin
$ban[$mentioned[1]]
$sendMessage[<@$mentioned[1]> a été banni.]
```

### Panneau d'administration

```bdfd
$onlyAdmin
$title[⚙️ Panneau Admin]
$description[
**Commandes disponibles :**
`!ban`, `!kick`, `!mute`, `!config`
]
$color[#ED4245]
$sendMessage[]
```

### Commande hybride (admin ou rôle modérateur)

```bdfd
$if[$isAdmin==false]
  $onlyForRoles[123456789012345678]
$endif
$sendMessage[Action de modération autorisée.]
```

## Notes

- `$onlyAdmin` vérifie uniquement la permission `Administrator`. Pour vérifier d'autres permissions, utilisez `$onlyPerms`.
- Le propriétaire du serveur est implicitement administrateur et passe ce guard.
- Pour ajouter un message d'erreur personnalisé, préférez `$onlyPerms[Administrator;Message d'erreur]`.
- À placer **en haut** de la commande, avant toute autre logique.
