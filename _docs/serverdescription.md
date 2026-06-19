---
layout: doc
title: $serverDescription[]
translation_key: docs
category: "Entity Info"
function_name: serverDescription
syntax: $serverDescription
description: Retourne la description du serveur Discord (configurée dans les paramètres du serveur).
parameters: []
returns:
  type: string
  description: La description du serveur. Retourne une chaîne vide si aucune description n'est définie.
related:
  - $serverName
  - $serverInfo
  - $serverFeatures
examples:
  - description: Afficher la description du serveur
    code: |
      $sendMessage[Description du serveur : $serverDescription]
  - description: Embed avec description
    code: |
      $title[À propos de $serverName]
      $description[$serverDescription]
      $color[#5865F2]
      $sendEmbedMessage
---

# $serverDescription[] — Description du Serveur

`$serverDescription[]` retourne la description textuelle du serveur Discord telle que configurée dans les paramètres du serveur (section "Aperçu").

## Syntaxe

```
$serverDescription
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- La description du serveur, ou une chaîne vide si aucune description n'est définie.

## Utilisation

### Afficher la description

```bdfd
$sendMessage[📝 Description : $serverDescription]
```

### Embed informatif

```bdfd
$title[$serverName]
$description[$serverDescription]
$addField[Propriétaire;<@$serverOwner>;yes]
$addField[Membres;$membersCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Vérifier si une description existe

```bdfd
$if[$serverDescription==]
$sendMessage[Ce serveur n'a pas de description.]
$else
$sendMessage[**$serverName** : $serverDescription]
$endif
```

### Restreindre par mot-clé dans la description

```bdfd
$if[$toLowercase[$serverDescription]$contains[gaming]]
$sendMessage[Ce serveur est dédié au gaming !]
$else
$sendMessage[Ce serveur n'est pas catégorisé gaming.]
$endif
```

## Notes

- La description est optionnelle : tous les serveurs n'en ont pas.
- La longueur maximale d'une description de serveur est de 1000 caractères.
- Utile pour afficher des informations contextuelles sur le serveur dans des embeds ou des commandes d'aide.
- Peut être combinée avec `$serverInfo[]` pour obtenir des informations plus complètes.
