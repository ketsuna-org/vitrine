---
layout: doc
title: $threadMessageCount
translation_key: docs
category: "Moderation"
function_name: threadMessageCount
syntax: $threadMessageCount[threadID]
description: Retourne le nombre total de messages dans un fil de discussion (thread). Inclut les messages du thread uniquement, pas ceux du canal parent.
---

# $threadMessageCount

La fonction `$threadMessageCount[]` permet de **compter le nombre de messages** dans un fil de discussion.

## Syntaxe

```
$threadMessageCount[threadID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `threadID` | L'ID du thread à analyser. |

## Valeur de retour

- **Type** : Nombre entier
- Le nombre total de messages dans le thread.
- `0` si le thread est vide ou inaccessible.

## Comportement

- Compte uniquement les messages dans le thread, pas ceux du canal parent.
- Inclut les messages système (création du thread, ajout de membres, etc.).
- Le bot doit avoir accès au thread pour compter les messages.

## Exemples

### Statistiques de thread

```bdfd
$title[Statistiques du thread]
$description[
**Messages :** $threadMessageCount[$threadID]
**Membres :** $threadUserCount[$threadID]
]
$color[#5865F2]
$sendMessage[]
```

### Vérification d'activité

```bdfd
$let[msgCount;$threadMessageCount[$threadID]]
$if[$msgCount<=1]
  $channelSendMessage[$threadID;Ce thread semble inactif. N'hésitez pas à poser vos questions !]
$endif
```

### Archivage auto

```bdfd
$let[msgCount;$threadMessageCount[$threadID]]
$if[$msgCount>=100]
  $editThread[$threadID;[$threadName];true;true]
  $sendMessage[Thread archivé automatiquement (100 messages atteints).]
$endif
```

## Notes

- Utile pour les statistiques et la gestion automatique des threads.
- Les messages supprimés ne sont pas comptés.
- Pour le nombre de membres, utilisez `$threadUserCount[]`.
