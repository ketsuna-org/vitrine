---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $reply

Marque le message comme une réponse (reply) à un message existant. S'utilise avant `$sendMessage`.

## Syntaxe

### Répondre au message de l'utilisateur (0 argument)

```
$reply
```

### Répondre à un message spécifique

```
$reply[channelId;messageId]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `channelId` | ID du salon contenant le message cible | Non* |
| `messageId` | ID du message auquel répondre | Non* |

*\* Obligatoires uniquement pour répondre à un message spécifique dans un salon précis.*

## Description

`$reply` est un **flag** qui s'utilise avant `$sendMessage`. Il indique que le message doit être envoyé en tant que réponse (replies Discord), ce qui affiche le message original au-dessus de la réponse.

Sans arguments, `$reply` répond au message qui a déclenché la commande ou l'interaction.

## Exemples

### Réponse simple

```
$reply
$sendMessage[Voici votre réponse !]
```

### Réponse à un message spécifique

```
$reply[$channelID;123456789012345678]
$sendMessage[Réponse à un message précis]
```

### Réponse dans $onInteraction

```
$onInteraction
$if[$customID==btn_help]
  $reply
  $sendMessage[Voici l'aide demandée]
$endif
```

### Réponse avec embeds

```
$reply
$newEmbed[title=Réponse;description=Détails de la réponse;color=#3498DB]
$sendMessage[]
```

## Notes

- Sans argument, `$reply` utilise automatiquement le message déclencheur.
- `$reply` doit être placé avant `$sendMessage`.
- La réponse ping l'utilisateur par défaut. Utilisez `$noMention` avant pour désactiver le ping.
- Fonctionne aussi dans `$onInteraction`.
