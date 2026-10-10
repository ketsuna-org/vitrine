---
title: "Image Creation & Canvas Functions in BDFD"
description: Generate dynamic images and visual overlays from your Discord bot (Bot-Creator exclusive)
category: "Advanced Topics"
function_syntax: $canvasCreate[name;width;height;(color)]
date: 2026-06-11T12:00:00.000+02:00
author: Garder500
translation_key: canvas-functions-guide
locale: en
content_language: en
layout: post
toc: true
---

BDFD's **Image & Canvas** system lets your Discord bot generate dynamic images on the fly: welcome cards, leaderboards, progress bars, and more. You can load external images from URLs, overlay them with shape masks and blend modes, draw text and shapes, and even composite multiple images together — all directly from your BDFD command code.

The canvas system works as a **deferred rendering pipeline**: you start a canvas with `$canvasCreate`, chain together drawing operations, and finalize the result with `$attachImage` (or let it render automatically when the message is sent). All 14 functions are exclusive to the **Bot-Creator** platform.

---

## 🧱 How Canvas Blocks Work

Before diving into individual functions, here is the mental model:

1. **Start a canvas** with `$canvasCreate` — it gives the canvas a name and a size.
2. **Add operations** — draw shapes, load images, write text. Each call is recorded in order and belongs to the **most recently created canvas**. Drawing functions only make sense after a `$canvasCreate`: with no canvas yet, `$attachImage` fails with the error `Canvas "name" does not exist; use $canvasCreate first`.
3. **Render** — `$attachImage[name]` renders the canvas immediately. A canvas that was never rendered this way is rendered automatically just before the response is sent.
4. **Attachment** — the rendered image is a PNG sent with the message as `name.png`.

> [!NOTE]
> **Multiple canvases in one command.** Calling `$canvasCreate` again starts another independent canvas, and the operations that follow go to that new canvas. Use `$attachImage[name]` with each name to render them.

> [!WARNING]
> **Memory limits.** The maximum canvas size is **4096 × 4096 pixels** (~67 MB): a larger width or height is reduced to 4096, and a width or height below 1 becomes 1. Images loaded from URLs are cached in an LRU cache capped at **50 MB**. Keep your dimensions reasonable to avoid memory issues.

---

## 📋 Quick Reference Table

| # | Function | Purpose |
|:-:|:---|:---|
| 1 | `$canvasCreate` | Creates a blank canvas |
| 2 | `$canvasLoadImage` | Loads an image from a URL or a base64 string |
| 3 | `$canvasCompositeImage` | Overlays an image with shape masks and blend modes |
| 4 | `$canvasDrawText` | Draws text on the canvas |
| 5 | `$canvasDrawCircle` | Draws a circle (filled or outline) |
| 6 | `$canvasDrawRect` | Draws a rectangle (filled or outline) |
| 7 | `$canvasDrawLine` | Draws a line with configurable thickness |
| 8 | `$canvasProgressBar` | Draws a progress bar (horizontal or vertical) |
| 9 | `$canvasSetPixel` | Sets a single pixel |
| 10 | `$canvasInvert` | Inverts the colors of the whole canvas |
| 11 | `$canvasGrayscale` | Converts the whole canvas to grayscale |
| 12 | `$canvasRotate` | Rotates the whole canvas |
| 13 | `$canvasContainer` | Defines an offset for relative coordinates |
| 14 | `$attachImage` | Renders a canvas and attaches it to the message |

---

## 🎨 Colors, Blending & Image Sources

### Supported Color Formats

Every function that accepts a `color` parameter understands these formats:

| Format | Example | Description |
|:---|:---|:---|
| Hex (no prefix) | `FF5733` | RRGGBB |
| Hex (with `#`) | `#FF5733` | #RRGGBB |
| Hex with alpha | `FF573380` | RRGGBBAA (alpha = opacity, `00` is fully transparent) |
| Named color | `red`, `blue`, `gold` | 21 predefined names |

**Named colors available:** `red`, `green`, `blue`, `white`, `black`, `transparent`, `yellow`, `cyan`, `magenta`, `orange`, `purple`, `pink`, `gray`, `grey`, `lime`, `navy`, `teal`, `aqua`, `maroon`, `silver`, `gold`.

