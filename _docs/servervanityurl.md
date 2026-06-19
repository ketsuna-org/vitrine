---
layout: doc
title: $serverVanityURL[]
translation_key: docs
category: "Entity Info"
function_name: serverVanityURL
syntax: $serverVanityURL
description: Retourne le code de l'URL personnalisée (vanity URL) du serveur Discord. Disponible uniquement pour les serveurs de niveau boost 3 ou les serveurs partenaires/vérifiés.
---

# $serverVanityURL[] — URL Personnalisée du Serveur

`$serverVanityURL[]` retourne le code de l'URL personnalisée (vanity URL) du serveur. Cette URL courte permet de créer un lien d'invitation facile à mémoriser (ex: `discord.gg/mon-serveur`).

> **Prérequis** : Serveur niveau boost 3, ou serveur partenaire/vérifié Discord.

## Syntaxe

```
$serverVanityURL
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- Le code de l'URL personnalisée (ex: `"mon-serveur"`), ou une chaîne vide si non disponible.

## Utilisation

### Lien d'invitation

```bdfd
$if[$serverVanityURL!=]
$sendMessage[🔗 Rejoignez-nous : **discord.gg/$serverVanityURL**]
$else
$sendMessage[Ce serveur n'a pas d'URL personnalisée.]
$endif
```

### Embed d'invitation

```bdfd
$title[🌟 $serverName]
$description[$serverDescription]
$addField[Rejoindre;discord.gg/$serverVanityURL;yes]
$addField[Membres;$membersCount;yes]
$thumbnail[$serverIcon]
$image[$serverSplash]
$color[#9B59B6]
$sendEmbedMessage
```

### Page d'accueil

```bdfd
$title[Informations sur $serverName]
$addField[🌟 URL;discord.gg/$serverVanityURL;yes]
$addField[👑 Propriétaire;<@$serverOwner>;yes]
$addField[👥 Membres;$membersCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- L'URL complète est `discord.gg/<code>` ou `https://discord.gg/<code>`.
- Le code est configuré dans les paramètres du serveur (onglet "Aperçu" → "URL personnalisée d'invitation").
- Nécessite le niveau de boost 3 ou le statut Partenaire/Vérifié.
- Le code est unique à travers tout Discord.
- Si le serveur n'a pas d'URL personnalisée, utilisez `$createInvite[]` pour générer un lien d'invitation standard.
