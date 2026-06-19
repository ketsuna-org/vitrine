---
layout: doc
title: $getCustomStatus
translation_key: docs
category: "Entity Info"
function_name: getCustomStatus
syntax: $getCustomStatus[(userID)]
description: Récupère le statut personnalisé (texte et emoji) d'un utilisateur Discord. Retourne le texte du statut personnalisé.
parameters:
  - name: userID
    description: (Optionnel) L'ID de l'utilisateur. Par défaut, l'auteur de la commande.
returns:
  - type: string
    description: Le texte du statut personnalisé, ou une chaîne vide si aucun statut personnalisé n'est défini.
related:
  - $userStatus
  - $hypeSquad
  - $userInfo
examples:
  - description: Son propre statut personnalisé
    code: $getCustomStatus
  - description: Statut d'un autre utilisateur
    code: $getCustomStatus[$mentioned[1]]
---

# $getCustomStatus

La fonction `$getCustomStatus[]` permet de **récupérer le statut personnalisé** d'un utilisateur Discord. Le statut personnalisé est un texte libre (et éventuellement un emoji) que l'utilisateur définit dans son profil.

## Syntaxe

```
$getCustomStatus[(userID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Optionnel - L'ID de l'utilisateur cible. Par défaut l'auteur de la commande. |

## Valeur de retour

- **Type** : String
- Le texte du statut personnalisé de l'utilisateur.
- Chaîne vide si l'utilisateur n'a pas défini de statut personnalisé.

## Comportement

- Lit le statut personnalisé depuis la présence Discord de l'utilisateur.
- Ne retourne que le texte, pas l'emoji éventuellement associé.
- L'utilisateur doit être visible par le bot (partage de serveur, présence accessible).

## Exemples

### Affichage simple

```bdfd
$title[💬 Statut personnalisé]
$let[status;$getCustomStatus[$authorID]]
$if[$status!=]
  Votre statut personnalisé : **$status**
$else
  Vous n'avez pas défini de statut personnalisé.
$endif
$sendMessage[]
```

### Carte de profil enrichie

```bdfd
$title[👤 $userName[$mentioned[1]]]
$description[
**Statut :** $userStatus[$mentioned[1]]
**Statut perso :** $getCustomStatus[$mentioned[1]]
**HypeSquad :** $hypeSquad[$mentioned[1]]
]
$thumbnail[$userAvatar[$mentioned[1]]]
$color[#5865F2]
$sendMessage[]
```

### Log de changement de statut

```bdfd
$let[newStatus;$getCustomStatus[$authorID]]
$if[$newStatus!=]
  📝 **$userName** a changé son statut personnalisé : *$newStatus*
$endif
```

## Notes

- Le statut personnalisé est distinct du statut de présence (en ligne, occupé, etc.) qui est récupéré via `$userStatus[]`.
- Si l'utilisateur a défini un emoji dans son statut, seul le texte est retourné.
- Le statut personnalisé peut contenir jusqu'à 128 caractères.
