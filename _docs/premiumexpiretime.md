---
layout: doc
title: $premiumExpireTime
translation_key: docs
category: "Entity Info"
function_name: premiumExpireTime
syntax: $premiumExpireTime
description: Retourne la date d'expiration de l'abonnement premium BDFD du bot.
---

# $premiumExpireTime

La fonction `$premiumExpireTime` **retourne la date d'expiration de l'abonnement premium BDFD** du bot. Le premium débloque des fonctionnalités avancées (plus de commandes, plus de serveurs, etc.).

## Syntaxe

```
$premiumExpireTime
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- Date d'expiration au format timestamp si le bot est premium.
- Chaîne vide si le bot n'a pas d'abonnement premium.

## Comportement

- Retourne une date uniquement si un abonnement premium est actif.
- Après expiration, les fonctionnalités premium sont désactivées.
- Le format est un timestamp ISO 8601.

## Exemples

### Vérification du statut

```bdfd
$var[premium;$premiumExpireTime]
$if[$var[premium]==]
  $sendMessage[❌ Ce bot n'a pas d'abonnement premium actif.]
$else
  $var[jours;$dateDiff[$var[premium]]]
  $sendMessage[💎 **Premium actif !**
  > Expire le : $formatDate[$var[premium];DD/MM/YYYY]
  > Jours restants : $var[jours] jours]
$endif
```

### Alerte renouvellement

```bdfd
$var[premium;$premiumExpireTime]
$if[$var[premium]==]
  $stop
$endif

$var[jours;$dateDiff[$var[premium]]]
$if[$var[jours]<=3]
  $sendDM[$botOwnerID;🚨 **Premium $botName** expire dans $var[jours] jours ! Pensez à renouveler.]
$endif
```

### Dashboard propriétaire

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé au propriétaire.]
  $stop
$endif

$title[📊 Dashboard $botName]
$addField[🟢 Statut;En ligne;yes]
$addField[📅 Hosting;$if[$hostingExpireTime==]Gratuit$else$hostingExpireTime$endif;yes]
$addField[💎 Premium;$if[$premiumExpireTime==]❌ Aucun$elseExpire le $formatDate[$premiumExpireTime;DD/MM/YYYY]$endif;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📝 Langage;$scriptLanguage;yes]
$color[$if[$premiumExpireTime==]#ED4245$else#57F287$endif]
$sendMessage[]
```

## Notes

- Chaîne vide = pas de premium.
- Pour l'hébergement, utilisez `$hostingExpireTime`.
- Le premium BDFD offre : plus de commandes, plus de serveurs, fonctionnalités exclusives.
- `$dateDiff[$premiumExpireTime]` retourne le nombre de jours restants.
