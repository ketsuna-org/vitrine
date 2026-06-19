---
layout: doc
title: $deleteChannels
translation_key: docs
category: "Moderation"
function_name: deleteChannels
syntax: $deleteChannels[channelID1;channelID2;...]
description: "Supprime un ou plusieurs canaux par leur ID. Alias : $deleteChannelsByName pour la suppression par nom."
parameters:
  - name: channelID1;channelID2;...
    description: Liste des IDs de canaux à supprimer, séparés par des points-virgules.
returns:
  - type: aucun
    description: Ne retourne rien. Les canaux sont supprimés silencieusement.
related:
  - $createChannel
  - $modifyChannel
examples:
  - description: Supprimer un canal
    code: $deleteChannels[123456789]
  - description: Supprimer plusieurs canaux
    code: $deleteChannels[123456789;987654321]
---

# $deleteChannels

La fonction `$deleteChannels[]` permet de **supprimer un ou plusieurs canaux** par leur ID. Un alias `$deleteChannelsByName[]` existe pour la suppression par nom.

## Syntaxe

```
$deleteChannels[channelID1;channelID2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID1;channelID2;...` | IDs des canaux à supprimer, séparés par `;`. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Le bot doit avoir la permission `MANAGE_CHANNELS`.
- La suppression est **irréversible**.
- Si un ID est invalide, les autres canaux valides sont quand même supprimés.

## Exemples

### Suppression simple

```bdfd
$deleteChannels[$channelID]
$sendMessage[Canal supprimé.]
```

### Nettoyage de tickets

```bdfd
$deleteChannels[$ticketID]
$sendMessage[Ticket fermé et canal supprimé.]
```

### Suppression conditionnelle

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $deleteChannels[$mentionedChannels[1]]
  $sendMessage[Canaux supprimés.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Suppression par nom (alias)

```bdfd
$deleteChannelsByName[ticket-*]
$sendMessage[Tous les canaux de ticket supprimés.]
```

## Notes

- **Action irréversible** : utilisez avec précaution.
- Les canaux supprimés ne peuvent PAS être restaurés via l'API.
- Pour les catégories, la suppression supprime aussi tous les canaux enfants.
- L'alias `$deleteChannelsByName[]` accepte des wildcards (`*`).
