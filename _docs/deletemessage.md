---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $deleteMessage

Supprime un message spécifique. Le bot doit avoir la permission de gérer les messages dans le salon.

## Syntaxe

```
$deleteMessage[messageId]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `messageId` | ID du message à supprimer | Oui |

## Description

`$deleteMessage` supprime définitivement un message Discord. Le bot doit disposer de la permission `MANAGE_MESSAGES` pour supprimer les messages d'autres utilisateurs. Il peut toujours supprimer ses propres messages.

## Exemples

### Suppression du message déclencheur

```
$deleteMessage[$messageID]
Commande exécutée discrètement.
```

### Suppression après action

```
$sendMessage[Traitement en cours...]
$wait[3s]
$deleteMessage[$sentMessageId]
$sendMessage[Traitement terminé !]
```

### Suppression dans une interaction

```
$onInteraction
$if[$customID==btn_delete]
  $deleteMessage[$messageID]
  $sendMessage[Message supprimé][ephemeral]
$endif
```

### Suppression d'un message spécifique

```
$deleteMessage[123456789012345678]
```

## Notes

- Le paramètre `messageId` est obligatoire.
- Le bot doit avoir `MANAGE_MESSAGES` pour supprimer les messages des autres.
- Les messages supprimés ne peuvent pas être récupérés.
- Pour supprimer le message de l'utilisateur qui a exécuté la commande, utilisez `$messageID`.
- Après suppression, il est courant d'envoyer une confirmation éphémère.
