---
layout: doc
title: $onlyBotChannelPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotChannelPerms
syntax: $onlyBotChannelPerms[permission1;permission2;...;(errorMessage)]
description: Function guard qui stops l'exécution si the bot ne possède pas les permissions spécifiées in the channel courant.
---

# $onlyBotChannelPerms

The function guard `$onlyBotChannelPerms` vérifie que le **bot** possède les permissions spécifiées **in the channel courant**. Contrairement à `$onlyBotPerms` qui vérifie les permissions globals au server, this function vérifie les overwrites de channel.

## Syntax

```
$onlyBotChannelPerms[permission1;permission2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | Permissions de channel que the bot doit avoir dans ce channel. Separator `;`. |
| `errorMessage` | String (optional) | Message sent si the bot manque de permissions. |

## Behavior

- Checks les permissions effectives of the bot in the **channel où the command est executed**.
- Prend en compte les overwrites de channel (permissions spécifiques modifiant l'héritage des roles).
- Si une permission manque, the command est interrompue.
- Functionne even if the bot a la permission au level server mais que le channel a un overwrite de refus.

## Examples

### Vérifier la capacité d'envoyer embeds

```bdfd
$onlyBotChannelPerms[SendMessages;EmbedLinks;❌ Je ne peux pas poster d'embeds dans ce channel.]
$title[Annonce]
$description[Ceci est une annonce importante.]
$color[#5865F2]
$sendMessage[]
```

### Vérifier les permissions vocales

```bdfd
$onlyBotChannelPerms[Connect;Speak;❌ Je n'ai pas accès à ce channel vocal.]
$joinVC[$voiceChannelID]
$sendMessage[Connexion au channel vocal...]
```

### Upload de files

```bdfd
$onlyBotChannelPerms[AttachFiles;❌ Je ne peux pas envoyer de files ici.]
$attachment[./rapport.pdf]
$sendMessage[Voici le rapport.]
```

## Notes

- `$onlyBotChannelPerms` vérifie les permissions de **channel**, `$onlyBotPerms` vérifie les permissions de **server**.
- Les permissions de channel incluent : `SendMessages`, `EmbedLinks`, `AttachFiles`, `AddReactions`, `UseExternalEmojis`, `Connect`, `Speak`, `Stream`, `UseVAD`, `PrioritySpeaker`, `MuteMembers`, `DeafenMembers`, `MoveMembers`, `ViewChannel`, `ReadMessageHistory`, `SendTTSMessages`, `UseApplicationCommands`, `ManageMessages`, `ManageChannels`, `CreateInstantInvite`, `UseEmbeddedActivities`.
- Combinez avec `$onlyBotPerms` for ae vérification complete (server + channel).
