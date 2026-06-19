---
layout: doc
title: $isMentionable
translation_key: docs
category: "Entity Info"
function_name: isMentionable
syntax: $isMentionable[roleID;(guildID)]
description: Checks if un role est mentionnable. Returns "true" or "false".
---

# $isMentionable

The function `$isMentionable` vérifie if a role Discord est **mentionnable** par les members of the server. A role mentionnable can be utilisé in thes messages with `@Role`.

## Syntax

```
$isMentionable[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

| Type | Description |
|---|---|
| `string` | `"true"` si the role est mentionnable, `"false"` otherwise. |

## Examples

### Vérifier un role

```bdfd
$if[$isMentionable[$roleID[Annonces]]==true]
  $sendMessage[The role Annonces est mentionnable.]
$else
  $sendMessage[The role Annonces is not mentionnable.]
$endif
```

### Listr les roles mentionnables

```bdfd
$sendMessage[The role Admin est $isMentionable[$roleID[Admin]].]
```

### Alerter si non mentionnable

```bdfd
$if[$isMentionable[$roleID[Modo]]==false]
  $sendMessage[⚠️ The role Modo is not mentionnable. The members ne can pas le ping.]
$endif
```

### Récupérer via $roleInfo

```bdfd
$sendMessage[Mentionnable : $roleInfo[123456789012345678;mentionable]]
```

## Notes

- Returns ae string `"true"` or `"false"`.
- Équivaslow to `$roleInfo[roleID;mentionable]`.
- Utile pour check before of envoyer une mention of role.
