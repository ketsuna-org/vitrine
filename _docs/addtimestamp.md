---
layout: doc
title: $addTimestamp[]
translation_key: docs
category: "Embed & Message"
function_name: addTimestamp
syntax: $addTimestamp[(timestamp);(embedIndex)]
description: Ajoute un horodatage (timestamp) en bas d'un embed Discord. Par défaut, affiche la date et l'heure actuelles.
---

# $addTimestamp[]

La fonction `$addTimestamp[]` ajoute un **horodatage** (timestamp) dans le pied de l'embed Discord. Par défaut, il affiche la date et l'heure actuelles. Le timestamp est affiché en bas de l'embed, à côté du footer s'il est présent.

## Syntaxe

```
$addTimestamp[(timestamp);(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `timestamp` | Optionnel. `now` (par défaut) pour l'heure actuelle, ou un timestamp Unix en secondes pour une date spécifique. |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Comportement

- Si aucun paramètre n'est fourni (`$addTimestamp`), la date et l'heure actuelles sont utilisées.
- Le timestamp s'affiche en bas de l'embed, sous les fields et le footer.
- Discord formate automatiquement le timestamp dans le fuseau horaire de l'utilisateur qui le voit.

## Exemples

### Timestamp actuel

```bdfd
$title[Logs]
$description[Une action de modération a été effectuée.]
$addTimestamp
$color[#ED4245]
$sendMessage[]
```

### Timestamp avec date spécifique

```bdfd
$title[Événement passé]
$description[Cet événement a eu lieu le 19 novembre 2023.]
$addTimestamp[1700000000]
$color[#5865F2]
$sendMessage[]
```

### Timestamp avec footer

```bdfd
$title[Bienvenue !]
$description[
Bienvenue sur le serveur **$serverName**, $username !
Nous sommes ravis de t'accueillir parmi nous.
]
$footer[$serverName;$serverIcon]
$addTimestamp
$color[#57F287]
$sendMessage[]
```

### Embed de log avec timestamp dynamique

```bdfd
$title[🔨 Moderation Log]
$description[
**Modérateur :** $username
**Action :** Kick
**Raison :** Non-respect des règles
]
$addField[Utilisateur concerné;$var[target];yes]
$addField[ID;$var[targetID];yes]
$footer[Moderation Bot v2.0]
$addTimestamp
$color[#ED4245]
$sendMessage[]
```

## Notes

- Le timestamp est automatiquement localisé par Discord selon le fuseau horaire de chaque utilisateur.
- Utilisez `$getTimestamp[]` pour obtenir un timestamp Unix actuel à passer comme paramètre.
- Combinez avec `$footer[]` pour un pied d'embed complet (texte + icône + timestamp).
- Le format d'affichage (relatif "il y a 2 heures" ou absolu "19/11/2023") dépend de la version de Discord du destinataire.
