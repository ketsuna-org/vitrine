---
layout: doc
title: $botID
translation_key: docs
category: "Entity Info"
function_name: botID
syntax: $botID
description: Returns the ID user of the bot.
---

# $botID

The `$botID` function **returns the ID Discord (snowflake) of the bot**. Cet identifier est unique and permanent.

## Syntax

```
$botID
```

## Parameters

Aucun.

## Return value

- **Type** : String
- The ID Discord of the bot (17-20 chiffres). Ex: `1234567890123456789`.

## Behavior

- The ID est attribué par Discord à la création de l'application.
- Il ne change never, même if the bot est renommé.
- Utilisable for mentions (`<@ID>`), les invites, les API.

## Examples

### Debug / Information

```bdfd
$title[🔍 Informations techniques]
$description[
**Nom :** $botName
**ID :** $botID
**Owner :** $botOwnerID
**Node :** $botNode
]
$footer[Bot ID: $botID]
$sendMessage[]
```

### Link d'invite custom

```bdfd
$sendMessage[🔗 **Invitez-moi :**
https://discord.com/oauth2/authorize?clinkt_id=$botID&permissions=8&scope=bot%20applications.commands]
```

### Vérification d'identité

```bdfd
$if[$authorID==$botID]
  $sendMessage[Je ne réponds pas à mes propres messages !]
  $stop
$endif

$sendMessage[Message received, $userName !]
```

### Emoji custom avec ID

```bdfd
$sendMessage[🤖 <@$botID> est online !]
```

## Notes

- `$botID` est constant and ne change never.
- Pour obtenir the ID of the owner, use `$botOwnerID`.
- For the nom, use `$botName`.
- Mention of the bot : `<@$botID>`.
