---
layout: doc
title: $unregisterGuildCommands
translation_key: docs
category: "Moderation"
function_name: unregisterGuildCommands
syntax: $unregisterGuildCommands[guildID]
description: Supprime toutes les commandes slash du bot sur un serveur spécifique. Les commandes globales ne sont pas affectées.
---

# $unregisterGuildCommands

La fonction `$unregisterGuildCommands[]` permet de **supprimer toutes les commandes slash** du bot sur un serveur spécifique.

## Syntaxe

```
$unregisterGuildCommands[guildID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `guildID` | L'ID du serveur duquel supprimer les commandes slash. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Supprime UNIQUEMENT les commandes de guilde, pas les commandes globales.
- Les commandes disparaissent immédiatement du menu slash.
- Le bot doit avoir la permission `applications.commands`.

## Exemples

### Nettoyage manuel

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $unregisterGuildCommands[$guildID]
  $sendMessage[✅ Commandes slash supprimées de ce serveur.]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Réinitialisation

```bdfd
$unregisterGuildCommands[$guildID]
$wait[2]
$registerGuildCommands[$guildID]
$sendMessage[Commandes slash réinitialisées avec succès.]
```

### Nettoyage avant départ

```bdfd
$if[$authorID==OWNER_ID]
  $unregisterGuildCommands[$message[1]]
  $botLeave[$message[1]]
  $sendMessage[Commandes supprimées et bot retiré du serveur $message[1].]
$endif
```

## Notes

- Les commandes globales ne sont PAS affectées par cette fonction.
- Pour ré-enregistrer, utilisez `$registerGuildCommands[]`.
- Utile avant de quitter un serveur ou pour nettoyer d'anciennes commandes.
