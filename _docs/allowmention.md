---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $allowMention

Enables les mentions in the response. Lors of a response (reply), the user will be pingé/mentionné explicitement.

## Syntax

```
$allowMention
```

## Description

`$allowMention` est un **flag** (without arguments) qui s'utilise before `$sendMessage`, generally en combinaison with `$reply`. Il active explicitement la mention/ping of the user in a response.

Bien only the behavior by default of `$reply` inclut déjà un ping, `$allowMention` allows rendre l'intention explicite and of surcharger of éventuelles configurations by default.

## Examples

### Response with ping explicite

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

### Response with embeds and mention

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

- `$allowMention` enables the ping user in a response.
- Utile pour rendre l'intention explicite in the code.
- Flag to placer before `$sendMessage`.
- S'utilise en complément of `$reply`.
