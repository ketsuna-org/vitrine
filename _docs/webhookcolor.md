---
layout: doc
title: $webhookColor
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookColor
syntax: $webhookColor[hexColor]
description: Définit la couleur de la barre latérale de l'embed pour le prochain message envoyé via $webhookSend.
parameters:
  - name: hexColor
    description: La couleur en format hexadécimal (avec ou sans #). Exemple : #FF0000 ou FF0000.
returns:
  - type: aucun
    description: Ne retourne rien. Modifie la couleur du prochain embed webhook.
related:
  - $webhookTitle
  - $webhookDescription
  - $webhookFooter
  - $webhookSend
examples:
  - description: Couleur rouge
    code: $webhookColor[#FF0000]
  - description: Couleur sans #
    code: $webhookColor[5865F2]
---

# $webhookColor

La fonction `$webhookColor[]` permet de **définir la couleur de l'embed** (barre latérale gauche) pour le prochain message webhook.

## Syntaxe

```
$webhookColor[hexColor]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `hexColor` | Code couleur hexadécimal, avec ou sans le préfixe `#`. Exemples : `#FF0000`, `5865F2`, `00FF00`. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Elle définit la couleur du prochain embed.

## Comportement

- La couleur s'applique à la barre latérale gauche de l'embed.
- Si aucun embed n'est défini (pas de `$webhookTitle` ou `$webhookDescription`), la couleur est ignorée.
- La couleur est réinitialisée après chaque `$webhookSend[]`.

## Exemples

### Embed coloré

```bdfd
$webhookTitle[Succès]
$webhookDescription[L'opération a été effectuée avec succès.]
$webhookColor[#57F287]
$webhookFooter[✅ Opération réussie]
$webhookSend[$webhookURL;]
```

### Couleurs conditionnelles

```bdfd
$if[$checkContains[$message;erreur]==true]
  $webhookColor[#ED4245]
  $webhookTitle[Erreur détectée]
$else
  $webhookColor[#5865F2]
  $webhookTitle[Information]
$endif
$webhookDescription[$message]
$webhookSend[$logHook;]
```

## Notes

- Utilisez des couleurs cohérentes pour la lisibilité : rouge pour erreurs, vert pour succès, bleu pour info.
- La couleur par défaut de Discord est `#000000` (pas de barre colorée).
- Les couleurs trop claires peuvent être peu visibles en thème clair.
