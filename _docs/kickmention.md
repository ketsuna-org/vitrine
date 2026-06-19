---
layout: doc
title: $kickMention
translation_key: docs
category: "Moderation"
function_name: kickMention
syntax: $kickMention
description: Expulse the user mentionné in the message.
---

# $kickMention

The function `$kickMention` **expulse automatically the user mentionné** in the message déclencheur. C'est un raccourci pratique qui évite of specify a ID. The bot doit avoir la permission `KickMembers`.

## Syntax

```
$kickMention
```

## Parameters

Aucun parameter. The function détecte automatically the user mentionné.

## Return Value

Aucune. The user mentionné est expulsé.

## Examples

### Expulsion simple

```bdfd
$kickMention
$sendMessage[Member expulsé with success !]
```

### Expulsion with reason default

```bdfd
$kickMention
$sendMessage[<@$mentioned[1]> was expulsé pour non-respect règles.]
```

## Notes

- The message déclencheur doit contain ae mention of user.
- The bot doit avoir la permission `KickMembers`.
- Pour expulser un user specific par ID, utilisez `$kick`.
- Si noe mention n'est présente, le comportement can be indéfini.
