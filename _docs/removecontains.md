---
layout: doc
title: $removeContains
translation_key: docs
category: "Text Manipulation"
function_name: removeContains
syntax: $removeContains[text]
description: Supprime toutes les occurrences d'une chaîne de caractères dans un texte donné. Recherche et remplace par une chaîne vide.
parameters:
  - name: text
    description: La chaîne de caractères à supprimer du texte courant.
returns:
  - type: string
    description: Le texte sans les occurrences de la chaîne cible.
related:
  - $replaceText
  - $removeLinks
  - $trimContent
examples:
  - description: Supprimer un mot
    code: $sendMessage[$removeContains[spam]]
---
# $removeContains

La fonction `$removeContains[]` **supprime toutes les occurrences** d'une chaîne dans le texte. Elle opère sur le texte du message ($message) ou le contexte textuel courant.

## Syntaxe

```
$removeContains[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | La chaîne à supprimer. |

## Valeur de retour

- **Type** : Chaîne
- Le texte sans les occurrences de la chaîne cible.

## Comportement

- Sensible à la casse.
- Supprime toutes les occurrences, pas seulement la première.
- Fonctionne sur le message utilisateur ou la valeur textuelle en contexte.

## Exemples

### Nettoyer un message

```bdfd
$sendMessage[Message nettoyé : $removeContains[spam]]
; Pour un message "ceci est du spam marketing"
; Résultat : "ceci est du  marketing"
```

### Supprimer des gros mots

```bdfd
$let[filtered;$removeContains[insulte]]
$sendMessage[Message filtré : $filtered]
```

### Nettoyage multiple

```bdfd
$sendMessage[$removeContains[badword1]]
$sendMessage[$removeContains[badword2]]
```

## Notes

- Pour un remplacement (pas une suppression), utilisez `$replaceText[]`.
- Pour supprimer uniquement les liens, utilisez `$removeLinks`.
- Pour supprimer les espaces autour, utilisez `$trimContent[]`.
