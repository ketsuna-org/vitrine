---
layout: doc
title: $modifyChannel
translation_key: docs
category: "Moderation"
function_name: modifyChannel
syntax: $modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
description: "Modifie les propriétés d'un canal existant : nom, sujet, catégorie, statut NSFW et slowmode."
---

# $modifyChannel

La fonction `$modifyChannel[]` permet de **modifier les propriétés d'un canal** existant.

## Syntaxe

```
$modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | ID du canal à modifier. |
| `name` | Nouveau nom du canal. |
| `topic` | Optionnel - Nouveau sujet (max 1024 caractères). |
| `categoryID` | Optionnel - ID de la nouvelle catégorie, `0` pour aucune. |
| `nsfw` | Optionnel - `true`/`false` pour NSFW. |
| `slowmode` | Optionnel - Délai en secondes (0-21600). |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Le bot doit avoir la permission `MANAGE_CHANNELS`.
- Les paramètres optionnels peuvent être laissés vides pour conserver la valeur actuelle.
- L'ordre des paramètres est important — utilisez `;` vides pour sauter des paramètres.

## Exemples

### Renommer un canal

```bdfd
$modifyChannel[$channelID;archives-$date]
$sendMessage[Canal renommé.]
```

### Changer le slowmode

```bdfd
$modifyChannel[$channelID;$channelName;;;false;5]
$sendMessage[Slowmode défini à 5 secondes.]
```

### Déplacer vers une catégorie

```bdfd
$modifyChannel[$channelID;$channelName;;123456789]
$sendMessage[Canal déplacé.]
```

### Modification complète

```bdfd
$modifyChannel[$channelID;règlement;Règles du serveur - mis à jour $date;123456789;false;0]
$sendMessage[Canal mis à jour avec succès.]
```

## Notes

- Utilisez des paramètres vides (`;`) pour sauter les options que vous ne voulez pas modifier.
- Le nom du canal suit les mêmes règles que `$createChannel[]`.
- Pour modifier les permissions, utilisez `$editChannelPerms[]` ou `$modifyChannelPerms[]`.
