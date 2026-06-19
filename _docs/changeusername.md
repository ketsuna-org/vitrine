---
layout: doc
title: $changeUsername
translation_key: docs
category: "Moderation"
function_name: changeUsername
syntax: $changeUsername[newName]
description: Change le nom d'utilisateur du bot.
---

# $changeUsername

La fonction `$changeUsername` **modifie le nom d'utilisateur global** du bot sur Discord. Contrairement à `$setNickname` qui change le pseudo par serveur, `$changeUsername` change le nom du bot partout.

## Syntaxe

```
$changeUsername[newName]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `newName` | Le nouveau nom d'utilisateur du bot. Obligatoire. |

## Valeur de retour

Aucune. Le nom d'utilisateur du bot est modifié globalement.

## Exemples

### Changement simple

```bdfd
$changeUsername[Mon Super Bot]
$sendMessage[✅ Le bot s'appelle maintenant "Mon Super Bot".]
```

### Changement conditionnel

```bdfd
$if[$isAdmin==true]
  $changeUsername[$message[1]]
  $sendMessage[Nom du bot mis à jour.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Changement programmé

```bdfd
$changeUsername[Bot de $serverName]
$sendMessage[Nom du bot adapté au serveur.]
```

## Notes

- **Rate limit Discord** : 2 changements de nom par heure maximum.
- Le nom global est visible sur tous les serveurs.
- Pour changer le pseudo sur un serveur spécifique, utilisez `$setNickname`.
- Pour changer le nom d'un autre utilisateur, utilisez `$changeUsernameWithID` (nécessite des permissions spéciales).
- Le bot doit avoir un token avec les permissions nécessaires.
