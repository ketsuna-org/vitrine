---
layout: doc
title: $isTimedOut
translation_key: docs
category: "Entity Info"
function_name: isTimedOut
syntax: $isTimedOut
description: Retourne "true" si l'utilisateur est actuellement en timeout (silencé temporairement) sur le serveur, "false" sinon.
---

# $isTimedOut

La variable `$isTimedOut` retourne `"true"` si l'utilisateur est actuellement en **timeout** (silence temporaire) sur le serveur.

## Syntaxe

```
$isTimedOut
```

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : l'utilisateur est en timeout
- `"false"` : l'utilisateur n'est pas en timeout

## Comportement

- `$isTimedOut` ne prend **aucun argument**.
- Le timeout est une fonctionnalité Discord qui empêche temporairement un membre de parler/envoyer des messages.
- La durée du timeout est définie par les modérateurs (jusqu'à 28 jours).

## Exemples

### Bloquer les commandes pour utilisateurs en timeout

```bdfd
$if[$isTimedOut==true]
  $sendMessage[⏳ Vous êtes actuellement en timeout. Veuillez patienter.]
  $stop
$endif
$sendMessage[Commande exécutée avec succès !]
```

### Vérification de modération

```bdfd
$title[Vérification timeout]
$description[
**Utilisateur :** $userName
**En timeout :** $isTimedOut
]
$color[#ED4245]
$sendMessage[]
```

## Notes

- Le timeout est une sanction **temporaire** (maximum 28 jours).
- Un utilisateur en timeout ne peut pas envoyer de messages, rejoindre de salons vocaux, ni réagir.
- Utile pour empêcher les utilisateurs sanctionnés d'utiliser les commandes du bot.
