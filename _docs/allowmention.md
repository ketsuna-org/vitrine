---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $allowMention

Enables les mentions in the response. Lors d'a response (reply), the user will be pingé/mentionné explicitement.

## Syntax

```
$allowMention
```

## Description

`$allowMention` est un **flag** (without arguments) qui s'utilise before `$sendMessage`, generally en combinaison avec `$reply`. Il active explicitement la mention/ping of the user dans a response.

Bien only the behavior by default de `$reply` inclut déjà un ping, `$allowMention` allows rendre l'intention explicite and de surcharger d'éventuelles configurations by default.

## Examples

### Response avec ping explicite

```
$reply
$allowMention
$sendMessage[Hey $username, regardez ceci !]
```

### Dans une interaction

```
$onInteraction
$if[$customID==btn_alert]
  $reply
  $allowMention
  $sendMessage[⚠️ Alerte importante pour vous !]
$endif
```

### Response avec embeds and mention

```
$reply
$allowMention
$newEmbed[title=Attention;description=Ceci requires votre attention;color=#E74C3C]
$sendMessage[]
```

## Compareason

| Flag | Effet |
|------|-------|
| *(no)* | Behavior by default |
| `$noMention` | Désactive all mentions |
| `$allowMention` | Active les mentions (explicite) |

## Notes

- `$allowMention` enables the ping user dans a response.
- Utile pour rendre l'intention explicite dans the code.
- Flag à placer before `$sendMessage`.
- S'utilise en complément de `$reply`.
