---
layout: doc
title: $attachImage
translation_key: docs
category: "Canvas"
function_name: attachImage
syntax: $attachImage[name;url;(spoiler)]
description: Attache an image au message de response en utilisant a name and a URL distante.
---

# $attachImage

The `$attachImage[name;url;(spoiler)]` function **attache an image distante** au prochain message sent via `$sendMessage[]`. The image est téléloadede since the URL fournie and jointe as a attachment Discord.

## Syntax

```
$attachImage[name;url;(spoiler)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | File name tel qu'il apparaîtra dans Discord (ex: `photo.png`, `avatar.gif`). |
| `url` | URL of the image à télécharger. Doit être a URL HTTPS accessible publicment. |
| `spoiler` | Optional - `true` pour marquer the image comme spoiler (floutée jusqu'au clic). |

## Return value

None. The image est mise en file d'attente for the prochain `$sendMessage[]`.

## Behavior

- L'image est téléloadede par the bot since the URL fournie.
- Le file name doit inclure une extension valid (.png, .jpg, .gif, .webp, etc.).
- Les images en spoiler sont floutées dans Discord until the user clicks dessus.
- Prend en charge les formats PNG, JPEG, GIF, WebP (limit de taille selon le level of the bot).

## Examples

### Attacher an image simple

```bdfd
$attachImage[logo.png;https://monsite.com/logo.png]
$sendMessage[Voici notre logo !]
```

### Image en spoiler

```bdfd
$attachImage[spoiler_alerte.png;https://monsite.com/spoiler.png;true]
$sendMessage[⚠️ Attention spoiler ci-dessous :]
```

### Avatar of a user

```bdfd
$attachImage[avatar_$username.png;$userAvatar[$mentioned[1]]]
$sendMessage[Avatar de <@$mentioned[1]> :]
```

### Multiple images

```bdfd
$attachImage[before.png;$attachment[1]]
$attachImage[apres.png;$attachment[2]]
$sendMessage[Compareason before/after :]
```

### Intégration avec Canvas

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$attachCanvas[resultat.png]
$attachImage[original.png;$attachment]
$sendMessage[🔲 Original vs Levelx de gris :]
```

## Notes

- The URL must commencer par `https://` and être accessible without authentification.
- The size maximale dépend du level d'abonnement of the bot (generally 8 Mo en gratuit).
- Pour attacher le canvas courant, use `$attachCanvas[]`.
- Pour attacher a file local (non-image), use `$attachFile[]`.
- Les attachments sont consommées par le prochain `$sendMessage[]` only.
