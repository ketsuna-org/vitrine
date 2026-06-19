---
layout: doc
title: $findUser
translation_key: docs
category: "Entity Info"
function_name: findUser
syntax: $findUser[name/mention/ID]
description: Recherche un user par nom, mention or ID and retourne son ID Discord. Returns ae string vide si no user n'est found.
---

# $findUser

The function `$findUser[]` allows **rechercher un user** par son nom, sa mention or son ID. Elle retourne the ID Discord of the user found.

## Syntax

```
$findUser[name/mention/ID]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | Le terme of recherche : nom of user (partial or complete), mention brute (`<@ID>`) or ID numérique. |

## Return Value

- **Type** : Snowflake (string numérique) or string vide
- The ID of the user correspondant
- String vide si no user n'est found

## Behavior

- La recherche par nom est **insensible to la casse**.
- La recherche par nom can be **partialle** (ex: `"Jean"` trouve `"JeanDupont"`).
- La recherche s'effectue parmi les users connus of the bot (cache servers partagés).
- Priorité of correspondance : mention exact > ID exact > nom of user > pseudo server.

## Examples

### Recherche par argument of command

```bdfd
$let[target;$findUser[$message]]
$if[$target!=]
  $title[User found]
  $description[
  **ID :** $target
  **Nom :** $userName[$target]
  ]
  $thumbnail[$userAvatar[$target]]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Aucun user found pour "$message".]
$endif
```

### Recherche and action

```bdfd
$let[target;$findUser[$message[1]]]
$if[$target!=]
  $if[$checkContains[$userPerms;KickMembers]==true]
    $kick[$target]
    $sendMessage[$userName[$target] was expulsé.]
  $endif
$else
  $sendMessage[User introuvable.]
$endif
```

### Recherche with fallback

```bdfd
$let[target;$findUser[$message]]
$if[$target!=]
  $sendMessage[User : $userName[$target]]
$else
  $sendMessage[User non found. Utilisation of l'auteur default.]
  $let[target;$authorID]
$endif
```

## Notes

- `$findUser[]` est plus flexible que `$mentioned` because il accepte les noms partials.
- Vérifiez toudays the result (non vide) before of use the ID retourné.
- Utile for the commands où the user peut provide a nom, un ID or une mention.
- La recherche est limitée to the users que the bot "connaît" (présents on the servers communs).
