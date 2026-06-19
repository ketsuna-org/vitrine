---
layout: doc
title: $useChannel
translation_key: docs
category: "Context & Commands"
function_name: useChannel
syntax: $useChannel[channelID]
description: Change le contexte de canal pour la commande en cours. Les fonctions suivantes (comme $sendMessage) s'exécuteront dans ce canal.
parameters:
  - name: channelID
    description: L'ID du canal vers lequel rediriger le contexte.
returns:
  - type: void
    description: Change le contexte. Ne retourne rien.
related:
  - $channelSendMessage
  - $channelID
  - $dmChannelID
examples:
  - description: Rediriger vers un canal de logs
    code: |
      $useChannel[123456789]
      $sendMessage[Log enregistré.]
---
# $useChannel

La fonction `$useChannel[]` **change le contexte du canal** pour le reste de l'exécution de la commande. Toutes les fonctions qui interagissent avec "le canal courant" (comme `$sendMessage`) utiliseront alors le canal spécifié.

## Syntaxe

```
$useChannel[channelID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal cible. |

## Valeur de retour

Aucune. Le contexte est modifié.

## Comportement

- Change le canal courant pour **toute la suite** de la commande.
- Affecte `$sendMessage`, `$title`, `$description`, etc.
- Le changement est local à l'exécution de la commande en cours.

## Exemples

### Rediriger les logs

```bdfd
$let[logChannel;123456789012345678]
$useChannel[$logChannel]
$title[📋 Log de commande]
$description[
**Utilisateur :** $username
**Commande :** $message
**Canal :** <#$channelID>
**Date :** $day/$month/$year
]
$color[#5865F2]
$sendMessage[]
```

### Envoyer une notification croisée

```bdfd
$useChannel[$dmChannelID[$authorID]]
$sendMessage[Votre ticket a été créé ! Un staff vous contactera bientôt.]
```

### Réponse dans un canal d'annonce

```bdfd
$if[$hasPerms[$authorID;Administrator]==true]
  $useChannel[123456789]
  $sendMessage[@everyone Annonce importante : $noMentionMessage]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- `$channelSendMessage[]` est souvent plus sûr pour des envois ponctuels sans changer tout le contexte.
- Utilisez `$useChannel[]` quand plusieurs fonctions doivent s'exécuter dans le même canal cible.
- Le canal original est "oublié" pour le reste de la commande.
