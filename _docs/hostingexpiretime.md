---
layout: doc
title: $hostingExpireTime
translation_key: docs
category: "Entity Info"
function_name: hostingExpireTime
syntax: $hostingExpireTime
description: Retourne la date d'expiration de l'hébergement du bot.
parameters: []
returns:
  - type: string
    description: Date d'expiration de l'hébergement (format timestamp).
related:
  - $premiumExpireTime
  - $nodeVersion
  - $botNode
examples:
  - description: Afficher l'expiration
    code: |
      $sendMessage[Hébergement expire le : $hostingExpireTime]
  - description: Alerte avant expiration
    code: |
      $if[$dateDiff[$hostingExpireTime]<=7]
        $sendMessage[⚠️ Hébergement expire bientôt !]
      $endif
---

# $hostingExpireTime

La fonction `$hostingExpireTime` **retourne la date d'expiration de l'hébergement** du bot sur la plateforme BDFD. Après cette date, le bot s'arrête si l'hébergement n'est pas renouvelé.

## Syntaxe

```
$hostingExpireTime
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- La date d'expiration au format timestamp (ex: `2026-12-31T23:59:59.000Z`).
- Peut être formatée avec `$formatDate[]`.

## Comportement

- Retourne la date jusqu'à laquelle l'hébergement payant est actif.
- Les bots gratuits peuvent ne pas avoir de date d'expiration.
- Mise à jour automatique après renouvellement.

## Exemples

### Affichage formaté

```bdfd
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $sendMessage[✅ Hébergement gratuit - pas d'expiration.]
$else
  $sendMessage[📅 **Hébergement :**
  > Expire le $formatDate[$var[expire];DD/MM/YYYY à HH:mm]
  > Jours restants : $dateDiff[$var[expire]] jours]
$endif
```

### Alerte propriétaire

```bdfd
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $stop
$endif

$var[jours;$dateDiff[$var[expire]]]
$if[$var[jours]<=3]
  $sendDM[$botOwnerID;🚨 **URGENT** - L'hébergement de **$botName** expire dans $var[jours] jours !]
$elseif[$var[jours]<=7]
  $sendDM[$botOwnerID;⚠️ L'hébergement de **$botName** expire dans $var[jours] jours.]
$endif
```

### Page information

```bdfd
$title[🤖 Statut de $botName]
$addField[🟢 Statut;En ligne;yes]
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

- Si l'hébergement est gratuit, la fonction peut retourner une chaîne vide.
- Utilisez `$dateDiff[$hostingExpireTime]` pour obtenir les jours restants.
- Pour le premium, utilisez `$premiumExpireTime`.
- Les valeurs retournées sont en UTC.
