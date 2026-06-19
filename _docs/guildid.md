---
layout: doc
title: $guildID[]
translation_key: docs
category: "Entity Info"
function_name: guildID
syntax: $guildID
description: Alias de $serverID. Retourne l'identifiant unique (Snowflake) du serveur Discord.
---

# $guildID[] — Identifiant du Serveur (Alias)

`$guildID[]` est un alias de `$serverID[]`. Il retourne l'identifiant unique (Snowflake) du serveur Discord courant.

## Syntaxe

```
$guildID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'ID du serveur sous forme de chaîne numérique.

## Utilisation

### Affichage simple

```bdfd
$sendMessage[ID de la guilde : $guildID]
```

### Restriction de commande par serveur

```bdfd
$if[$guildID!=123456789012345678]
$sendMessage[⛔ Cette commande est réservée au serveur principal.]
$stop
$endif
$sendMessage[✅ Commande exécutée.]
```

### Logs

```bdfd
$log[Action sur le serveur $guildID ($guildName)]
```

### Construction d'URL

```bdfd
$sendMessage[Lien du serveur : https://discord.com/channels/$guildID]
```

## Notes

- `$guildID[]` est strictement identique à `$serverID[]`. Utilisez celui qui vous paraît le plus naturel.
- Le terme "guild" est le nom technique utilisé par l'API Discord pour désigner un serveur.
- L'ID est permanent et ne change jamais, contrairement au nom.
