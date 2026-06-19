---
layout: doc
title: $attachImage
translation_key: docs
category: "Image & Canvas"
function_name: attachImage
syntax: $attachImage[name;url;(spoiler)]
description: Attaches a remote image to the response message using a name and a URL.
---

# $attachImage

The `$attachImage[name;url;(spoiler)]` function **attaches a remote image** to the next message sent via `$sendMessage[]`. The image is downloaded from the provided URL and attached as a Discord attachment.

## Syntax

```
$attachImage[name;url;(spoiler)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | File name as it will appear in Discord (e.g., `photo.png`, `avatar.gif`). |
| `url` | URL of the image to download. Must be a publicly accessible HTTPS URL. |
| `spoiler` | Optional - `true` to mark the image as a spoiler (blurred until clicked). |

## Return value

None. The image is queued for the next `$sendMessage[]`.

## Behavior

- The image is downloaded by the bot from the provided URL.
- The file name must include a valid extension (.png, .jpg, .gif, .webp, etc.).
- Spoiler images are blurred in Discord until the user clicks on them.
- Supports PNG, JPEG, GIF, WebP formats (size limit according to the bot's limit).

## Examples

### Attaching a simple image

```bdfd
$attachImage[logo.png;https://mysite.com/logo.png]
$sendMessage[Here is our logo!]
```

### Image as a spoiler

```bdfd
$attachImage[spoiler_alert.png;https://mysite.com/spoiler.png;true]
$sendMessage[⚠️ Spoiler warning below:]
```

### Avatar of a user

```bdfd
$attachImage[avatar_$username.png;$userAvatar[$mentioned[1]]]
$sendMessage[Avatar of <@$mentioned[1]>:]
```

### Multiple images

```bdfd
$attachImage[before.png;$attachment[1]]
$attachImage[after.png;$attachment[2]]
$sendMessage[Comparison before/after:]
```

### Integration with Canvas

```bdfd
$canvasLoad[$attachment]
$canvasGrayscale
$attachCanvas[result.png]
$attachImage[original.png;$attachment]
$sendMessage[🔲 Original vs Grayscale:]
```

## Notes

- The URL must start with `https://` and be accessible without authentication.
- The maximum size depends on the bot's limit (generally 8 MB).
- To attach the current canvas, use `$attachCanvas[]`.
- To attach a local file (non-image), use `$attachFile[]`.
- Attachments are only consumed by the next `$sendMessage[]`.
