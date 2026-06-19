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

The function guard `$onlyBotChannelPerms` vérifie que le **bot** possède les permissions spécifiées **in the channel courant**. Contrairement to `$onlyBotPerms` qui vérifie les permissions globals to the server, this function vérifie les overwrites of channel.

## Syntax

```
$onlyBotChannelPerms[permission1;permission2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | Permissions of channel que the bot doit avoir in ce channel. Separator `;`. |
| `errorMessage` | String (optional) | Message sent si the bot manque of permissions. |

## Behavior

- Checks les permissions effectives of the bot in the **channel où the command est executed**.
- Prend en compte les overwrites of channel (permissions specifics modifiant l'héritage roles).
- Si une permission manque, the command est interrompue.
- Functionne even if the bot a la permission to the level server mais que le channel a un overwrite of refus.

## Examples

### Vérifier la capacité of envoyer embeds

```bdfd
$onlyBotChannelPerms[SendMessages;EmbedLinks;❌ Je ne peux pas poster of embeds in ce channel.]
$title[Annonce]
$description[Ceci est une annonce importante.]
$color[#5865F2]
$sendMessage[]
```

### Vérifier les permissions vocales

```bdfd
$onlyBotChannelPerms[Connect;Speak;❌ Je n'ai pas accès to ce channel vocal.]
$joinVC[$voiceChannelID]
$sendMessage[Connexion to the channel vocal...]
```

### Upload of files

```bdfd
$onlyBotChannelPerms[AttachFiles;❌ Je ne peux pas envoyer of files ici.]
$attachment[./rapport.pdf]
$sendMessage[Voici le rapport.]
```

## Notes

- `$onlyBotChannelPerms` vérifie les permissions of **channel**, `$onlyBotPerms` vérifie les permissions of **server**.
- Les permissions of channel incluent : `SendMessages`, `EmbedLinks`, `AttachFiles`, `AddReactions`, `UseExternalEmojis`, `Connect`, `Speak`, `Stream`, `UseVAD`, `PrioritySpeaker`, `MuteMembers`, `DeafenMembers`, `MoveMembers`, `ViewChannel`, `ReadMessageHistory`, `SendTTSMessages`, `UseApplicationCommands`, `ManageMessages`, `ManageChannels`, `CreateInstantInvite`, `UseEmbeddedActivities`.
- Combinez with `$onlyBotPerms` for ae vérification complete (server + channel).
