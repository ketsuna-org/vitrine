---
layout: doc
title: $channelNSFW
translation_key: docs
category: "Entity Info"
function_name: channelNSFW
syntax: $channelNSFW[(channelID)]
description: Retourne "true" si le salon est marqué NSFW, "false" sinon.
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon cible. Si omis, utilise le salon courant."
returns:
  - type: string
    description: '"true" si le salon est NSFW, "false" sinon.'
related:
  - $channelID
  - $channelName
  - $channelType
examples:
  - description: Vérifier si le salon est NSFW
    code: |
      $if[$channelNSFW==true]
        $sendMessage[Ce salon est NSFW.]
      $else
        $sendMessage[Ce salon est tout public.]
      $endif
---

# $channelNSFW

La fonction `$channelNSFW` vérifie si un salon Discord est marqué comme **NSFW** (Not Safe For Work). Elle retourne `"true"` ou `"false"` sous forme de chaîne.

## Syntaxe

```
$channelNSFW[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | `"true"` si le salon est NSFW, `"false"` sinon. |

## Exemples

### Vérification simple

```bdfd
$if[$channelNSFW==true]
  $sendMessage[⚠️ Ce salon est marqué NSFW. Contenu sensible possible.]
$else
  $sendMessage[Ce salon est tout public.]
$endif
```

### Bloquer une commande en salon NSFW

```bdfd
$if[$channelNSFW==true]
  $sendMessage[Cette commande ne peut pas être utilisée en salon NSFW.]
  $stop
$endif
```

### Vérifier un salon spécifique

```bdfd
$if[$channelNSFW[123456789012345678]==true]
  $sendMessage[Le salon cible est NSFW.]
$endif
```

## Notes

- La valeur retournée est une **chaîne** `"true"` ou `"false"`, pas un booléen.
- Les salons vocaux peuvent également être marqués NSFW.
- Utile pour restreindre l'accès à certaines commandes selon le type de salon.
