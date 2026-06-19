---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $ephemeral

Rend the response éphémère (visible only par the user qui triggered the interaction). S'utilise like flag before `$sendMessage`.

## Syntax

```
$ephemeral
```

## Description

`$ephemeral` est un **flag** (without arguments) qui, placé before `$sendMessage`, rend the message visible only par the user cible. The message apparaît with the mention "Only you can see this" and disparaît after un certain temps or when the user ferme Discord.

Cette function est particularly utile pour :
- Les messages of confirmation discrets
- Les errors or avertissements
- Les responses to interactions on buttons/select menus
- Les information sensibles

## Examples

### Response éphémère simple

```
$ephemeral
$sendMessage[This message est visible only par vous.]
```

### Avec embeds

```
$ephemeral
$newEmbed[title=Information;description=Datas privatees;color=#9B59B6]
$sendMessage[]
```

### Dans une interaction

```
$onInteraction
$if[$customID==btn_secret]
  $ephemeral
  $sendMessage[🔒 Action secrète effectuée !]
$endif
```

### Message error éphémère

```
$if[$argsCount==0]
  $ephemeral
  $sendMessage[❌ Vous devez provide a argument !]
  $stop
$endif
```

## Notes

- Functionne only in the context of interactions (slash commands, buttons, select menus).
- Ne functionne PAS for commands to préfixe classiques (message commands).
- Le flag must be placé before `$sendMessage`.
- Pratique pour garder les channels propres of messages système.
