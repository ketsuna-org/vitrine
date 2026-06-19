---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $editMessage

Modifies a message existing sent par the bot. Remplace le contenu et/or les embeds and components of the message cible.

## Syntax

```
$editMessage[messageId;newContent]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `messageId` | ID of the message to modify | Yes |
| `newContent` | New text content of the message | Yes |

## Description

`$editMessage` allows mettre to day a message previously sent par the bot. Tout like `$sendMessage`, les embeds and components construits before the call sont included in the modification.

The `messageId` can be obtenu via :
- `$sentMessageId` after un `$sendMessage`
- Une variable stockée
- The ID of the message déclencheur (`$messageID`)

## Examples

### Édition simple

```
$editMessage[123456789012345678;Contenu mis to day !]
```

### Édition after envoi

```
$sendMessage[Message original]
$editMessage[$sentMessageId;Message modified !]
```

### Édition with newx embeds

```
$newEmbed[title=Mise to day;description=Les information ont changé;color=#FFA500]
$editMessage[$sentMessageId;]
```

### Édition with buttons mis to day

```
$addActionRow
$addButtonCV2[btn_done;Terminé;success;true]
$editMessage[$sentMessageId;Action complétée ✅]
```

### Dans $onInteraction

```
$onInteraction
$if[$customID==btn_edit]
  $editMessage[$messageID;Message édité par interaction]
$endif
```

## Notes

- The bot ne peut modifier que their propres messages.
- Si `newContent` est vide and qu'aucan embed/composant n'is provided, the message peut devenir vide (behavior according to version).
- Les embeds and components remplacent completeely ceux of the message original.
- Use `$sentMessageId` juste after `$sendMessage` to retrieve the ID of the last message sent.