An empty or unreadable color does not raise an error: it silently becomes white.

### Blend Modes

Several drawing functions (`$canvasDrawCircle`, `$canvasDrawRect`, `$canvasDrawLine`, `$canvasCompositeImage`) support the optional `blend` parameter. Blend modes change how a new shape or image interacts with what is already on the canvas. Names are not case-sensitive, and an empty value, `normal`, or an unknown name draws normally:

| Blend Mode | Effect | Best For |
|:---|:---|:---|
| `multiply` | Darkens — multiplies pixel values | Shadows, darkening overlays |
| `screen` | Lightens — inverts and multiplies | Highlights, glow effects |
| `overlay` | Combines multiply and screen | Adding contrast |
| `darken` | Keeps the darkest pixel per channel | Stamping dark elements |
| `lighten` | Keeps the lightest pixel per channel | Light overlays |
| `difference` | Absolute difference between pixels | Inversion effects, detecting changes |
| `hardLight` | Strong contrast blend | Dramatic lighting |
| `softLight` | Subtle contrast blend | Soft spotlight effects |

### Image Source Formats

Functions that accept image URLs (`$canvasLoadImage`, `$canvasCompositeImage`) can read from:

1. **HTTP/HTTPS URLs** — fetched with a 15-second timeout and cached while rendering.
2. **Raw base64 strings** — the fallback when the text is not a URL.

A `data:image/png;base64,...` URL is also understood by the renderer, but it contains a `;`, which BDFD reads as an argument separator, so it cannot be written directly inside a function call: use a raw base64 string instead.

If an image cannot be fetched or decoded, the operation is silently skipped and the canvas is left unchanged.

---

## 🏁 Section 1: Canvas Lifecycle

### $canvasCreate — Creates a Blank Canvas

Every image starts here. `$canvasCreate` initializes a new canvas with the dimensions and background color you specify.

