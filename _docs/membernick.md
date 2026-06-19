---
layout: doc
title: $memberNick
translation_key: docs
category: "Entity Info"
function_name: memberNick
syntax: $memberNick
description: Retourne le pseudo (surnom) du membre sur le serveur. Équivalent à $nickname.
parameters: []
returns:
  - type: string
    description: Le pseudo serveur du membre, ou chaîne vide si aucun pseudo.
related:
  - $nickname
  - $displayName
  - $memberID
  - $memberPerms
examples:
  - description: Obtenir le pseudo du membre
    code: $memberNick
  - description: Afficher le pseudo dans un embed
    code: |
      $title[Profil de $memberNick]
      $description[ID : $memberID]
      $color[#5865F2]
      $sendMessage[]
---

# $memberNick

La variable `$memberNick` retourne le **pseudo (surnom)** du membre sur le serveur actuel. Elle est équivalente à `$nickname`.

## Syntaxe

```
$memberNick
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Le pseudo serveur du membre si défini, sinon une **chaîne vide**

## Comportement

- `$memberNick` ne prend **aucun argument**.
- Fonctionnellement identique à `$nickname`.
- Retourne uniquement le pseudo **spécifique au serveur**.

## Exemples

### Message avec pseudo

```bdfd
$if[$memberNick!=]
  $sendMessage[Bonjour $memberNick !]
$else
  $sendMessage[Bonjour $userName !]
$endif
```

### Embed membre

```bdfd
$title[Informations membre]
$author[$memberNick;$userAvatar]
$description[
**ID :** $memberID
**Permissions :** $memberPerms
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$memberNick` et `$nickname` sont interchangeables.
- Pour l'affichage général, `$displayName` est recommandé car il ne retourne jamais une chaîne vide.
