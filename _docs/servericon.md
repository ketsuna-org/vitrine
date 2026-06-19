---
layout: doc
title: $serverIcon[]
translation_key: docs
category: "Entity Info"
function_name: serverIcon
syntax: $serverIcon
description: Retourne l'URL de l'icône du serveur Discord.
parameters: []
returns:
  type: string
  description: L'URL de l'icône du serveur. Retourne une chaîne vide si le serveur n'a pas d'icône personnalisée.
related:
  - $guildIcon
  - $serverBanner
  - $serverSplash
  - $authorAvatar
examples:
  - description: Afficher l'icône du serveur dans un embed
    code: |
      $title[$serverName]
      $description[Icône du serveur]
      $image[$serverIcon]
      $color[#5865F2]
      $sendEmbedMessage
  - description: Utiliser comme thumbnail
    code: |
      $title[Bienvenue sur $serverName]
      $thumbnail[$serverIcon]
      $description[Voici notre serveur !]
      $color[#2ECC71]
      $sendEmbedMessage
---

# $serverIcon[] — Icône du Serveur

`$serverIcon[]` retourne l'URL de l'icône du serveur Discord. Si le serveur n'a pas d'icône personnalisée, la fonction retourne une chaîne vide.

## Syntaxe

```
$serverIcon
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'URL directe de l'icône du serveur (format PNG ou WEBP), ou une chaîne vide si aucune icône n'est définie.

## Utilisation

### Icône dans un embed

```bdfd
$title[$serverName]
$description[Voici l'icône de notre serveur]
$image[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Thumbnail dans un message de bienvenue

```bdfd
$title[Bienvenue !]
$thumbnail[$serverIcon]
$description[Bienvenue sur $serverName, $username !]
$addField[Membres;$membersCount;yes]
$color[#2ECC71]
$sendEmbedMessage
```

### Vérifier si le serveur a une icône

```bdfd
$if[$serverIcon==]
$sendMessage[Ce serveur n'a pas d'icône personnalisée.]
$else
$sendMessage[Icône du serveur : $serverIcon]
$endif
```

### Footer avec icône

```bdfd
$footer[$serverName;$serverIcon]
$description[Message officiel du serveur]
$color[#F1C40F]
$sendEmbedMessage
```

## Notes

- `$serverIcon[]` est un alias de `$guildIcon[]`.
- L'URL retournée est une URL Discord CDN directe, accessible publiquement.
- Si le serveur n'a pas d'icône, la fonction retourne une chaîne vide (``).
- L'URL peut être utilisée dans `$image[]`, `$thumbnail[]`, `$footer[]` ou `$author[text;;$serverIcon]`.