```bdfd
$canvasCreate[name;width;height;(color)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `name` | ✅ | Identifier for this canvas (used later by `$attachImage`) |
| `width` | ✅ | Canvas width in pixels (1 to 4096; a non-number gives 400) |
| `height` | ✅ | Canvas height in pixels (1 to 4096; a non-number gives 300) |
| `color` | ❌ | Background color (default: white) |

**Example — A 600×400 canvas with a dark background:**

```bdfd
$canvasCreate[myBanner;600;400;2C2F33]
```

**Example — A transparent canvas:**

```bdfd
$canvasCreate[overlay;800;600;transparent]
```

---

### $canvasLoadImage — Loads an Image from a URL

Loads an external image onto the canvas.

```bdfd
$canvasLoadImage[url;(x);(y);(width);(height);(container)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `url` | ✅ | Image URL (HTTP/HTTPS) or raw base64 string |
| `x` | ❌ | Horizontal position on the canvas (default 0) |
| `y` | ❌ | Vertical position on the canvas (default 0) |
| `width` | ❌ | Resize width (pixels) |
| `height` | ❌ | Resize height (pixels) |
| `container` | ❌ | Name of a container that offsets `x` and `y` |

> [!TIP]
> **Positioned vs. unpositioned loading.** The image is only resized when **both** `width` and `height` are given. If you give a position (`x` or `y` other than 0) or a `width`, the image is drawn on top of the existing canvas at that position. If you give none of them, the loaded image **replaces** the current canvas and keeps its own dimensions. The canvas must have been created with `$canvasCreate` first.

**Example — Using an avatar as the canvas base:**

```bdfd
$canvasCreate[avatar;256;256]
$canvasLoadImage[$authorAvatar]
$attachImage[avatar]
```

**Example — Loading an avatar on top of a background:**

```bdfd
$canvasCreate[profile;800;400;#2C2F33]
$canvasLoadImage[$authorAvatar;50;50;128;128]
$attachImage[profile]
```

---

### $canvasContainer — Defines a Positioning Offset

A container is a named offset. Once defined, any later operation that references the container by name has its coordinates **shifted** by the container's `x` and `y` values.

```bdfd
$canvasContainer[name;x;y;width;height;(color)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `name` | ✅ | Container identifier |
| `x` | ✅ | X offset added to the coordinates of the operations that use the container |
| `y` | ✅ | Y offset added to the coordinates of the operations that use the container |
| `width` | ✅ | Accepted, but not used when drawing (nothing is clipped) |
| `height` | ✅ | Accepted, but not used when drawing (nothing is clipped) |
| `color` | ❌ | Accepted, but nothing is drawn: a container has no visible background |

The offset applies to `x`/`y` (and to both points of `$canvasDrawLine`) of `$canvasLoadImage`, `$canvasCompositeImage`, `$canvasDrawText`, `$canvasDrawCircle`, `$canvasDrawRect`, `$canvasDrawLine`, `$canvasProgressBar` and `$canvasSetPixel`. A container must be defined before it is used; an unknown container name applies no offset.

**Example — Drawing inside a centered box:**

```bdfd
$canvasCreate[layout;600;400;#1a1a2e]
$canvasContainer[header;50;20;500;80]
$canvasDrawRect[0;0;500;80;16213e;true;;header]
$canvasDrawText[Welcome!;0;20;32;white;center;500;header]
$attachImage[layout]
```

Here, the rectangle and the text are positioned relative to the container, which places them at absolute position `(50, 20)` and `(50, 40)` on the canvas. The `center` alignment with `maxWidth=500` centers the text within a 500px-wide area.

---

### $attachImage — Renders and Attaches

`$attachImage` renders a canvas and registers the image as a message attachment.

```text
$attachImage[(name)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `name` | ❌ | Name of a canvas created with `$canvasCreate`. Without it, the most recently created canvas is used. The attachment is named `name.png` |

If the canvas does not exist, the command fails with the error `Canvas "name" does not exist; use $canvasCreate first`.

```bdfd
$canvasCreate[result;400;300;white]
$canvasDrawText[Hello World!;20;130;24;black]
$attachImage[result]
```

---

## ✏️ Section 2: Drawing Shapes

For the `fill` parameter, `true`, `yes` and `1` mean filled; `false`, `no` and `0` mean outline only. Any other text counts as filled.

### $canvasDrawRect — Draws a Rectangle

The simplest shape primitive. Draws a rectangle at the specified position.

```bdfd
$canvasDrawRect[x;y;width;height;color;fill;(blend);(container)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Top-left X |
| `y` | ✅ | Top-left Y |
| `width` | ✅ | Rectangle width |
| `height` | ✅ | Rectangle height |
| `color` | ✅ | Fill or outline color |
| `fill` | ✅ | `true` for filled, `false` for outline only |
| `blend` | ❌ | Blend mode |
| `container` | ❌ | Container name |

**Example — Filled red rectangle:**

```bdfd
$canvasCreate[shapes;400;300;white]
$canvasDrawRect[50;50;200;100;E53935;true]
$attachImage[shapes]
```

**Example — Outline-only rectangle:**

```bdfd
$canvasCreate[frame;400;300;white]
$canvasDrawRect[20;20;360;260;1E88E5;false]
$attachImage[frame]
```

---

### $canvasDrawCircle — Draws a Circle

Draws a circle. Can be filled or just an outline.

```bdfd
$canvasDrawCircle[x;y;radius;color;fill;(blend);(container)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Center X |
| `y` | ✅ | Center Y |
| `radius` | ✅ | Circle radius in pixels |
| `color` | ✅ | Fill or outline color |
| `fill` | ✅ | `true` for filled, `false` for outline only |
| `blend` | ❌ | Blend mode |
| `container` | ❌ | Container name |

**Example — Red filled circle:**

```bdfd
$canvasCreate[dot;200;200;white]
$canvasDrawCircle[100;100;60;E53935;true]
$attachImage[dot]
```

**Example — Multiple overlapping semi-transparent circles:**

```bdfd
$canvasCreate[venn;400;300;white]
$canvasDrawCircle[150;130;80;E5393580;true]
$canvasDrawCircle[250;130;80;1E88E580;true]
$canvasDrawCircle[200;200;80;43A04780;true]
$attachImage[venn]
```

---

### $canvasDrawLine — Draws a Line

Draws a straight line between two points using the Bresenham algorithm with configurable thickness.

```bdfd
$canvasDrawLine[x1;y1;x2;y2;color;thickness;(blend);(container)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x1` | ✅ | Start X |
| `y1` | ✅ | Start Y |
| `x2` | ✅ | End X |
| `y2` | ✅ | End Y |
| `color` | ✅ | Line color |
| `thickness` | ✅ | Line width in pixels (values are kept between 1 and 100) |
| `blend` | ❌ | Blend mode |
| `container` | ❌ | Container name |

**Example — A diagonal line:**

```bdfd
$canvasCreate[divider;300;200;white]
$canvasDrawLine[20;20;280;180;E53935;3]
$attachImage[divider]
```

**Example — Grid lines for a chart background:**

```bdfd
$canvasCreate[grid;400;300;white]
$canvasDrawLine[0;75;400;75;#DDDDDD;1]
$canvasDrawLine[0;150;400;150;#DDDDDD;1]
$canvasDrawLine[0;225;400;225;#DDDDDD;1]
$attachImage[grid]
```

---

### $canvasSetPixel — Sets a Single Pixel

Colors exactly one pixel. Coordinates outside the canvas are ignored.

```bdfd
$canvasSetPixel[x;y;color;(container)]
```

```bdfd
$canvasCreate[dots;50;50;white]
$canvasSetPixel[10;10;red]
$canvasSetPixel[11;10;red]
$attachImage[dots]
```

---

## 🔤 Section 3: Drawing Text

### $canvasDrawText — Draws Text on the Canvas

Writes text at a specific position. The font is a bitmap Arial font chosen from the font size: below 20 uses `arial14`, 20 to 39 uses `arial24`, and 40 or more uses `arial48`.

```bdfd
$canvasDrawText[text;x;y;fontSize;color;(textAlign);(maxWidth);(container)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `text` | ✅ | The text string to draw (empty text draws nothing) |
| `x` | ✅ | Horizontal position |
| `y` | ✅ | Vertical position |
| `fontSize` | ✅ | Font size in pixels (selects one of the three fonts above) |
| `color` | ✅ | Text color |
| `textAlign` | ❌ | `left` (default), `center`, or `right` (only used with `maxWidth`) |
| `maxWidth` | ❌ | Width of the area used for alignment. It does not wrap or cut the text |
| `container` | ❌ | Container name |

> [!NOTE]
> **Text alignment** only works when `maxWidth` is provided. Without it, `textAlign` is ignored. The text is placed inside the horizontal space of width `maxWidth` that starts at `x`.

**Example — Simple centered title:**

```bdfd
$canvasCreate[title;600;200;#2C2F33]
$canvasDrawText[Welcome to the Server!;0;80;36;white;center;600]
$attachImage[title]
```

**Example — Left aligned text:**

```bdfd
$canvasCreate[score;500;150;#1a1a2e]
$canvasDrawText[Player: $username;20;30;20;cyan;left;460]
$canvasDrawText[Score: $getUserVar[score];20;70;20;gold;left;460]
$attachImage[score]
```

---

## 📊 Section 4: Progress Bars

### $canvasProgressBar — Draws a Progress Bar

Renders a horizontal or vertical progress bar with a percentage label drawn at its center.

```bdfd
$canvasProgressBar[x;y;width;height;percentage;barColor;trackColor;(textColor);(borderWidth);(orientation);(fontSize);(container);(borderRadius)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Top-left X |
| `y` | ✅ | Top-left Y |
| `width` | ✅ | Bar width |
| `height` | ✅ | Bar height |
| `percentage` | ✅ | Whole number from 0 to 100 (supports variables like `$getUserVar[xp]`); values outside the range are clamped, and a non-integer such as `12.5` counts as 0 |
| `barColor` | ✅ | Color of the filled portion |
| `trackColor` | ✅ | Color of the unfilled background |
| `textColor` | ❌ | Color of the percentage label (default: white) |
| `borderWidth` | ❌ | Border thickness in pixels (default: 0, maximum 50). The border is drawn in `barColor` |
| `orientation` | ❌ | `horizontal` (default) or `vertical` (fills from the bottom) |
| `fontSize` | ❌ | Label font size (default: 14, same fonts as `$canvasDrawText`) |
| `container` | ❌ | Container name |
| `borderRadius` | ❌ | Corner rounding radius in pixels (default: 0) |

The label always shows the percentage followed by `%` (for example `50%`).

**Example — Horizontal XP bar:**

```bdfd
$canvasCreate[level;500;200;#2C2F33]
$canvasProgressBar[50;80;400;30;$getUserVar[xp];43A047;#555555;#FFFFFF;2;horizontal]
$attachImage[level]
```

**Example — Vertical health bar:**

```bdfd
$canvasCreate[health;200;300;#1a1a2e]
$canvasProgressBar[80;30;30;200;$getUserVar[hp];E53935;#333333;#FFFFFF;2;vertical]
$canvasDrawText[HP;85;250;14;white]
$attachImage[health]
```

---

## 🖼️ Section 5: Image Compositing

### $canvasCompositeImage — Overlay with Shape Masks & Blend Modes

Loads an image, resizes it, applies an optional **shape mask** (circle, rounded rectangle, triangle), and blends it onto the canvas using an optional **blend mode**.

```bdfd
$canvasCompositeImage[url;x;y;width;height;(shape);(blend);(container)]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `url` | ✅ | Image source (URL or raw base64) |
| `x` | ✅ | Horizontal position |
| `y` | ✅ | Vertical position |
| `width` | ✅ | Resize width |
| `height` | ✅ | Resize height |
| `shape` | ❌ | Shape mask: `circle`, `round`, `oval`, `ellipse`, `triangle`, `rounded:15`, `roundrect:15` |
| `blend` | ❌ | Blend mode |
| `container` | ❌ | Container name |

The image is resized only when both `width` and `height` are greater than 0. The canvas must have been created with `$canvasCreate` first.

**Shape mask options:**

| Shape Value | Effect |
|:---|:---|
| `circle` / `round` / `oval` / `ellipse` | Circular crop with anti-aliased edges, sized on the smaller side of the image |
| `triangle` | Triangular crop |
| `rounded:15` / `roundrect:15` | Rounded rectangle crop with a 15px radius (`rounded` alone uses 20px) |

**Example — Circular avatar on a background:**

```bdfd
$canvasCreate[profile;600;300;#2C2F33]
$canvasCompositeImage[$authorAvatar;50;50;128;128;circle]
$canvasDrawText[$username;200;80;28;white]
$canvasDrawText[Level $getUserVar[level];200;120;18;#AAAAAA]
$attachImage[profile]
```

**Example — Image with rounded corners and a multiply blend:**

```bdfd
$canvasCreate[card;500;400;#1a1a2e]
$canvasCompositeImage[https://example.com/photo.jpg;25;25;450;350;rounded:20;multiply]
$attachImage[card]
```

**Example — Overlaying with screen blend for a glow effect:**

```bdfd
$canvasCreate[glow;800;600]
$canvasLoadImage[https://example.com/background.jpg]
$canvasCompositeImage[https://example.com/light-overlay.png;0;0;800;600;;screen]
$attachImage[glow]
```

---

## 🎛️ Section 6: Whole-Canvas Effects

These functions act on everything drawn so far on the current canvas.

| Function | Effect |
|:---|:---|
| `$canvasInvert` | Inverts the colors (takes no argument) |
| `$canvasGrayscale` | Converts the canvas to grayscale (takes no argument) |
| `$canvasRotate[degrees]` | Rotates the canvas by the given angle in degrees. A 90° rotation turns a 20×10 canvas into a 10×20 one; an angle such as 45 enlarges the canvas (100×100 becomes 141×141) and fills the new corners with black. `0` or a non-number leaves it unchanged |

```bdfd
$canvasCreate[effects;300;200;E53935]
$canvasDrawText[Hello;20;20;24;white]
$canvasGrayscale
$canvasRotate[90]
$attachImage[effects]
```

---

## 🧩 Section 7: Putting It All Together

### Complete Example — A User Profile Card

Here is a real-world example that combines canvas creation, image compositing, shapes, text, and a progress bar into a single profile card:

```bdfd
$canvasCreate[profile;700;300;#2C2F33]

$canvasDrawRect[15;15;670;270;23272A;true]

$canvasCompositeImage[$authorAvatar;30;30;100;100;circle]

$canvasDrawText[$username;150;45;28;white]

$canvasContainer[stats;150;110;500;80]
$canvasDrawText[Level $getUserVar[level];0;0;20;gold;left;500;stats]
$canvasProgressBar[0;30;500;20;$getUserVar[xp];43A047;#555555;#FFFFFF;1;horizontal;;stats]
$canvasDrawText[$getUserVar[xp] XP;0;58;14;#AAAAAA;left;500;stats]

$canvasDrawText[Messages: $getUserVar[messages];30;220;14;#CCCCCC]

$attachImage[profile]
```

### Complete Example — A Stats Panel with Progress Bars

```bdfd
$canvasCreate[panel;500;250;#1a1a2e]
$canvasDrawText[Server Stats;0;20;28;white;center;500]

$canvasContainer[bars;40;70;420;160]
$canvasDrawText[Activity;0;0;14;#CCCCCC;left;420;bars]
$canvasProgressBar[0;20;420;24;75;E53935;#333333;#FFFFFF;0;horizontal;;bars]
$canvasDrawText[Members online;0;60;14;#CCCCCC;left;420;bars]
$canvasProgressBar[0;80;420;24;40;1E88E5;#333333;#FFFFFF;0;horizontal;;bars;8]

$attachImage[panel]
```

---

## ⚠️ Important Rules & Safety Tips

> [!WARNING]
> **Canvas dimensions limit.** The maximum size is **4096 × 4096 pixels**. A larger value is reduced to 4096. If you need very large images, consider scaling down.

> [!WARNING]
> **URL timeout.** Images loaded from external URLs have a **15-second timeout**. If the remote server is slow to respond or the image cannot be decoded, the image is silently skipped. Host your assets on fast, reliable servers or CDNs.

> [!WARNING]
> **Semicolons.** `;` separates function arguments in BDFD, so it cannot appear inside an argument such as a `data:image/...;base64,...` URL or a text to draw.

> [!TIP]
> **Use containers for layout.** Instead of hardcoding absolute positions for every element, define containers for logical sections (header, body, footer, sidebar). This makes your code easier to read and modify.

> [!TIP]
> **Layer order matters.** Operations are drawn in the order they appear in your code. The first operation is at the bottom (background), and the last operation is on top (foreground). Think of it like painting: you paint the background first, then add details on top.

> [!NOTE]
> **Rendering time.** Canvas functions only record operations; the image is produced when `$attachImage` runs or, for canvases not yet rendered, just before the response is sent.

> [!NOTE]
> **Font availability.** Text rendering uses a bitmap Arial font at three fixed sizes (14, 24, 48). The font size you give selects one of them (below 20, 20 to 39, 40 and above). If you need precise typography, test with your target size to ensure the output looks as expected.

---

## 📚 Summary

BDFD's canvas system gives you a simple 2D rendering engine inside your bot commands. Here is a quick recap of what you can do:

| Capability | Functions |
|:---|:---|
| **Create & load canvases** | `$canvasCreate`, `$canvasLoadImage`, `$canvasContainer`, `$attachImage` |
| **Draw shapes** | `$canvasDrawRect`, `$canvasDrawCircle`, `$canvasDrawLine`, `$canvasSetPixel` |
| **Draw text** | `$canvasDrawText` |
| **Progress bars** | `$canvasProgressBar` |
| **Image compositing** | `$canvasCompositeImage` |
| **Whole-canvas effects** | `$canvasInvert`, `$canvasGrayscale`, `$canvasRotate` |
| **Blend modes** | 8 modes (`multiply`, `screen`, `overlay`, `darken`, `lighten`, `difference`, `hardLight`, `softLight`) |

With these 14 functions, you can build welcome cards, level-up banners, leaderboard graphics, progress trackers, and many other dynamic images your Discord community needs — all without leaving BDFD's scripting environment.
