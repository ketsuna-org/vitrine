---
layout: doc
title: $serverChannelExists
translation_key: docs
category: "Server & Channels"
function_name: serverChannelExists
syntax: $serverChannelExists[name;guildID]
description: Vérifie si un canal portant un nom donné existe sur un serveur (guild). Retourne true/false.
---
# $serverChannelExists

La fonction `$serverChannelExists[]` vérifie si un **canal existe sur un serveur** donné (par son nom).

## Syntaxe

```
$serverChannelExists[name;guildID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Nom du canal à rechercher. Sensible à la casse. Wildcards (*) supportés. |
| `guildID` | ID du serveur. Si omis, utilise le serveur courant. |

## Valeur de retour

- **Type** : Booléen (chaîne)
- `"true"` si le canal existe.
- `"false"` sinon.

## Exemples

### Vérification simple

```bdfd
$if[$serverChannelExists[logs]==true]
  $sendMessage[Le canal #logs existe déjà.]
$else
  $createChannel[logs]
  $sendMessage[Canal #logs créé.]
$endif
```

### Vérification avec wildcard

```bdfd
$if[$serverChannelExists[ticket-*]==true]
  $sendMessage[Des canaux de ticket existent déjà.]
$else
  $sendMessage[Aucun canal de ticket trouvé.]
$endif
```

### Vérification sur un autre serveur

```bdfd
$if[$serverChannelExists[bienvenue;$guildID[Serveur Partenaire]]==true]
  $sendMessage[Le canal bienvenue existe sur le serveur partenaire.]
$endif
```

## Notes

- Différent de `$channelExists[]` qui vérifie par ID, pas par nom.
- Utile pour éviter les doublons avant une création.
- Le paramètre `guildID` est optionnel (serveur courant par défaut).
