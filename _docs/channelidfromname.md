---
layout: doc
title: $channelIDFromName
translation_key: docs
category: "Entity Info"
function_name: channelIDFromName
syntax: $channelIDFromName[name]
description: Retourne l'ID d'un salon Discord à partir de son nom.
---

# $channelIDFromName

La fonction `$channelIDFromName` retourne l'**ID** d'un salon Discord à partir de son **nom**. La recherche est insensible à la casse.

## Syntaxe

```
$channelIDFromName[name]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom du salon à rechercher. Insensible à la casse (`général` = `Général`). |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID du salon trouvé, ou `""` si aucun salon ne correspond. |

## Exemples

### Obtenir l'ID

```bdfd
$sendMessage[ID de #général : $channelIDFromName[général]]
```

### Envoyer dans un salon par nom

```bdfd
$channelSendMessage[$channelIDFromName[annonces];Nouvelle mise à jour disponible !]
```

### Vérifier existence

```bdfd
$if[$channelIDFromName[logs]!=]
  $sendMessage[Salon #logs trouvé ! ID : $channelIDFromName[logs]]
$else
  $sendMessage[Pas de salon #logs.]
$endif
```

### Dépannage de noms similaires

```bdfd
$if[$channelIDFromName[général]!=]
  $sendMessage[Salon général trouvé.]
$else
  $sendMessage[Erreur : salon introuvable. Essayez un autre nom.]
$endif
```

## Notes

- Si plusieurs salons portent le même nom, seul le premier trouvé est retourné.
- Utilisez `$findChannel` pour une recherche plus avancée avec requête partielle.
- Le nom ne doit pas inclure le préfixe `#`.
