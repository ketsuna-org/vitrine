---
layout: doc
title: $afkTimeout[]
translation_key: docs
category: "Entity Info"
function_name: afkTimeout
syntax: $afkTimeout
description: Retourne le délai d'inactivité (en secondes) avant qu'un membre soit déplacé vers le salon AFK.
---

# $afkTimeout[] — Délai AFK

`$afkTimeout[]` retourne le délai d'inactivité configuré sur le serveur, après lequel un membre inactif dans un salon vocal est automatiquement déplacé vers le salon AFK.

## Syntaxe

```
$afkTimeout
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `integer`
- Le délai en secondes. Les valeurs possibles sont : 60, 300, 900, 1800, 3600.

| Secondes | Équivalent |
|----------|------------|
| 60 | 1 minute |
| 300 | 5 minutes |
| 900 | 15 minutes |
| 1800 | 30 minutes |
| 3600 | 1 heure |

## Utilisation

### Affichage formaté

```bdfd
$var[timeout;$afkTimeout]
$if[$var[timeout]>=3600]
$var[timeoutText;$round[$divide[$var[timeout];3600]] heure(s)]
$elseIf[$var[timeout]>=60]
$var[timeoutText;$round[$divide[$var[timeout];60]] minute(s)]
$else
$var[timeoutText;$var[timeout] seconde(s)]
$endif
$sendMessage[💤 Délai AFK : **$var[timeoutText]**]
```

### Configuration du serveur

```bdfd
$title[⚙️ Paramètres de $serverName]
$addField[💤 Salon AFK;$if[$afkChannelID!=]<#$afkChannelID>$elseAucun$endif;yes]
$addField[⏱️ Délai AFK;$round[$divide[$afkTimeout;60]] minutes;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Alerte si délai très court

```bdfd
$if[$afkTimeout<=60]
$sendMessage[⚠️ Le délai AFK est très court (1 minute). Les membres seront déplacés rapidement.]
$endif
```

## Notes

- Le salon AFK est configuré séparément ; utilisez `$afkChannelID[]` pour le récupérer.
- Si aucun salon AFK n'est configuré, le timeout n'a pas d'effet.
- Discord limite les valeurs possibles à la liste ci-dessus (pas de valeur personnalisée).
- Les membres dans le salon AFK sont mis en sourdine automatiquement.
