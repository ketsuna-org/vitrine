---
layout: doc
title: $ignoreChannels
translation_key: docs
category: "Moderation"
function_name: ignoreChannels
syntax: $ignoreChannels[channelID1;channelID2;...]
description: Fonction guard qui ignore silencieusement l'exécution de la commande si elle est déclenchée dans l'un des channels listés.
parameters:
  - name: channelID1, channelID2, ...
    description: Liste des IDs de channels à ignorer (blacklist).
returns: []
related:
  - $onlyForChannels
  - $onlyForCategories
  - $ignoreLinks
  - $channelID
examples:
  - description: Ignorer la commande dans un salon spécifique
    code: |
      $ignoreChannels[123456789012345678]
      $sendMessage[Commande exécutable partout sauf salon interdit.]
  - description: Ignorer plusieurs salons
    code: |
      $ignoreChannels[111;222;333]
      $sendMessage[OK.]
---

# $ignoreChannels

La fonction guard `$ignoreChannels` interrompt **silencieusement** l'exécution de la commande si elle est utilisée dans l'un des channels spécifiés. Contrairement à `$onlyForChannels` qui fait une whitelist, `$ignoreChannels` fait une **blacklist** de salons.

## Syntaxe

```
$ignoreChannels[channelID1;channelID2;...]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `channelID1;channelID2;...` | Snowflake[] | IDs des channels à ignorer, séparés par `;`. |

## Comportement

- Si le channel courant est dans la liste, la commande est interrompue **sans aucun message** (silence total).
- Si le channel n'est pas dans la liste, la commande continue normalement.
- Aucun message d'erreur n'est supporté — le guard est strictement silencieux.

## Exemples

### Interdire les salons de discussion générale

```bdfd
$ignoreChannels[123456789012345678]
$sendMessage[Commande de modération exécutée.]
```

### Plusieurs salons blacklistés

```bdfd
$ignoreChannels[111111111111111111;222222222222222222;333333333333333333]
$ban[$mentioned[1]]
```

### Ignorer les salons d'annonces

```bdfd
$ignoreChannels[123456789012345678;987654321098765432]
$sendMessage[Action effectuée.]
```

## Notes

- `$ignoreChannels` est une **blacklist** silencieuse. Pour une **whitelist** avec message d'erreur, utilisez `$onlyForChannels`.
- Aucun message d'erreur n'est envoyé à l'utilisateur. Si vous voulez notifier l'utilisateur, utilisez `$onlyForChannels` avec un message d'erreur.
- À placer en début de commande, avant toute autre logique.
- Pratique pour désactiver des commandes dans des salons spécifiques sans spammer les utilisateurs.
