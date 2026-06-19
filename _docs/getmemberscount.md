---
layout: doc
title: $getMembersCount
translation_key: docs
category: "Server & Channels"
function_name: getMembersCount
syntax: $getMembersCount
description: Retourne le nombre total de membres sur le serveur (incluant les bots). Alias possible de $membersCount.
---
# $getMembersCount

La fonction `$getMembersCount` retourne le **nombre total de membres** du serveur Discord.

## Syntaxe

```
$getMembersCount
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Nombre (chaîne)
- Le nombre total de membres (humains + bots).

## Exemples

### Affichage simple

```bdfd
$sendMessage[👥 Ce serveur compte $getMembersCount membres !]
```

### Message de bienvenue

```bdfd
$title[👋 Bienvenue $username !]
$description[
Bienvenue sur **$serverName** !
Tu es le membre **#$getMembersCount** !
]
$thumbnail[$authorAvatar]
$color[#57F287]
$sendMessage[]
```

### Condition de taille

```bdfd
$if[$getMembersCount<100]
  $sendMessage[Nous sommes encore une petite communauté de $getMembersCount membres 💚]
$elseIf[$getMembersCount<1000]
  $sendMessage[Déjà $getMembersCount membres, merci à tous ! 🎉]
$else
  $sendMessage[Plus de 1000 membres, incroyable ! 🚀]
$endif
```

### Stats du serveur

```bdfd
$title[📊 Statistiques de $serverName]
$description[
**Membres** : $getMembersCount
**Bots** : $botCount
**Salons** : $channelCount
**Rôles** : $roleCount
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Inclut les bots dans le compte. Pour les humains uniquement, faites `$c[$getMembersCount-$botCount]`.
- Équivalent fonctionnel à `$membersCount`.
- Se met à jour automatiquement quand des membres rejoignent/quittent.
