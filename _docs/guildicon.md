---
layout: doc
title: $guildIcon[]
translation_key: docs
category: "Entity Info"
function_name: guildIcon
syntax: $guildIcon
description: Alias de $serverIcon. Retourne l'URL de l'icône du serveur Discord.
---

# $guildIcon[] — Icône du Serveur (Alias)

`$guildIcon[]` est un alias de `$serverIcon[]`. Il retourne l'URL de l'icône du serveur Discord.

## Syntaxe

```
$guildIcon
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'URL directe de l'icône (format PNG/WEBP), ou une chaîne vide.

## Utilisation

### Embed avec icône

```bdfd
$title[$guildName]
$thumbnail[$guildIcon]
$description[$serverDescription]
$color[#5865F2]
$sendEmbedMessage
```

### Footer avec icône

```bdfd
$footer[$guildName;$guildIcon]
$description[Message officiel]
$color[#2ECC71]
$sendEmbedMessage
```

### Vérification d'icône

```bdfd
$if[$guildIcon==]
$sendMessage[⚠️ Ce serveur n'a pas d'icône personnalisée.]
$else
$sendMessage[✅ Icône du serveur : $guildIcon]
$endif
```

## Notes

- `$guildIcon[]` et `$serverIcon[]` sont strictement identiques.
- L'URL provient du CDN Discord et est accessible publiquement.
- Retourne une chaîne vide si le serveur n'a pas d'icône.
