---
layout: doc
title: "$clear — fonction BDScript"
category: "Modération"
function_name: clear
syntax: $clear[(amount);(userID);(removePinned)]
description: "Supprime un nombre donné de messages dans le salon."
locale: fr
lang: fr
content_language: fr
translation_key: doc-clear
permalink: /fr/docs/clear/
sidebar_context: docs_fr
category_key: "Moderation"
---

# $clear

La fonction `$clear` **supprime un nombre donné de messages** dans le salon actuel. Le bot doit avoir les permissions `Manage Messages` et `Read Message History`.

## Syntaxe

```
$clear[(amount);(userID);(removePinned)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `amount` | Nombre de messages à supprimer (1-100). Si elle est écrite sans crochets (`$clear`), le premier argument de la commande est utilisé. Un `$clear[]` vide, une valeur non numérique ou une valeur hors de 1-100 lève l'erreur `$clear amount must be between 1 and 100.` |
| `userID` | Optionnel. Filtre : ne supprime que les messages de cet utilisateur. Doit être un ID positif lorsqu'il n'est pas vide, sinon `Invalid user ID.` est levée. |
| `removePinned` | Optionnel. `"no"`, `"false"`, `"0"` ou `"n"` pour conserver les messages épinglés. Toute autre valeur, y compris une valeur vide, supprime aussi les messages épinglés. Comportement par défaut : les messages épinglés sont supprimés. |

## Valeur de retour

Aucune (chaîne vide). Les messages sont supprimés.

## Exemples

### Suppression simple

```bdfd
$clear[50]
$sendMessage[🧹 50 messages have been cleared.]
```

### Suppression ciblée par utilisateur

```bdfd
$clear[100;$mentioned[1]]
$sendMessage[🧹 Messages from <@$mentioned[1]> deleted.]
```

### Commande clear avec vérification

```bdfd
$argsCheck[>=1;Usage: !clear <number>]

$if[$isAdmin[$authorID]==true]
  $clear[$message[1]]
  $sendMessage[🧹 $message[1] messages deleted.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Conserver les messages épinglés

```bdfd
$clear[10;;no]
$sendMessage[10 messages deleted (pinned messages kept).]
```

## Remarques

- Le bot doit avoir les permissions `Manage Messages` et `Read Message History` sur le serveur ; sinon une erreur est levée.
- Maximum de 100 messages par appel (les valeurs hors de 1-100 sont rejetées).
- Les messages les plus récents du salon sont examinés (et filtrés selon `userID` / `removePinned`) jusqu'à ce que `amount` messages correspondants soient trouvés. Le message qui a déclenché la commande n'est pas exclu : dans une commande à préfixe, il compte donc parmi les messages.
- Les messages de moins de 14 jours sont supprimés en masse ; les plus anciens, ainsi qu'un éventuel message isolé restant, sont supprimés un par un. Un message qui ne peut pas être supprimé est ignoré sans erreur.
- Le salon doit être un salon textuel, sinon une erreur est levée.
- Les messages épinglés sont supprimés, sauf si `removePinned` vaut `"no"`, `"false"`, `"0"` ou `"n"`.
- Pour définir `removePinned` sans filtrer par utilisateur, laissez le champ `userID` vide (par exemple `$clear[10;;no]`).
