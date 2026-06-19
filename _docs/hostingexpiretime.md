---
layout: doc
title: $hostingExpireTime
translation_key: docs
category: "Entity Info"
function_name: hostingExpireTime
syntax: $hostingExpireTime
description: Returns the date d'expiration de l'hébergement of the bot.
---

# $hostingExpireTime

The function `$hostingExpireTime` **retourne la date d'expiration de l'hébergement** of the bot sur la plateforme BDFD. Après cette date, the bot s'stops si l'hébergement is not renouvelé.

## Syntax

```
$hostingExpireTime
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- La date d'expiration au format timestamp (ex: `2026-12-31T23:59:59.000Z`).
- Can be formattede avec `$formatDate[]`.

## Behavior

- Returns the date until laquelle l'hébergement payant est actif.
- Les bots gratuits peuvent ne pas avoir de date d'expiration.
- Mise à day automatique after renewment.

## Examples

### Affichage formatted

```bdfd
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $sendMessage[✅ Hébergement gratuit - pas d'expiration.]
$else
  $sendMessage[📅 **Hébergement :**
  > Expire le $formatDate[$var[expire];DD/MM/YYYY à HH:mm]
  > Jours restants : $dateDiff[$var[expire]] days]
$endif
```

### Alerte owner

```bdfd
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $stop
$endif

$var[days;$dateDiff[$var[expire]]]
$if[$var[days]<=3]
  $sendDM[$botOwnerID;🚨 **URGENT** - L'hébergement de **$botName** expire dans $var[days] days !]
$elseif[$var[days]<=7]
  $sendDM[$botOwnerID;⚠️ L'hébergement de **$botName** expire dans $var[days] days.]
$endif
```

### Page information

```bdfd
$title[🤖 Status de $botName]
$addField[🟢 Status;Online;yes]
$addField[📦 Node;$botNode;yes]
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $addField[📅 Hébergement;✅ Gratuit / Illimité;yes]
$else
  $addField[📅 Hébergement;Expire le $formatDate[$var[expire];DD/MM/YYYY];yes]
$endif
$addField[💎 Premium;$if[$premiumExpireTime==]Non$elseExpire $premiumExpireTime$endif;yes]
$color[$if[$var[expire]==]#57F287$else#FEE75C$endif]
$sendMessage[]
```

## Notes

- Si l'hébergement est gratuit, the function peut retourner une string vide.
- Utilisez `$dateDiff[$hostingExpireTime]` pour obtenir les days restants.
- Pour le premium, utilisez `$premiumExpireTime`.
- Les values retournées sont en UTC.
