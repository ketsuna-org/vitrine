---
layout: doc
title: $getUserStatus
translation_key: docs
category: "Entity Info"
function_name: getUserStatus
syntax: $getUserStatus[userID]
description: Retourne le statut en ligne (online, idle, dnd, offline) de l'utilisateur spécifié.
---

# $getUserStatus

La fonction `$getUserStatus[]` retourne le **statut de présence** d'un utilisateur sur Discord.

## Syntaxe

```
$getUserStatus[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur dont on souhaite connaître le statut. |

## Valeur de retour

- **Type** : Chaîne de caractères
- Valeurs possibles :
  - `online` — En ligne (🟢)
  - `idle` — Inactif/Absent (🟡)
  - `dnd` — Ne pas déranger (🔴)
  - `offline` — Hors ligne (⚫)
  - `invisible` — Invisible (apparaît comme hors ligne)

## Comportement

- Nécessite l'**ID utilisateur** en paramètre.
- Le statut reflète la présence en temps réel sur Discord.
- Le statut `invisible` est rapporté comme `offline` pour les autres utilisateurs.

## Exemples

### Afficher le statut avec émoji

```bdfd
$let[status;$getUserStatus[$userID]]
$if[$status==online]
  $let[emoji;🟢]
$elseif[$status==idle]
  $let[emoji;🟡]
$elseif[$status==dnd]
  $let[emoji;🔴]
$else
  $let[emoji;⚫]
$endif

$title[Statut de $userName]
$description[**Statut :** $emoji $status]
$color[#5865F2]
$sendMessage[]
```

### Vérifier le statut d'un utilisateur mentionné

```bdfd
$if[$mentioned!=]
  $let[status;$getUserStatus[$mentioned]]
  $sendMessage[<@$mentioned> est actuellement : **$status**]
$else
  $sendMessage[Mentionnez un utilisateur.]
$endif
```

### Ne pas déranger

```bdfd
$if[$getUserStatus[$mentioned]==dnd]
  $sendMessage[⚠️ Cet utilisateur est en mode Ne pas déranger.]
$endif
```

## Notes

- Le statut `offline` peut signifier que l'utilisateur est réellement déconnecté ou en mode invisible.
- Les utilisateurs peuvent masquer leur statut selon leurs paramètres de confidentialité.
- Utile pour les commandes qui nécessitent de savoir si un utilisateur est disponible (ex: envoi de messages privés conditionnels).
