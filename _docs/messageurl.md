---
layout: doc
title: $messageURL
translation_key: docs
category: "Entity Info"
function_name: messageURL
syntax: $messageURL
description: Retourne l'URL de jump (lien direct) vers le message déclencheur.
returns:
  - type: string (URL)
    description: L'URL directe vers le message (format https://discord.com/channels/...).
related:
  - $messageID
  - $message
  - $channelID
  - $guildID
examples:
  - description: Lien du message
    code: "$sendMessage[Lien : $messageURL]"
  - description: Lien cliquable en embed
    code: |
      $title[Message]
      $description[Lien : $messageURL]
      $sendMessage[]
---

# $messageURL

La fonction `$messageURL` retourne l'**URL de jump** (lien direct) vers le message qui a déclenché la commande. Ce lien permet d'accéder directement au message dans Discord.

## Syntaxe

```
$messageURL
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `string` | URL au format `https://discord.com/channels/{guildID}/{channelID}/{messageID}`. |

## Exemples

### Lien direct

```bdfd
$sendMessage[Message original : $messageURL]
```

### Dans un embed

```bdfd
$title[Message signalé]
$description[
**Auteur :** $username
**Contenu :** $message
**Lien :** [Cliquez ici]($messageURL)
]
$color[#ED4245]
$sendMessage[]
```

### Log avec lien

```bdfd
$channelSendMessage[$channelIDFromName[logs];Message de $username : $messageURL]
```

## Notes

- Format : `https://discord.com/channels/{guildID}/{channelID}/{messageID}`.
- En DM, le format utilise l'ID du salon DM.
- Le lien ne fonctionne que si l'utilisateur a accès au salon.
