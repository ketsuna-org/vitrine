---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $editMessage

Modifie un message existant envoyé par le bot. Remplace le contenu et/ou les embeds et composants du message cible.

## Syntaxe

```
$editMessage[messageId;newContent]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `messageId` | ID du message à modifier | Oui |
| `newContent` | Nouveau contenu textuel du message | Oui |

## Description

`$editMessage` permet de mettre à jour un message précédemment envoyé par le bot. Tout comme `$sendMessage`, les embeds et composants construits avant l'appel sont inclus dans la modification.

Le `messageId` peut être obtenu via :
- `$sentMessageId` après un `$sendMessage`
- Une variable stockée
- L'ID du message déclencheur (`$messageID`)

## Exemples

### Édition simple

```
$editMessage[123456789012345678;Contenu mis à jour !]
```

### Édition après envoi

```
$sendMessage[Message original]
$editMessage[$sentMessageId;Message modifié !]
```

### Édition avec nouveaux embeds

```
$newEmbed[title=Mise à jour;description=Les informations ont changé;color=#FFA500]
$editMessage[$sentMessageId;]
```

### Édition avec boutons mis à jour

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

- Le bot ne peut modifier que ses propres messages.
- Si `newContent` est vide et qu'aucun embed/composant n'est fourni, le message peut devenir vide (comportement selon version).
- Les embeds et composants remplacent complètement ceux du message original.
- Utilisez `$sentMessageId` juste après `$sendMessage` pour récupérer l'ID du dernier message envoyé.
