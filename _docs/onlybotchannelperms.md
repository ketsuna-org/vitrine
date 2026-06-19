---
layout: doc
title: $onlyBotChannelPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotChannelPerms
syntax: $onlyBotChannelPerms[permission1;permission2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si le bot ne possède pas les permissions spécifiées dans le channel courant.
---

# $onlyBotChannelPerms

La fonction guard `$onlyBotChannelPerms` vérifie que le **bot** possède les permissions spécifiées **dans le channel courant**. Contrairement à `$onlyBotPerms` qui vérifie les permissions globales au serveur, cette fonction vérifie les overwrites de channel.

## Syntaxe

```
$onlyBotChannelPerms[permission1;permission2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | Permissions de channel que le bot doit avoir dans ce channel. Séparateur `;`. |
| `errorMessage` | String (optionnel) | Message envoyé si le bot manque de permissions. |

## Comportement

- Vérifie les permissions effectives du bot dans le **channel où la commande est exécutée**.
- Prend en compte les overwrites de channel (permissions spécifiques modifiant l'héritage des rôles).
- Si une permission manque, la commande est interrompue.
- Fonctionne même si le bot a la permission au niveau serveur mais que le channel a un overwrite de refus.

## Exemples

### Vérifier la capacité d'envoyer des embeds

```bdfd
$onlyBotChannelPerms[SendMessages;EmbedLinks;❌ Je ne peux pas poster d'embeds dans ce salon.]
$title[Annonce]
$description[Ceci est une annonce importante.]
$color[#5865F2]
$sendMessage[]
```

### Vérifier les permissions vocales

```bdfd
$onlyBotChannelPerms[Connect;Speak;❌ Je n'ai pas accès à ce salon vocal.]
$joinVC[$voiceChannelID]
$sendMessage[Connexion au salon vocal...]
```

### Upload de fichiers

```bdfd
$onlyBotChannelPerms[AttachFiles;❌ Je ne peux pas envoyer de fichiers ici.]
$attachment[./rapport.pdf]
$sendMessage[Voici le rapport.]
```

## Notes

- `$onlyBotChannelPerms` vérifie les permissions de **channel**, `$onlyBotPerms` vérifie les permissions de **serveur**.
- Les permissions de channel incluent : `SendMessages`, `EmbedLinks`, `AttachFiles`, `AddReactions`, `UseExternalEmojis`, `Connect`, `Speak`, `Stream`, `UseVAD`, `PrioritySpeaker`, `MuteMembers`, `DeafenMembers`, `MoveMembers`, `ViewChannel`, `ReadMessageHistory`, `SendTTSMessages`, `UseApplicationCommands`, `ManageMessages`, `ManageChannels`, `CreateInstantInvite`, `UseEmbeddedActivities`.
- Combinez avec `$onlyBotPerms` pour une vérification complète (serveur + channel).
