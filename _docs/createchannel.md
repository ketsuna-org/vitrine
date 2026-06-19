---
layout: doc
title: $createChannel
translation_key: docs
category: "Moderation"
function_name: createChannel
syntax: $createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
description: Crée un nouveau canal sur le serveur. Supporte les canaux texte, vocaux, de catégorie, d'annonce et de scène.
parameters:
  - name: name
    description: Le nom du canal à créer (1 à 100 caractères).
  - name: type
    description: (Optionnel) Type de canal. 0=texte, 2=vocal, 4=catégorie, 5=annonce, 13=scène. Défaut : 0.
  - name: categoryID
    description: (Optionnel) ID de la catégorie parente. 0 ou vide pour aucune catégorie.
  - name: topic
    description: (Optionnel) Sujet/description du canal (max 1024 caractères).
  - name: nsfw
    description: (Optionnel) true/false pour marquer le canal comme NSFW. Défaut : false.
  - name: slowmode
    description: (Optionnel) Délai de slowmode en secondes (0 à 21600). Défaut : 0.
returns:
  - type: snowflake (string)
    description: L'ID du canal créé, ou chaîne vide en cas d'échec.
related:
  - $deleteChannels
  - $modifyChannel
  - $channelSendMessage
examples:
  - description: Canal texte simple
    code: $createChannel[general]
  - description: Canal vocal dans une catégorie
    code: $createChannel[Vocal 1;2;123456789]
  - description: Canal avec slowmode
    code: $createChannel[spam;0;0;;false;5]
---

# $createChannel

La fonction `$createChannel[]` permet de **créer un nouveau canal** sur le serveur Discord.

## Syntaxe

```
$createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Nom du canal (1 à 100 caractères). |
| `type` | Optionnel - Type : `0`=texte, `2`=vocal, `4`=catégorie, `5`=annonce, `13`=scène. Défaut : `0`. |
| `categoryID` | Optionnel - ID de la catégorie parente. |
| `topic` | Optionnel - Sujet/description du canal (max 1024). |
| `nsfw` | Optionnel - `true`/`false` pour le marquage NSFW. |
| `slowmode` | Optionnel - Délai en secondes (0-21600). |

## Valeur de retour

- **Type** : Snowflake (chaîne)
- L'ID du canal créé.
- Chaîne vide si échec (permissions insuffisantes).

## Comportement

- Le bot doit avoir la permission `MANAGE_CHANNELS`.
- Les canaux d'annonce (type 5) nécessitent un serveur communautaire.
- Les canaux de scène (type 13) sont des canaux vocaux spéciaux.

## Exemples

### Canal de logs

```bdfd
$let[logChan;$createChannel[logs-bot;0;123456789;;false;0]]
$if[$logChan!=]
  $channelSendMessage[$logChan;Système de logs activé.]
  $sendMessage[Canal de logs créé : <#$logChan>]
$else
  $sendMessage[Erreur : permission MANAGE_CHANNELS requise.]
$endif
```

### Canal de ticket dynamique

```bdfd
$let[ticketChan;$createChannel[ticket-$username;0;123456789;Ticket de $username;false;0]]
$if[$ticketChan!=]
  $channelSendMessage[$ticketChan;Bienvenue $username ! Décrivez votre problème.]
  $sendMessage[Ticket créé : <#$ticketChan>]
$endif
```

### Catégorie + canaux

```bdfd
$let[cat;$createChannel[Nouveau Projet;4;0]]
$let[chat;$createChannel[discussion;0;$cat]]
$let[vocal;$createChannel[Vocal;2;$cat]]
$sendMessage[Catégorie et canaux créés !]
```

## Notes

- Les noms de canaux sont convertis en minuscules et les espaces remplacés par des tirets.
- Maximum 500 canaux par serveur.
- Pour supprimer, utilisez `$deleteChannels[]`.
