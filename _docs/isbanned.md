---
layout: doc
title: $isBanned
translation_key: docs
category: "Math & Text"
function_name: isBanned
syntax: $isBanned[userID]
description: Vérifie si un utilisateur est banni du serveur courant.
---

# $isBanned

La fonction `$isBanned[userID]` **vérifie si un utilisateur est actuellement banni** du serveur où la commande est exécutée. Le bot doit avoir la permission `BanMembers`.

## Syntaxe

```
$isBanned[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur à vérifier. |

## Valeur de retour

- **Type** : Booléen
- `true` si l'utilisateur est banni du serveur.
- `false` si l'utilisateur n'est pas banni ou n'existe pas.

## Comportement

- Le bot a besoin de la permission `BanMembers` pour consulter la liste des bannis.
- Fonctionne même si l'utilisateur a quitté le serveur.
- Vérifie uniquement le serveur courant.

## Exemples

### Vérification avant commande

```bdfd
$if[$isBanned[$mentioned[1]]==true]
  $sendMessage[⚠️ <@$mentioned[1]> est déjà banni de ce serveur.]
$else
  $ban[$mentioned[1];Raison fournie par $userName]
  $sendMessage[🔨 <@$mentioned[1]> a été banni.]
$endif
```

### Débannir un utilisateur

```bdfd
$if[$isBanned[$message[1]]==true]
  $unban[$message[1]]
  $sendMessage[✅ L'utilisateur $message[1] a été débanni.]
$else
  $sendMessage[❌ Cet ID n'est pas banni.]
$endif
```

### Log de vérification

```bdfd
$var[userID;$message[1]]
$if[$isBanned[$var[userID]]==true]
  $var[raison;$getBanReason[$var[userID]]]
  $sendMessage[📋 **Bannissement trouvé :**
  > ID : $var[userID]
  > Raison : $var[raison]]
$else
  $sendMessage[✅ Aucun bannissement pour $var[userID].]
$endif
```

## Notes

- Le bot doit avoir `BanMembers` pour que cette fonction retourne un résultat fiable.
- Pour obtenir la raison du bannissement, utilisez `$getBanReason[]`.
- Pour bannir/débannir, utilisez `$ban[]` / `$unban[]`.
- Fonctionne uniquement dans un contexte de serveur (pas en DM).
