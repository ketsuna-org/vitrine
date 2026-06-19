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

The function `$kickMention` **expulse automatically the user mentionné** in the message déclencheur. C'est un raccourci pratique qui évite de spécifier un ID. The bot doit avoir la permission `KickMembers`.

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
$sendMessage[Member expulsé avec success !]
```

### Expulsion avec reason default

```bdfd
$kickMention
$sendMessage[<@$mentioned[1]> was expulsé pour non-respect des règles.]
```

## Notes

- The message déclencheur doit contenir une mention d'user.
- The bot doit avoir la permission `KickMembers`.
- Pour expulser un user spécifique par ID, utilisez `$kick`.
- Si noe mention n'est présente, le comportement can be indéfini.
