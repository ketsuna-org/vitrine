---
layout: doc
title: $serverID[]
translation_key: docs
category: "Entity Info"
function_name: serverID
syntax: $serverID
description: Retourne l'identifiant unique (Snowflake) du serveur Discord dans lequel la commande est exécutée.
parameters: []
returns:
  type: string
  description: L'ID du serveur (nombre entier sur 18-19 chiffres).
related:
  - $guildID
  - $serverName
  - $guildName
  - $channelID
examples:
  - description: Afficher l'ID du serveur
    code: |
      $sendMessage[L'ID de ce serveur est : $serverID]
  - description: Utiliser dans une condition
    code: |
      $if[$serverID==123456789012345678]
      $sendMessage[Ceci est le serveur principal]
      $endif
---

# $serverID[] — Identifiant du Serveur

`$serverID[]` retourne l'identifiant unique (Snowflake) du serveur Discord courant. Cet ID est un nombre sur 18-19 chiffres qui identifie de manière permanente le serveur.

## Syntaxe

```
$serverID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'ID du serveur sous forme de chaîne numérique.

## Utilisation

### Affichage de l'ID

```bdfd
$sendMessage[ID du serveur : $serverID]
```

### Restreindre une commande à un serveur spécifique

```bdfd
$if[$serverID!=123456789012345678]
$sendMessage[Cette commande n'est pas disponible sur ce serveur.]
$stop
$endif
$sendMessage[Commande exécutée avec succès !]
```

### Logs avec identifiant

```bdfd
$log[Action effectuée sur le serveur $serverID ($serverName)]
```

### Lien vers un salon du serveur

```bdfd
$sendMessage[Rejoignez le salon général : https://discord.com/channels/$serverID/$channelID[général]]
```

## Notes

- `$serverID[]` est un alias de `$guildID[]`.
- L'ID est invariant : il ne change jamais, contrairement au nom du serveur.
- Utile pour identifier de manière fiable un serveur dans les conditions et les logs.
- Utilisable pour construire des URLs Discord (salons, messages, etc.).
