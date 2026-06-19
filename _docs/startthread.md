---
layout: doc
title: $startThread
translation_key: docs
category: "Moderation"
function_name: startThread
syntax: $startThread[name;(autoArchiveDuration);(messageID)]
description: Crée un fil de discussion (thread) à partir du message courant ou d'un message spécifié. Les threads permettent des conversations organisées en sous-canaux.
parameters:
  - name: name
    description: Le nom du thread à créer (1 à 100 caractères).
  - name: autoArchiveDuration
    description: "(Optionnel) Durée en minutes avant archivage automatique. Valeurs acceptées : 60, 1440, 4320, 10080. Défaut : 1440 (24h)."
  - name: messageID
    description: (Optionnel) L'ID du message à partir duquel créer le thread. Si omis, utilise le message de la commande.
returns:
  - type: snowflake (string)
    description: L'ID du thread créé, ou chaîne vide en cas d'échec.
related:
  - $editThread
  - $threadAddMember
  - $threadRemoveMember
  - $threadMessageCount
examples:
  - description: Créer un thread simple
    code: $startThread[Discussion]
  - description: Thread avec durée personnalisée
    code: $startThread[Support technique;4320]
  - description: Thread sur un message spécifique
    code: $startThread[Discussion;1440;123456789]
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
