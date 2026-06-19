---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $sendMessage

Envoie le message construit avec son contenu, ses embeds et ses composants (boutons, selects).

## Syntaxe

```
$sendMessage[content]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `content` | Contenu textuel du message | Oui |

## Description

`$sendMessage` est la commande principale pour envoyer un message dans le salon où la commande a été exécutée. Si des embeds (via `$newEmbed`, `$addEmbedField`, etc.) ou des composants (via `$addActionRow`, `$addButtonCV2`, etc.) ont été construits avant cet appel, ils sont automatiquement inclus dans le message.

Le contenu textuel peut être vide (`$sendMessage[]`) si seuls des embeds ou composants sont envoyés.

## Exemples

### Message simple

```
$sendMessage[Bonjour le monde !]
```

### Avec embeds

```
$newEmbed[title=Annonce;description=Ceci est une annonce importante;color=#FF0000]
$sendMessage[]
```

### Avec boutons

```
$addActionRow
$addButtonCV2[btn_yes;Oui;success]
$addButtonCV2[btn_no;Non;danger]
$sendMessage[Confirmez-vous ?]
```

### Message complet

```
$newEmbed[title=Bienvenue;description=Bienvenue sur le serveur !;color=#00FF00]
$addActionRow
$addButtonCV2[btn_rules;Règlement;primary]
$addButtonCV2[btn_roles;Rôles;secondary]
$sendMessage[Bienvenue $username !]
```

### Réponse dans $onInteraction

```
$onInteraction
$if[$customID==btn_yes]
  $sendMessage[Vous avez confirmé !]
$endif
```

## Notes

- `$sendMessage` envoie dans le salon courant. Pour envoyer dans un autre salon, utilisez `$sendMessage[content;channelId]` (selon version) ou `$channelSendMessage`.
- Le contenu peut être vide si vous envoyez uniquement des embeds/composants.
- Dans `$onInteraction`, le message est envoyé en réponse à l'interaction.
- Fonctions de flag applicables avant `$sendMessage` : `$reply`, `$ephemeral`, `$tts`, `$noMention`, `$allowMention`.
