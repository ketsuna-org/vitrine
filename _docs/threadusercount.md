---
layout: doc
title: $threadUserCount
translation_key: docs
category: "Moderation"
function_name: threadUserCount
syntax: $threadUserCount[threadID]
description: Retourne le nombre de membres dans un fil de discussion (thread). Utile pour suivre la participation aux discussions.
parameters:
  - name: threadID
    description: L'ID du thread dont on souhaite connaître le nombre de membres.
returns:
  - type: integer
    description: Le nombre de membres dans le thread. Retourne 0 si le thread est vide ou inaccessible.
related:
  - $threadMessageCount
  - $threadAddMember
  - $threadRemoveMember
examples:
  - description: Compter les membres d'un thread
    code: $threadUserCount[$threadID]
---

# $threadUserCount

La fonction `$threadUserCount[]` permet de **compter le nombre de membres** présents dans un fil de discussion.

## Syntaxe

```
$threadUserCount[threadID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `threadID` | L'ID du thread à analyser. |

## Valeur de retour

- **Type** : Nombre entier
- Le nombre de membres dans le thread.
- `0` si le thread est vide ou inaccessible.

## Comportement

- Compte tous les utilisateurs ayant rejoint le thread (public) ou y ayant été ajoutés (privé).
- Inclut le bot lui-même s'il a rejoint le thread.
- Le bot doit avoir accès au thread.

## Exemples

### Résumé de thread

```bdfd
$title[Activité du thread]
$description[
**Membres :** $threadUserCount[$threadID] participants
**Messages :** $threadMessageCount[$threadID] messages
]
$color[#57F287]
$sendMessage[]
```

### Alerte de popularité

```bdfd
$let[userCount;$threadUserCount[$threadID]]
$if[$userCount>=10]
  $sendMessage[Ce thread a attiré $userCount participants ! 🔥]
$endif
```

### Surveillance de participation

```bdfd
$let[members;$threadUserCount[$threadID]]
$let[messages;$threadMessageCount[$threadID]]
$let[ratio;$round[$divide[$messages;$members]]]
$sendMessage[Moyenne de $ratio messages par participant.]
```

## Notes

- Dans les threads publics, le compte inclut tous les utilisateurs ayant ouvert le thread.
- Utile avec `$threadMessageCount[]` pour évaluer l'engagement.
- Les membres qui quittent un thread public ne sont plus comptés.
