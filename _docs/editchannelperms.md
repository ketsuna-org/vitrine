---
layout: doc
title: $editChannelPerms
translation_key: docs
category: "Moderation"
function_name: editChannelPerms
syntax: $editChannelPerms[channelID;roleOrUserID;allow;deny]
description: Modifie les permissions d'un rôle ou d'un utilisateur sur un canal spécifique en utilisant des valeurs numériques de permissions.
---

# $editChannelPerms

La fonction `$editChannelPerms[]` permet de **modifier les permissions d'un rôle ou utilisateur** sur un canal via des valeurs numériques (bitfields).

## Syntaxe

```
$editChannelPerms[channelID;roleOrUserID;allow;deny]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal cible. |
| `roleOrUserID` | L'ID du rôle ou de l'utilisateur. |
| `allow` | Bitfield des permissions à autoriser (entier). |
| `deny` | Bitfield des permissions à refuser (entier). |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Le bot doit avoir `MANAGE_ROLES` ou `MANAGE_CHANNELS`.
- Les permissions sont définies par des valeurs numériques :
  - `1024` = Voir le canal
  - `2048` = Envoyer des messages
  - `4096` = Envoyer des TTS
  - `8192` = Gérer les messages
  - `16384` = Intégrer des liens
  - etc.

## Exemples

### Verrouiller un canal

```bdfd
$editChannelPerms[$channelID;$guildID;0;2048]
$sendMessage[Canal verrouillé : messages désactivés pour @everyone.]
```

### Déverrouiller un canal

```bdfd
$editChannelPerms[$channelID;$guildID;2048;0]
$sendMessage[Canal déverrouillé.]
```

### Salon privé par rôle

```bdfd
$editChannelPerms[$channelID;$guildID;0;1024]
$editChannelPerms[$channelID;$vipRoleID;1024;0]
$sendMessage[Canal rendu privé pour le rôle VIP.]
```

## Notes

- Les permissions `allow` et `deny` sont des sommes de flags. Additionnez les valeurs pour combiner des permissions.
- `$guildID` représente le rôle @everyone.
- Pour une approche plus lisible, utilisez `$modifyChannelPerms[]`.
