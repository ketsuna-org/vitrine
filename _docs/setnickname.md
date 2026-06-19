---
layout: doc
title: $setNickname
translation_key: docs
category: "Moderation"
function_name: setNickname
syntax: $setNickname[nickname;(userID)]
description: Modifie le pseudo (nickname) d'un utilisateur sur le serveur.
---

# $setNickname

La fonction `$setNickname` **modifie le pseudo (surnom)** d'un utilisateur sur le serveur Discord. Le pseudo est propre à chaque serveur et n'affecte pas le nom d'utilisateur global. Le bot doit avoir la permission `ManageNicknames`.

## Syntaxe

```
$setNickname[nickname;(userID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `nickname` | Le nouveau pseudo à appliquer. Obligatoire. Laisser vide pour réinitialiser le pseudo. |
| `userID` | Optionnel. L'ID de l'utilisateur cible. Si omis, vise l'utilisateur mentionné. |

## Valeur de retour

Aucune. Le pseudo est modifié.

## Exemples

### Changement simple

```bdfd
$setNickname[Gentil Membre;$mentioned[1]]
$sendMessage[Pseudo de <@$mentioned[1]> changé en "Gentil Membre".]
```

### Réinitialiser le pseudo

```bdfd
$setNickname[;$mentioned[1]]
$sendMessage[Pseudo de <@$mentioned[1]> réinitialisé.]
```

### Commande de modération

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !nick <@mention> <nouveau pseudo>]
  $stop
$endif

$setNickname[$replaceText[$message;-;$mentioned[1];];$mentioned[1]]
$sendMessage[✅ Pseudo modifié.]
```

### Attribution d'un pseudo avec préfixe

```bdfd
$setNickname[[Membre] $username;$mentioned[1]]
$sendMessage[Pseudo formaté appliqué.]
```

## Notes

- Le bot doit avoir la permission `ManageNicknames`.
- Le bot ne peut pas modifier le pseudo d'un utilisateur ayant un rôle supérieur au sien.
- Pour changer le nom d'utilisateur global du bot, utilisez `$changeUsername`.
- Laisser `nickname` vide réinitialise le pseudo au nom d'utilisateur par défaut.
