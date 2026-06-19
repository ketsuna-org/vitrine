---
layout: doc
title: $findUser
translation_key: docs
category: "Entity Info"
function_name: findUser
syntax: $findUser[name/mention/ID]
description: Recherche un utilisateur par nom, mention ou ID et retourne son ID Discord. Retourne une chaîne vide si aucun utilisateur n'est trouvé.
parameters:
  - name: query
    description: Le nom d'utilisateur (partiel ou complet), la mention (<@ID>) ou l'ID de l'utilisateur à rechercher.
returns:
  - type: snowflake (string)
    description: L'ID de l'utilisateur trouvé, ou chaîne vide si aucun résultat.
related:
  - $userExists
  - $userInfo
  - $mentioned
  - $userID
examples:
  - description: Rechercher par nom
    code: $findUser[Jean]
  - description: Rechercher par mention
    code: $findUser[<@123456789012345678>]
  - description: Rechercher par ID
    code: $findUser[123456789012345678]
  - description: Utiliser le résultat
    code: |
      $let[target;$findUser[$message]]
      $if[$target!=]
        $sendMessage[Utilisateur trouvé : <@$target>]
      $else
        $sendMessage[Aucun utilisateur trouvé.]
      $endif
---

# $findUser

La fonction `$findUser[]` permet de **rechercher un utilisateur** par son nom, sa mention ou son ID. Elle retourne l'ID Discord de l'utilisateur trouvé.

## Syntaxe

```
$findUser[name/mention/ID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `query` | Le terme de recherche : nom d'utilisateur (partiel ou complet), mention brute (`<@ID>`) ou ID numérique. |

## Valeur de retour

- **Type** : Snowflake (chaîne numérique) ou chaîne vide
- L'ID de l'utilisateur correspondant
- Chaîne vide si aucun utilisateur n'est trouvé

## Comportement

- La recherche par nom est **insensible à la casse**.
- La recherche par nom peut être **partielle** (ex: `"Jean"` trouve `"JeanDupont"`).
- La recherche s'effectue parmi les utilisateurs connus du bot (cache des serveurs partagés).
- Priorité de correspondance : mention exacte > ID exact > nom d'utilisateur > pseudo serveur.

## Exemples

### Recherche par argument de commande

```bdfd
$let[target;$findUser[$message]]
$if[$target!=]
  $title[Utilisateur trouvé]
  $description[
  **ID :** $target
  **Nom :** $userName[$target]
  ]
  $thumbnail[$userAvatar[$target]]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Aucun utilisateur trouvé pour "$message".]
$endif
```

### Recherche et action

```bdfd
$let[target;$findUser[$message[1]]]
$if[$target!=]
  $if[$checkContains[$userPerms;KickMembers]==true]
    $kick[$target]
    $sendMessage[$userName[$target] a été expulsé.]
  $endif
$else
  $sendMessage[Utilisateur introuvable.]
$endif
```

### Recherche avec fallback

```bdfd
$let[target;$findUser[$message]]
$if[$target!=]
  $sendMessage[Utilisateur : $userName[$target]]
$else
  $sendMessage[Utilisateur non trouvé. Utilisation de l'auteur par défaut.]
  $let[target;$authorID]
$endif
```

## Notes

- `$findUser[]` est plus flexible que `$mentioned` car il accepte les noms partiels.
- Vérifiez toujours le résultat (non vide) avant d'utiliser l'ID retourné.
- Utile pour les commandes où l'utilisateur peut fournir un nom, un ID ou une mention.
- La recherche est limitée aux utilisateurs que le bot "connaît" (présents sur les serveurs communs).
