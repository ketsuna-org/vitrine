---
layout: doc
title: $ignoreLinks
translation_key: docs
category: "Moderation"
function_name: ignoreLinks
syntax: $ignoreLinks
description: Fonction guard qui arrête silencieusement l'exécution si le message déclencheur contient un lien HTTP/HTTPS.
parameters: []
returns: []
related:
  - $ignoreChannels
  - $onlyPerms
  - $message
  - $messageContains
examples:
  - description: Bloquer les messages avec liens
    code: |
      $ignoreLinks
      $sendMessage[Message accepté : aucun lien détecté.]
  - description: Combiner ignoreLinks et message d'erreur manuel
    code: |
      $if[$messageContains[https://;$messageContains[http://]]==true
        $sendMessage[❌ Les liens ne sont pas autorisés.]
        $stop
      $endif
---

# $ignoreLinks

La fonction guard `$ignoreLinks` détecte la présence de **liens HTTP/HTTPS** dans le message déclencheur. Si un lien est trouvé, la commande est interrompue silencieusement.

## Syntaxe

```
$ignoreLinks
```

## Paramètres

Aucun paramètre. `$ignoreLinks` s'utilise seul.

## Comportement

- Analyse le contenu du message à la recherche de `http://` ou `https://`.
- Si un lien est trouvé, la commande est immédiatement interrompue **sans message**.
- Si aucun lien n'est trouvé, la commande continue normalement.
- Détecte tous les liens standards (HTTP et HTTPS), mais pas les liens `discord.gg`, `ftp://`, etc.

## Exemples

### Commande anti-spam liens

```bdfd
$ignoreLinks
$sendMessage[Votre message a été traité (aucun lien détecté).]
```

### Avec message d'erreur personnalisé

```bdfd
$if[$messageContains[https://;$messageContains[http://]]==true
  $sendMessage[❌ Les liens sont interdits dans cette commande.]
  $stop
$endif
$sendMessage[Traitement OK.]
```

### Log des tentatives avec liens

```bdfd
$if[$messageContains[https://;$messageContains[http://]]==true
  $log[Lien bloqué : $message — Auteur : $userName ($authorID)]
  $stop
$endif
$sendMessage[Message traité.]
```

## Notes

- `$ignoreLinks` est **silencieux** : l'utilisateur ne reçoit aucune notification. Pour informer l'utilisateur, utilisez la vérification manuelle avec `$messageContains`.
- Ne détecte pas les liens sous forme `discord.gg/invite` ou les liens Markdown masqués `[texte](https://...)`. Pour couvrir ces cas, utilisez `$messageContains`.
- `$ignoreLinks` vérifie uniquement le message déclencheur, pas les embeds ni les pièces jointes.
- Idéal pour les salons où les liens sont interdits (prévention spam/phishing).
