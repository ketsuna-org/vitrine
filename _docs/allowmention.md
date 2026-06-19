---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $allowMention

Active les mentions dans la réponse. Lors d'une réponse (reply), l'utilisateur sera pingé/mentionné explicitement.

## Syntaxe

```
$allowMention
```

## Description

`$allowMention` est un **flag** (sans arguments) qui s'utilise avant `$sendMessage`, généralement en combinaison avec `$reply`. Il active explicitement la mention/ping de l'utilisateur dans une réponse.

Bien que le comportement par défaut de `$reply` inclut déjà un ping, `$allowMention` permet de rendre l'intention explicite et de surcharger d'éventuelles configurations par défaut.

## Exemples

### Réponse avec ping explicite

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

### Réponse avec embeds et mention

```
$reply
$allowMention
$newEmbed[title=Attention;description=Ceci nécessite votre attention;color=#E74C3C]
$sendMessage[]
```

## Comparaison

| Flag | Effet |
|------|-------|
| *(aucun)* | Comportement par défaut |
| `$noMention` | Désactive toutes les mentions |
| `$allowMention` | Active les mentions (explicite) |

## Notes

- `$allowMention` active le ping utilisateur dans une réponse.
- Utile pour rendre l'intention explicite dans le code.
- Flag à placer avant `$sendMessage`.
- S'utilise en complément de `$reply`.
