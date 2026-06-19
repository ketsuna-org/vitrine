---
layout: doc
title: $findChannel
translation_key: docs
category: "Entity Info"
function_name: findChannel
syntax: $findChannel[query]
description: Recherche un salon par nom partiel ou complet et retourne son ID. Insensible à la casse.
parameters:
  - name: query
    description: Le nom (ou partie du nom) du salon à rechercher.
returns:
  - type: snowflake (string)
    description: L'ID du premier salon correspondant, ou une chaîne vide si aucun.
related:
  - $channelIDFromName
  - $channelExists
  - $channelName
  - $findRole
examples:
  - description: Trouver un salon par nom partiel
    code: $sendMessage[Salon trouvé : $findChannel[gén]]
  - description: Envoyer dans un salon trouvé
    code: $channelSendMessage[$findChannel[logs];Message automatique]
  - description: Vérifier si trouvé
    code: |
      $if[$findChannel[annonce]!=]
        $sendMessage[Salon trouvé !]
      $else
        $sendMessage[Salon introuvable.]
      $endif
---

# $findChannel

La fonction `$findChannel` recherche un salon Discord par **nom partiel ou complet** et retourne son ID. La recherche est insensible à la casse.

## Syntaxe

```
$findChannel[query]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `query` | Le nom ou une partie du nom du salon à rechercher. |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID du salon trouvé, ou `""` si aucun salon ne correspond. |

## Exemples

### Recherche par nom partiel

```bdfd
$sendMessage[Salon correspondant à "gén" : $findChannel[gén]]
```

### Envoyer un message dans un salon trouvé

```bdfd
$channelSendMessage[$findChannel[logs];Nouvel événement enregistré.]
```

### Vérifier si le salon existe

```bdfd
$if[$findChannel[annonces]!=]
  $sendMessage[Salon annonces trouvé : <#$findChannel[annonces]>]
$else
  $sendMessage[Aucun salon ne correspond à "annonces".]
$endif
```

### Utilisation comme fallback

```bdfd
$if[$channelIDFromName[général]!=]
  $sendMessage[Salon général : $channelIDFromName[général]]
$else
  $sendMessage[Recherche étendue : $findChannel[gén]]
$endif
```

## Notes

- Si plusieurs salons correspondent, le **premier** trouvé est retourné.
- Pour une recherche exacte, préférez `$channelIDFromName`.
- Pratique quand l'utilisateur ne connaît pas le nom exact du salon.
- Le préfixe `#` ne doit pas être inclus dans la requête.
