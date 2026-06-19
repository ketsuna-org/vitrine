---
layout: doc
title: $changeUsernameWithID
translation_key: docs
category: "Moderation"
function_name: changeUsernameWithID
syntax: $changeUsernameWithID[userID;newName]
description: Change le nom d'utilisateur d'un utilisateur spécifique (nécessite des permissions élevées).
---

# $changeUsernameWithID

La fonction `$changeUsernameWithID` **modifie le nom d'utilisateur global** d'un utilisateur Discord spécifique. Cette fonction nécessite des permissions élevées (généralement réservée aux bots avec un token utilisateur ou des permissions spéciales).

## Syntaxe

```
$changeUsernameWithID[userID;newName]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur cible. Obligatoire. |
| `newName` | Le nouveau nom d'utilisateur. Obligatoire. |

## Valeur de retour

Aucune. Le nom d'utilisateur est modifié globalement.

## Exemples

### Changement pour un utilisateur mentionné

```bdfd
$changeUsernameWithID[$mentioned[1];Nom Corrigé]
$sendMessage[✅ Nom de <@$mentioned[1]> modifié en "Nom Corrigé".]
```

### Commande administrative

```bdfd
$if[$isAdmin==true]
  $changeUsernameWithID[$findUser[$message[1]];$message[2]]
  $sendMessage[Nom d'utilisateur de $message[1] changé.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Changement pour l'auteur

```bdfd
$changeUsernameWithID[$authorID;$message[1]]
$sendMessage[$userName, votre nom a été changé.]
```

## Notes

- **Permissions spéciales requises** — cette fonction peut ne pas fonctionner avec un token de bot standard.
- **Rate limit Discord** : 2 changements de nom par heure par compte.
- Pour changer le nom du bot lui-même, utilisez `$changeUsername`.
- Pour changer le pseudo sur le serveur seulement, préférez `$setNickname`.
- Le changement est global et visible sur tous les serveurs Discord.
