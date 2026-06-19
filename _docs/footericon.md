---
layout: doc
title: $footerIcon[]
translation_key: docs
category: "Embed & Message"
function_name: footerIcon
syntax: $footerIcon[url;(embedIndex)]
description: Modifie l'icône du footer d'un embed après que celui-ci a été défini avec $footer[]. Permet de changer uniquement l'image sans modifier le texte.
parameters:
  - name: url
    description: URL de la nouvelle icône pour le footer. Doit être une URL valide pointant vers une image.
  - name: embedIndex
    description: "Optionnel. Index de l'embed ciblé (défaut : 0)."
returns:
  - type: void
    description: Modifie l'icône du footer dans la réponse en cours de construction.
related:
  - $footer[]
  - $authorIcon[]
  - $sendMessage[]
examples:
  - description: Changer l'icône du footer après coup
    code: |
      $title[Profil]
      $description[Informations utilisateur.]
      $footer[Demandé par $username]
      $footerIcon[$authorAvatar]
      $color[#5865F2]
  - description: Icône conditionnelle selon le statut
    code: |
      $title[Statut]
      $footer[Dernière mise à jour]
      $if[$var[status]==online]
      $footerIcon[https://example.com/online.png]
      $else
      $footerIcon[https://example.com/offline.png]
      $endif
---

# $footerIcon[]

La fonction `$footerIcon[]` permet de **modifier uniquement l'icône** d'un footer déjà défini avec `$footer[]`. Elle est utile lorsque vous souhaitez définir une icône dynamique sans répéter le texte du footer.

## Syntaxe

```
$footerIcon[url;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `url` | URL de l'image à utiliser comme icône du footer. |
| `embedIndex` | Optionnel. Index de l'embed ciblé (0 par défaut). |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Quand utiliser $footerIcon[]

- Vous avez déjà défini le footer avec `$footer[text]` et souhaitez ajouter ou changer l'icône.
- L'icône dépend d'une variable dynamique (avatar, statut, etc.).
- Vous voulez séparer la logique du texte et de l'icône pour un code plus lisible.

## Exemples

### Icône dynamique basée sur l'utilisateur

```bdfd
$title[Profil]
$description[
**Nom :** $username
**Tag :** $discriminator
]
$footer[Demandé par $username]
$footerIcon[$authorAvatar]
$color[#5865F2]
$sendMessage[]
```

### Icône conditionnelle

```bdfd
$title[Statut du serveur]
$description[Le serveur est opérationnel.]
$footer[Dernière vérification : $time]
$if[$var[status]==online]
$footerIcon[https://cdn.example.com/green.png]
$else
$footerIcon[https://cdn.example.com/red.png]
$endif
$color[#57F287]
$sendMessage[]
```

## Notes

- `$footerIcon[]` doit être appelé **après** `$footer[]`, sinon il n'y a pas de footer sur lequel appliquer l'icône.
- Si `$footerIcon[]` est appelé avant `$footer[]`, l'icône sera ignorée.
- L'URL doit pointer vers une image accessible publiquement.
