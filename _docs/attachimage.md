---
layout: doc
title: $attachImage
translation_key: docs
category: "Canvas"
function_name: attachImage
syntax: $attachImage[name;url;(spoiler)]
description: Attache une image au message de réponse en utilisant un nom et une URL distante.
parameters:
  - name: name
    description: "Nom du fichier attaché (ex: image.png)."
  - name: url
    description: URL de l'image à attacher. Doit être accessible publiquement.
  - name: spoiler
    description: Optionnel - Si "true", l'image sera marquée comme spoiler.
returns:
  - type: void
    description: L'image est jointe au message envoyé par $sendMessage[].
related:
  - $attachCanvas
  - $attachFile
  - $sendMessage
examples:
  - description: Attacher une image simple
    code: |
      $attachImage[monimage.png;https://example.com/image.png]
      $sendMessage[Voici l'image !]
  - description: Image en spoiler
    code: |
      $attachImage[secret.png;https://example.com/spoiler.png;true]
      $sendMessage[Image spoiler :]
---

# $attachImage

La fonction `$attachImage[name;url;(spoiler)]` **attache une image distante** au prochain message envoyé via `$sendMessage[]`. L'image est téléchargée depuis l'URL fournie et jointe en tant que pièce jointe Discord.

## Syntaxe

```
$attachImage[name;url;(spoiler)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Nom du fichier tel qu'il apparaîtra dans Discord (ex: `photo.png`, `avatar.gif`). |
| `url` | URL de l'image à télécharger. Doit être une URL HTTPS accessible publiquement. |
| `spoiler` | Optionnel - `true` pour marquer l'image comme spoiler (floutée jusqu'au clic). |

## Valeur de retour

Aucune. L'image est mise en file d'attente pour le prochain `$sendMessage[]`.

## Comportement

- L'image est téléchargée par le bot depuis l'URL fournie.
- Le nom du fichier doit inclure une extension valide (.png, .jpg, .gif, .webp, etc.).
- Les images en spoiler sont floutées dans Discord jusqu'à ce que l'utilisateur clique dessus.
- Prend en charge les formats PNG, JPEG, GIF, WebP (limite de taille selon le niveau du bot).

## Exemples

### Attacher une image simple

```bdfd
$attachImage[logo.png;https://monsite.com/logo.png]
$sendMessage[Voici notre logo !]
```

### Image en spoiler

```bdfd
$attachImage[spoiler_alerte.png;https://monsite.com/spoiler.png;true]
$sendMessage[⚠️ Attention spoiler ci-dessous :]
```

### Avatar d'un utilisateur

```bdfd
$attachImage[avatar_$username.png;$userAvatar[$mentioned[1]]]
$sendMessage[Avatar de <@$mentioned[1]> :]
```

### Plusieurs images

```bdfd
$attachImage[avant.png;$attachment[1]]
$attachImage[apres.png;$attachment[2]]
$sendMessage[Comparaison avant/après :]
```

### Intégration avec Canvas

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$attachCanvas[resultat.png]
$attachImage[original.png;$attachment]
$sendMessage[🔲 Original vs Niveaux de gris :]
```

## Notes

- L'URL doit commencer par `https://` et être accessible sans authentification.
- La taille maximale dépend du niveau d'abonnement du bot (généralement 8 Mo en gratuit).
- Pour attacher le canvas courant, utilisez `$attachCanvas[]`.
- Pour attacher un fichier local (non-image), utilisez `$attachFile[]`.
- Les pièces jointes sont consommées par le prochain `$sendMessage[]` uniquement.
