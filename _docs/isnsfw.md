---
layout: doc
title: $isNSFW
translation_key: docs
category: "Math & Text"
function_name: isNSFW
syntax: $isNSFW[channelID]
description: Vérifie si un canal est marqué comme NSFW.
parameters:
  - name: channelID
    description: L'ID du canal à vérifier. Si omis, canal courant.
returns:
  - type: boolean
    description: true si le canal est NSFW, false sinon.
related:
  - $isTicket
  - $isSlash
  - $channelName
examples:
  - description: Vérifier le canal courant
    code: |
      $if[$isNSFW==true]
        $sendMessage[Ce canal est NSFW.]
      $endif
  - description: Vérifier un canal spécifique
    code: |
      $if[$isNSFW[123456789]==true]
        $sendMessage[Canal NSFW.]
      $endif
---

# $isNSFW

La fonction `$isNSFW[channelID]` **vérifie si un canal Discord est marqué comme NSFW** (Not Safe For Work).

## Syntaxe

```
$isNSFW[channelID]
```

Ou sans paramètre pour le canal courant :

```
$isNSFW
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel - L'ID du canal. Défaut : canal où la commande est exécutée. |

## Valeur de retour

- **Type** : Booléen
- `true` si le canal est marqué NSFW.
- `false` si le canal n'est pas NSFW ou est introuvable.

## Comportement

- Vérifie l'attribut `nsfw` du canal Discord.
- Les canaux NSFW sont restreints aux utilisateurs de plus de 18 ans.
- Fonctionne uniquement dans les serveurs (pas en DM).

## Exemples

### Commande restreinte

```bdfd
$if[$isNSFW==true]
  ;; Afficher le contenu NSFW
  $sendMessage[🔞 Contenu NSFW...]
$else
  $sendMessage[❌ Cette commande ne peut être utilisée que dans un canal NSFW.]
$endif
```

### Information canal

```bdfd
$title[📺 Informations du canal]
$description[
**Nom :** $channelName
**ID :** $channelID
**NSFW :** $if[$isNSFW==true]🔞 Oui$else✅ Non$endif
**Catégorie :** $channelCategory
]
$sendMessage[]
```

### Vérification d'un autre canal

```bdfd
$var[canal;$message[1]]
$if[$isNSFW[$var[canal]]==true]
  $sendMessage[🔞 Le canal <#$var[canal]> est NSFW.]
$else
  $sendMessage[✅ Le canal <#$var[canal]> n'est pas NSFW.]
$endif
```

## Notes

- Sans paramètre, vérifie le canal où la commande est exécutée.
- En DM, la fonction retourne toujours `false`.
- Pour modifier le statut NSFW d'un canal, utilisez `$modifyChannel[]`.
