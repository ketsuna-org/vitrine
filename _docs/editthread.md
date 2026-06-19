---
layout: doc
title: $editThread
translation_key: docs
category: "Moderation"
function_name: editThread
syntax: $editThread[threadID;name;(archived);(locked);(autoArchiveDuration)]
description: Modifie les propriétés d'un fil de discussion existant : nom, statut d'archivage, verrouillage et durée d'archivage automatique.
parameters:
  - name: threadID
    description: L'ID du thread à modifier.
  - name: name
    description: Le nouveau nom du thread.
  - name: archived
    description: (Optionnel) true/false pour archiver ou désarchiver le thread.
  - name: locked
    description: (Optionnel) true/false pour verrouiller ou déverrouiller le thread.
  - name: autoArchiveDuration
    description: (Optionnel) Nouvelle durée d'archivage automatique (60, 1440, 4320, 10080).
returns:
  - type: aucun
    description: Ne retourne rien. Le thread est modifié silencieusement.
related:
  - $startThread
  - $threadAddMember
  - $threadMessageCount
examples:
  - description: Renommer un thread
    code: $editThread[$threadID;Nouveau nom]
  - description: Archiver un thread
    code: $editThread[$threadID;Discussion;true]
  - description: Déverrouiller un thread
    code: $editThread[$threadID;Support;false;false]
---

# $editThread

La fonction `$editThread[]` permet de **modifier les propriétés d'un thread** existant : nom, archivage, verrouillage et durée d'archivage.

## Syntaxe

```
$editThread[threadID;name;(archived);(locked);(autoArchiveDuration)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `threadID` | L'ID du thread à modifier. |
| `name` | Nouveau nom du thread (1 à 100 caractères). |
| `archived` | Optionnel - `true` pour archiver, `false` pour désarchiver. |
| `locked` | Optionnel - `true` pour verrouiller, `false` pour déverrouiller. |
| `autoArchiveDuration` | Optionnel - Nouvelle durée : 60, 1440, 4320 ou 10080 minutes. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Le bot doit avoir la permission `MANAGE_THREADS`.
- L'archivage cache le thread de la liste des threads actifs.
- Le verrouillage empêche les nouveaux messages dans le thread.

## Exemples

### Fermer un thread de support

```bdfd
$editThread[$threadID;[$résolu] Support;true;true]
$channelSendMessage[$threadID;Ce thread a été marqué comme résolu et verrouillé.]
$sendMessage[Thread fermé.]
```

### Désarchiver un thread

```bdfd
$editThread[$threadID;Support actif;false;false;10080]
$channelSendMessage[$threadID;Thread réouvert pour discussion.]
```

### Renommer selon le sujet

```bdfd
$let[newName;[FAQ] $noMentionMessage]
$editThread[$threadID;$newName]
$sendMessage[Thread renommé en : $newName]
```

## Notes

- Un thread archivé ne peut pas recevoir de nouveaux messages tant qu'il n'est pas désarchivé.
- Les threads verrouillés peuvent être déverrouillés avec `locked=false`.
- La durée d'archivage est ignorée si le thread est déjà archivé manuellement.
