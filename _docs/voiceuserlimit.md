---
layout: doc
title: $voiceUserLimit
translation_key: docs
category: "Moderation"
function_name: voiceUserLimit
syntax: $voiceUserLimit[(channelID)]
description: Récupère la limite d'utilisateurs d'un salon vocal. Retourne le nombre maximum d'utilisateurs pouvant se connecter simultanément.
parameters:
  - name: channelID
    description: (Optionnel) L'ID du salon vocal. Par défaut, le salon vocal de l'auteur de la commande.
returns:
  - type: string (number)
    description: La limite d'utilisateurs du salon vocal (0 = illimité).
related:
  - $voiceChannelID
  - $voiceMembersCount
  - $channelType
  - $modifyChannel
examples:
  - description: Limite du salon vocal actuel
    code: $voiceUserLimit
  - description: Limite d'un salon spécifique
    code: $voiceUserLimit[123456789]
---

# $voiceUserLimit

La fonction `$voiceUserLimit[]` permet de **récupérer la limite d'utilisateurs** configurée sur un salon vocal Discord.

## Syntaxe

```
$voiceUserLimit[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel - L'ID du salon vocal. Par défaut, le salon où se trouve l'auteur. |

## Valeur de retour

- **Type** : String (nombre)
- Le nombre maximum d'utilisateurs autorisés dans le salon.
- `0` signifie illimité (pas de limite).

## Comportement

- Si aucun channelID n'est fourni et que l'auteur n'est pas dans un salon vocal, retourne `0` ou une erreur.
- La limite est définie lors de la création/modification du salon.
- Utile pour vérifier la capacité avant de rejoindre ou d'inviter.

## Exemples

### Vérification de capacité

```bdfd
$let[limit;$voiceUserLimit]
$let[users;$voiceMembersCount]

$if[$limit==0]
  Salon illimité — **$users** utilisateur(s) connecté(s).
$else
  Salon : **$users / $limit** utilisateurs.
  $if[$users>=$limit]
    ⚠️ Salon plein !
  $else
    ✅ $math[$limit-$users] place(s) disponible(s).
  $endif
$endif
```

### Information salon vocal

```bdfd
$title[🔊 $channelName[$voiceChannelID]]
$description[
**Connectés :** $voiceMembersCount
**Limite :** $if[$voiceUserLimit==0]Illimité$else$voiceUserLimit$endif
**Bitrate :** $voiceBitrate kbps
]
$color[#5865F2]
$sendMessage[]
```

### Vérification pour un salon spécifique

```bdfd
$let[target;$channelID[Salon Gaming]]
$let[limit;$voiceUserLimit[$target]]
$let[users;$voiceMembersCount[$target]]

$if[$users<$limit]
  $sendMessage[✅ Vous pouvez rejoindre <#$target>.]
$else
  $sendMessage[❌ <#$target> est plein ($users/$limit).]
$endif
```

## Notes

- `0` = pas de limite (illimité), ce qui est la valeur par défaut des salons vocaux.
- La limite maximale est de 99 utilisateurs.
- Fonctionne uniquement avec les salons de type vocal (`$channelType` = 2).
