---
layout: doc
title: $registerGuildCommands
translation_key: docs
category: "Moderation"
function_name: registerGuildCommands
syntax: $registerGuildCommands[guildID]
description: Enregistre les commandes slash du bot sur un serveur spécifique. Les commandes slash sont immédiatement disponibles après l'enregistrement.
parameters:
  - name: guildID
    description: L'ID du serveur sur lequel enregistrer les commandes slash.
returns:
  - type: aucun
    description: Ne retourne rien. Les commandes sont enregistrées auprès de l'API Discord.
related:
  - $unregisterGuildCommands
  - $deleteCommand
  - $botTyping
examples:
  - description: Enregistrer les commandes slash
    code: $registerGuildCommands[$guildID]
---

# $registerGuildCommands

La fonction `$registerGuildCommands[]` permet d'**enregistrer les commandes slash** du bot sur un serveur spécifique.

## Syntaxe

```
$registerGuildCommands[guildID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `guildID` | L'ID du serveur où enregistrer les commandes slash. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Les commandes slash définies dans le bot sont enregistrées sur le serveur cible.
- Les commandes de guilde sont disponibles immédiatement (contrairement aux commandes globales qui peuvent prendre jusqu'à 1h).
- Le bot doit avoir la permission `applications.commands` sur le serveur.

## Exemples

### Enregistrement manuel

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $registerGuildCommands[$guildID]
  $sendMessage[✅ Commandes slash enregistrées sur ce serveur !]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Enregistrement automatique

```bdfd
$registerGuildCommands[$guildID]
$sendMessage[Commandes slash synchronisées.]
```

### Enregistrement multi-serveur (owner)

```bdfd
$if[$authorID==OWNER_ID]
  $registerGuildCommands[$message[1]]
  $sendMessage[Commandes enregistrées sur le serveur $message[1].]
$endif
```

## Notes

- Les commandes de guilde sont plus rapides à mettre à jour que les commandes globales.
- Utile pour tester de nouvelles commandes avant déploiement global.
- Pour supprimer les commandes, utilisez `$unregisterGuildCommands[]`.
- Maximum 100 commandes slash par serveur.
