---
layout: doc
title: $startThread
translation_key: docs
category: "Moderation"
function_name: startThread
syntax: $startThread[name;(autoArchiveDuration);(messageID)]
description: Crée un fil de discussion (thread) à partir du message courant ou d'un message spécifié. Les threads permettent des conversations organisées en sous-canaux.
---

# $startThread

La fonction `$startThread[]` permet de **créer un fil de discussion** (thread) dans un canal. Les threads sont des sous-conversations organisées.

## Syntaxe

```
$startThread[name;(autoArchiveDuration);(messageID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Nom du thread (1 à 100 caractères). |
| `autoArchiveDuration` | Optionnel - Durée d'inactivité avant archivage : 60, 1440 (24h), 4320 (3j), 10080 (7j). Défaut : 1440. |
| `messageID` | Optionnel - ID du message source. Par défaut, le message déclencheur. |

## Valeur de retour

- **Type** : Snowflake (chaîne)
- L'ID du thread nouvellement créé.
- Chaîne vide en cas d'échec (permissions insuffisantes ou canal non compatible).

## Comportement

- Les threads ne peuvent être créés que dans les canaux texte (pas en vocal ou annonce).
- Le bot doit avoir la permission `CREATE_PUBLIC_THREADS` ou `CREATE_PRIVATE_THREADS`.
- Le thread est créé comme thread public par défaut (visible par tous).

## Exemples

### Thread de support

```bdfd
$let[thread;$startThread[Support - $username;10080]]
$if[$thread!=]
  $channelSendMessage[$thread;Bienvenue dans votre fil de support, $username ! Un modérateur vous répondra bientôt.]
  $sendMessage[Fil de support créé : <#$thread>]
$else
  $sendMessage[Impossible de créer le thread. Permissions manquantes.]
$endif
```

### Thread automatique

```bdfd
$if[$checkContains[$message;!discussion]==true]
  $let[topic;$message[1]]
  $let[thread;$startThread[$topic;4320]]
  $if[$thread!=]
    $threadAddMember[$thread;$authorID]
    $sendMessage[Discussion créée : <#$thread>]
  $endif
$endif
```

## Notes

- Les threads archivés peuvent être dé-archivés avec `$editThread[]`.
- Les threads privés nécessitent `CREATE_PRIVATE_THREADS`.
- Le nom du thread peut être modifié ultérieurement avec `$editThread[]`.
