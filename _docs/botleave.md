---
layout: doc
title: $botLeave
translation_key: docs
category: "Moderation"
function_name: botLeave
syntax: $botLeave[(guildID)]
description: Fait quitter le bot d'un serveur. Si aucun ID n'est fourni, le bot quitte le serveur où la commande est exécutée.
---

# $botLeave

La fonction `$botLeave[]` permet de **faire quitter le bot d'un serveur**. Action irréversible qui supprime le bot du serveur cible.

## Syntaxe

```
$botLeave[(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `guildID` | Optionnel - L'ID du serveur à quitter. Par défaut, le serveur courant. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Le bot quitte immédiatement le serveur spécifié.
- **Action irréversible** : toutes les données du bot sur ce serveur sont perdues.
- Si exécuté sans guildID, le bot quitte le serveur où la commande est lancée.

## Exemples

### Quitter le serveur courant

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $sendMessage[Au revoir ! Le bot quitte ce serveur.]
  $botLeave
$else
  $sendMessage[Seuls les administrateurs peuvent utiliser cette commande.]
$endif
```

### Quitter un serveur spécifique (owner only)

```bdfd
$if[$authorID==OWNER_ID]
  $let[targetGuild;$message[1]]
  $if[$targetGuild!=]
    $botLeave[$targetGuild]
    $sendMessage[Bot retiré du serveur $targetGuild.]
  $else
    $sendMessage[Usage : !leave <guildID>]
  $endif
$else
  $sendMessage[Réservé au propriétaire du bot.]
$endif
```

### Nettoyage automatique

```bdfd
$if[$membersCount<5]
  $channelSendMessage[$channelID;Ce serveur a moins de 5 membres. Le bot va quitter.]
  $botLeave
$endif
```

## Notes

- **Action irréversible** : utilisez avec une extrême prudence.
- Protégez cette commande par des vérifications de permissions strictes.
- Toutes les données utilisateur liées à ce serveur deviennent inaccessibles.
- Le bot ne peut pas rejoindre un serveur via commande (nécessite un lien d'invitation).
