---
layout: doc
title: $ignoreLinks
translation_key: docs
category: "Moderation"
function_name: ignoreLinks
syntax: $ignoreLinks
description: Function guard qui stops silencieusement l'exécution si the message déclencheur contains un link HTTP/HTTPS.
---

# $ignoreLinks

The function guard `$ignoreLinks` détecte la présence de **links HTTP/HTTPS** in the message déclencheur. Si un link est found, the command est interrompue silencieusement.

## Syntax

```
$ignoreLinks
```

## Parameters

Aucun parameter. `$ignoreLinks` s'utilise seul.

## Behavior

- Analyse le contenu of the message à la recherche de `http://` or `https://`.
- Si un link est found, the command est immédiatement interrompue **without message**.
- Si no link n'est found, the command continue normalement.
- Détecte all links standards (HTTP and HTTPS), mais pas les links `discord.gg`, `ftp://`, etc.

## Examples

### Command anti-spam links

```bdfd
$ignoreLinks
$sendMessage[Votre message was traité (no link détecté).]
```

### Avec error message custom

```bdfd
$if[$messageContains[https://;$messageContains[http://]]==true
  $sendMessage[❌ Les links sont forbiddens dans cette command.]
  $stop
$endif
$sendMessage[Traitement OK.]
```

### Log des tentatives avec links

```bdfd
$if[$messageContains[https://;$messageContains[http://]]==true
  $log[Link bloqué : $message — Auteur : $userName ($authorID)]
  $stop
$endif
$sendMessage[Message traité.]
```

## Notes

- `$ignoreLinks` est **silencieux** : the user ne receives noe notification. Pour informer the user, utilisez la vérification manuelle avec `$messageContains`.
- Ne détecte pas les links sous forme `discord.gg/invite` or les links Markdown hiddens `[text](https://...)`. Pour couvrir ces cas, utilisez `$messageContains`.
- `$ignoreLinks` vérifie only the message déclencheur, pas les embeds ni les pièces jointes.
- Idéal for the channels où les links sont forbiddens (prévention spam/phishing).
