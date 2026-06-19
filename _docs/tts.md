---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $tts

Active la synthèse vocale (Text-To-Speech) pour le message envoyé. Le message sera lu à haute voix aux utilisateurs du salon.

## Syntaxe

```
$tts
```

## Description

`$tts` est un **flag** (sans arguments) qui s'utilise avant `$sendMessage`. Il active la fonction TTS de Discord : le contenu du message sera lu à voix haute pour tous les utilisateurs du salon qui n'ont pas désactivé le TTS.

## Exemples

### Message TTS simple

```
$tts
$sendMessage[Attention à tous les membres !]
```

### Avec embeds

```
$tts
$newEmbed[title=Annonce vocale;description=Ceci est une annonce importante;color=#E74C3C]
$sendMessage[Annonce importante !]
```

### Alerte TTS

```
$tts
$sendMessage[🚨 Alerte : la maintenance commence dans 5 minutes]
```

## Notes

- Fonctionne uniquement si le bot a la permission `SEND_TTS_MESSAGES`.
- Les utilisateurs peuvent désactiver le TTS dans leurs paramètres Discord.
- `$tts` est un flag, utilisez-le avant `$sendMessage`.
- Le TTS lit le contenu textuel, pas le contenu des embeds.
- À utiliser avec parcimonie pour ne pas déranger les utilisateurs.
