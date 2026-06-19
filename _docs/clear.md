---
layout: doc
title: $clear
translation_key: docs
category: "Moderation"
function_name: clear
syntax: $clear[amount;(userID);(removePinned)]
description: Supprime un nombre spécifié de messages dans le salon.
---

# $clear

La fonction `$clear` **supprime un nombre spécifié de messages** dans le salon courant. Cette fonction est dédiée à la suppression de messages (modération), à ne pas confondre avec la fonction variable `$clear` du même nom. Le bot doit avoir la permission `ManageMessages`.

## Syntaxe

```
$clear[amount;(userID);(removePinned)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `amount` | Nombre de messages à supprimer (1-100). Obligatoire. |
| `userID` | Optionnel. Filtre : ne supprime que les messages de cet utilisateur. |
| `removePinned` | Optionnel. `"yes"` pour inclure les messages épinglés. Défaut `"no"`. |

## Valeur de retour

Aucune. Les messages sont supprimés.

## Exemples

### Suppression simple

```bdfd
$clear[50]
$sendMessage[🧹 50 messages ont été nettoyés.]
```

### Suppression ciblée par utilisateur

```bdfd
$clear[100;$mentioned[1]]
$sendMessage[🧹 Messages de <@$mentioned[1]> supprimés.]
```

### Commande de nettoyage avec vérification

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !clear <nombre>]
  $stop
$endif

$if[$isAdmin==true]
  $clear[$message[1]]
  $sendMessage[🧹 $message[1] messages supprimés.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Suppression incluant les épinglés

```bdfd
$clear[10;;yes]
$sendMessage[10 messages supprimés (épinglés inclus).]
```

## Notes

- Le bot doit avoir la permission `ManageMessages`.
- Maximum 100 messages par appel (limitation Discord).
- Les messages de plus de 14 jours ne peuvent pas être supprimés par l'API Discord.
- `removePinned` par défaut `"no"` : les messages épinglés sont ignorés.
- Si `userID` est omis, laissez le point-virgule vide (ex: `$clear[10;;yes]`).
- Cette fonction `$clear` est dédiée à la modération. Pour vider une variable, voir `$clear` dans la catégorie Variables.
