---
title: "Image Creation & Canvas Functions in BDFD"
description: Generate dynamic images, charts, and visual overlays from your Discord bot (Bot-Creator exclusive)
category: Image & Canvas
function_syntax: $canvasCreate[name;width;height;color]
date: 2026-06-11T12:00:00.000+02:00
author: Garder500
translation_key: EN
locale: en
content_language: en
layout: post
toc: true
---

BDFD's **Image & Canvas** system lets your Discord bot generate dynamic images on the fly: welcome cards, leaderboards, progress bars, pie charts, bar graphs, line charts, and much more. You can load external images from URLs, overlay them with shape masks and blend modes, draw text, shapes, and even composite multiple images together — all directly from your BDFD command code.

The canvas system works as a **deferred rendering pipeline**: you start a canvas block with `$canvasCreate`, chain together drawing operations, and finalize the result with `$attachImage`. All 15 functions are exclusive to the **Bot-Creator** platform.

---

## 🧱 How Canvas Blocks Work

Before diving into individual functions, here is the mental model:

1. **Start a canvas** with `$canvasCreate` — this opens a deferred image block.
2. **Add operations** — draw shapes, load images, write text, render charts. Each call appends to the current block.
3. **Flush automatically** — the block renders as soon as any non-canvas function is encountered, or when you call `$attachImage`.
4. **Name it** with `$attachImage` — gives the canvas a filename so it can be sent as a Discord attachment.

> [!NOTE]
> **Multiple canvases in one command.** When you call `$canvasCreate` a second time, the previous block is automatically flushed (rendered) and a brand-new block begins. This lets you generate several independent images in a single command execution.

> [!WARNING]
> **Memory limits.** The maximum canvas size is **4096 × 4096 pixels** (~67 MB). Images loaded from URLs are cached in an LRU cache capped at **50 MB per block**. Keep your dimensions reasonable to avoid memory issues.

---

## 📋 Quick Reference Table

| # | Function | Purpose |
|:-:|:---|:---|
| 1 | `$canvasCreate` | Creates a blank canvas |
| 2 | `$canvasLoadImage` | Loads an image from a URL or base64 string |
| 3 | `$canvasCompositeImage` | Overlays an image with shape masks and blend modes |
| 4 | `$canvasDrawText` | Draws text on the canvas |
| 5 | `$canvasDrawCircle` | Draws a circle (filled or outline) |
| 6 | `$canvasDrawRect` | Draws a rectangle |
| 7 | `$canvasDrawRoundedRect` | Draws a rectangle with rounded corners |
| 8 | `$canvasDrawLine` | Draws a line with configurable thickness |
| 9 | `$canvasDrawArc` | Draws an arc or pie slice |
| 10 | `$canvasProgressBar` | Draws a progress bar (horizontal or vertical) |
| 11 | `$canvasChartPie` | Draws a pie chart |
| 12 | `$canvasChartBar` | Draws a bar chart |
| 13 | `$canvasChartLine` | Draws a line chart |
| 14 | `$canvasContainer` | Defines a positioning frame for relative coordinates |
| 15 | `$attachImage` | Finalizes the canvas and attaches it to the message |

---

## 🎨 Colors, Blending & Image Sources

### Supported Color Formats

Every function that accepts a `color` parameter understands these formats:

| Format | Example | Description |
|:---|:---|:---|
| Hex (no prefix) | `FF5733` | RRGGBB |
| Hex (with `#`) | `#FF5733` | #RRGGBB |
| Hex with alpha | `FF573380` | RRGGBBAA (alpha = transparency) |
| Named color | `red`, `blue`, `gold` | 21 predefined names |

**Named colors available:** `red`, `green`, `blue`, `white`, `black`, `transparent`, `yellow`, `cyan`, `magenta`, `orange`, `purple`, `pink`, `gray`, `grey`, `lime`, `navy`, `teal`, `aqua`, `maroon`, `silver`, `gold`.

### Blend Modes

Several drawing functions (`$canvasDrawCircle`, `$canvasDrawRect`, `$canvasDrawRoundedRect`, `$canvasDrawLine`, `$canvasCompositeImage`) support the optional `blend` parameter. Blend modes change how a new shape or image interacts with what is already on the canvas:

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

1. **HTTP/HTTPS URLs** — fetched with a 15-second timeout, cached per block.
2. **Data URLs** — `data:image/png;base64,iVBORw0KG...`
3. **Raw base64 strings** — fallback when the string doesn't match a URL pattern.

---

## 🏁 Section 1: Canvas Lifecycle

### $canvasCreate — Creates a Blank Canvas

Every image starts here. `$canvasCreate` initializes a new canvas with the dimensions and background color you specify.

```bdfd
$canvasCreate[name;width;height;color?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `name` | ✅ | Identifier for this canvas (used later by `$attachImage`) |
| `width` | ✅ | Canvas width in pixels (max 4096) |
| `height` | ✅ | Canvas height in pixels (max 4096) |
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

Loads an external image onto the canvas. If a canvas already exists, the loaded image is composited on top at the specified position. If no canvas exists yet, the loaded image **becomes** the new canvas.

```bdfd
$canvasLoadImage[url;x?;y?;width?;height?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `url` | ✅ | Image URL (HTTP/HTTPS, data URL, or base64) |
| `x` | ❌ | Horizontal position on the canvas |
| `y` | ❌ | Vertical position on the canvas |
| `width` | ❌ | Resize width (pixels) |
| `height` | ❌ | Resize height (pixels) |
| `container` | ❌ | Name of a registered container for relative positioning |

**Example — Loading an avatar as the canvas base:**

```bdfd
$canvasLoadImage[$authorAvatar]
$attachImage[avatar]
```

> [!TIP]
> **Positioned vs. unpositioned loading.** When you provide `x` and `y` coordinates, the image is overlaid onto the existing canvas. When you omit them and no canvas exists yet, the loaded image itself becomes the canvas at its original dimensions.

**Example — Loading an avatar on top of a background:**

```bdfd
$canvasCreate[profile;800;400;#2C2F33]
$canvasLoadImage[$authorAvatar;50;50;128;128]
$attachImage[profile]
```

---

### $canvasContainer — Defines a Positioning Frame

Containers let you group drawing operations and position them relative to a frame. Once defined, any subsequent operation that references the container will have its coordinates **offset** by the container's `x` and `y` values.

```bdfd
$canvasContainer[name;x;y;width;height;color?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `name` | ✅ | Container identifier |
| `x` | ✅ | Top-left X position |
| `y` | ✅ | Top-left Y position |
| `width` | ✅ | Frame width |
| `height` | ✅ | Frame height |
| `color` | ❌ | Background color for the container area |

**Example — Drawing inside a centered box:**

```bdfd
$canvasCreate[layout;600;400;#1a1a2e]
$canvasContainer[header;50;20;500;80;#16213e]
$canvasDrawText[Welcome!;0;0;32;white;center;500;header]
$attachImage[layout]
```

Here, the text is positioned at `(0, 0)` relative to the container, which places it at absolute position `(50, 20)` on the canvas. The `center` alignment with `maxWidth=500` centers the text within the 500px-wide header container.

---

### $attachImage — Finalizes and Attaches

`$attachImage` signals the end of a canvas block, renders everything, and registers the image as a message attachment.

```bdfd
$attachImage[name]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `name` | ✅ | Filename for the attachment (without extension — becomes `name.png`) |

> [!NOTE]
> Once attached, the image is available at runtime via `$getVar[temp._canvasAttachment_name]` or can be used with `$image`.

```bdfd
$canvasCreate[result;400;300;white]
$canvasDrawText[Hello World!;20;130;24;black]
$attachImage[result]
```

---

## ✏️ Section 2: Drawing Shapes

### $canvasDrawRect — Draws a Rectangle

The simplest shape primitive. Draws a rectangle at the specified position.

```bdfd
$canvasDrawRect[x;y;width;height;color;fill;blend?;container?]
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

**Example — Outline-only rectangle with a blend mode:**

```bdfd
$canvasCreate[frame;400;300;white]
$canvasDrawRect[20;20;360;260;1E88E5;false]
$attachImage[frame]
```

---

### $canvasDrawCircle — Draws a Circle

Draws a circle with anti-aliased edges. Can be filled or just an outline.

```bdfd
$canvasDrawCircle[x;y;radius;color;fill;blend?;container?]
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

### $canvasDrawRoundedRect — Draws a Rounded Rectangle

Like `$canvasDrawRect` but with configurable corner radius. Uses anti-aliased smoothstep edges.

```bdfd
$canvasDrawRoundedRect[x;y;width;height;radius;color;fill;blend?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Top-left X |
| `y` | ✅ | Top-left Y |
| `width` | ✅ | Rectangle width |
| `height` | ✅ | Rectangle height |
| `radius` | ✅ | Corner radius in pixels |
| `color` | ✅ | Fill or outline color |
| `fill` | ✅ | `true` for filled, `false` for outline only |
| `blend` | ❌ | Blend mode |
| `container` | ❌ | Container name |

**Example — A card with rounded corners:**

```bdfd
$canvasCreate[card;400;200;#2C2F33]
$canvasDrawRoundedRect[20;20;360;160;16;#23272A;true]
$attachImage[card]
```

---

### $canvasDrawLine — Draws a Line

Draws a straight line between two points using the Bresenham algorithm with configurable thickness.

```bdfd
$canvasDrawLine[x1;y1;x2;y2;color;thickness;blend?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x1` | ✅ | Start X |
| `y1` | ✅ | Start Y |
| `x2` | ✅ | End X |
| `y2` | ✅ | End Y |
| `color` | ✅ | Line color |
| `thickness` | ✅ | Line width in pixels (1–100) |
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

### $canvasDrawArc — Draws an Arc or Pie Slice

Draws a circular arc. When `fill` is `false`, it draws an outlined arc. When `fill` is `true`, it draws a filled pie slice (from the center to the arc edges).

```bdfd
$canvasDrawArc[x;y;radius;startAngle;endAngle;color;fill?;thickness?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Center X |
| `y` | ✅ | Center Y |
| `radius` | ✅ | Arc radius |
| `startAngle` | ✅ | Start angle in degrees (0 = right, 90 = down, -90 = up) |
| `endAngle` | ✅ | End angle in degrees |
| `color` | ✅ | Arc color |
| `fill` | ❌ | `true` = pie slice, `false` = outlined arc (default: false) |
| `thickness` | ❌ | Outline thickness when `fill` is false (default: 1) |
| `container` | ❌ | Container name |

**Example — A filled pie slice (quarter circle):**

```bdfd
$canvasCreate[slice;300;300;white]
$canvasDrawArc[150;150;100;-90;0;E53935;true]
$attachImage[slice]
```

This draws a filled wedge from the top (-90°) to the right (0°).

**Example — An outlined arc (semi-circle):**

```bdfd
$canvasCreate[semi;300;300;white]
$canvasDrawArc[150;150;100;0;180;1E88E5;false;4]
$attachImage[semi]
```

---

## 🔤 Section 3: Drawing Text

### $canvasDrawText — Draws Text on the Canvas

Writes text at a specific position. The font is automatically selected from `arial14`, `arial24`, or `arial48` based on the font size you provide.

```bdfd
$canvasDrawText[text;x;y;fontSize;color;textAlign?;maxWidth?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `text` | ✅ | The text string to draw |
| `x` | ✅ | Horizontal position |
| `y` | ✅ | Vertical position |
| `fontSize` | ✅ | Font size in pixels (auto-selects appropriate Arial variant) |
| `color` | ✅ | Text color |
| `textAlign` | ❌ | `left`, `center`, or `right` (requires `maxWidth`) |
| `maxWidth` | ❌ | Constrains text width for alignment and wrapping |
| `container` | ❌ | Container name |

> [!NOTE]
> **Text alignment** only works when `maxWidth` is provided. Without it, `textAlign` is ignored. The alignment positions the text within the horizontal space defined by `maxWidth`, anchored at the given `x` coordinate.

**Example — Simple centered title:**

```bdfd
$canvasCreate[title;600;200;#2C2F33]
$canvasDrawText[Welcome to the Server!;300;80;36;white;center;600]
$attachImage[title]
```

**Example — Left and right aligned text:**

```bdfd
$canvasCreate[score;500;150;#1a1a2e]
$canvasDrawText[Player: $username;20;30;20;cyan;left;460]
$canvasDrawText[Score: $userScore;20;70;20;gold;left;460]
$attachImage[score]
```

---

## 📊 Section 4: Progress Bars

### $canvasProgressBar — Draws a Progress Bar

Renders a horizontal or vertical progress bar with customizable colors, border, and value.

```bdfd
$canvasProgressBar[x;y;width;height;value;fillColor;bgColor?;borderColor?;borderWidth?;direction?;borderRadius?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Top-left X |
| `y` | ✅ | Top-left Y |
| `width` | ✅ | Bar width |
| `height` | ✅ | Bar height |
| `value` | ✅ | Percentage 0–100 (supports variables like `$getUserVar[xp]`) |
| `fillColor` | ✅ | Color of the filled portion |
| `bgColor` | ❌ | Background color (default: transparent) |
| `borderColor` | ❌ | Border color |
| `borderWidth` | ❌ | Border thickness in px (default: 0) |
| `direction` | ❌ | `horizontal` (default) or `vertical` |
| `borderRadius` | ❌ | **Not yet implemented** — accepted but ignored at runtime |
| `container` | ❌ | Container name |

**Example — Horizontal XP bar:**

```bdfd
$canvasCreate[level;500;200;#2C2F33]
$canvasProgressBar[50;80;400;30;$getUserVar[xp];43A047;#555555;#FFFFFF;2;horizontal]
$canvasDrawText[XP: $getUserVar[xp]%;250;50;18;white;center;500]
$attachImage[level]
```

**Example — Vertical health bar:**

```bdfd
$canvasCreate[health;200;300;#1a1a2e]
$canvasProgressBar[80;30;30;200;$getUserVar[hp];E53935;#333333;#FFFFFF;2;vertical]
$canvasDrawText[HP;95;250;14;white;center;200]
$attachImage[health]
```

---

## 🖼️ Section 5: Image Compositing

### $canvasCompositeImage — Overlay with Shape Masks & Blend Modes

The most powerful image function. It loads an image, resizes it, applies an optional **shape mask** (circle, rounded rectangle, triangle), and blends it onto the canvas using an optional **blend mode**.

```bdfd
$canvasCompositeImage[url;x;y;width;height;shape?;blend?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `url` | ✅ | Image source (URL, data URL, or base64) |
| `x` | ✅ | Horizontal position |
| `y` | ✅ | Vertical position |
| `width` | ✅ | Resize width |
| `height` | ✅ | Resize height |
| `shape` | ❌ | Shape mask: `circle`, `round`, `oval`, `ellipse`, `triangle`, `rounded:15`, `roundrect:15` |
| `blend` | ❌ | Blend mode |
| `container` | ❌ | Container name |

**Shape mask options:**

| Shape Value | Effect |
|:---|:---|
| `circle` / `round` / `oval` / `ellipse` | Circular/elliptical crop with anti-aliased edges |
| `triangle` | Triangular crop |
| `rounded:15` / `roundrect:15` | Rounded rectangle crop with a 15px radius |

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
$canvasCompositeImage[https://example.com/photo.jpg;25;25;450;350;rounded:20]
$attachImage[card]
```

**Example — Overlaying with screen blend for a glow effect:**

```bdfd
$canvasLoadImage[https://example.com/background.jpg]
$canvasCompositeImage[https://example.com/light-overlay.png;0;0;800;600;;screen]
$attachImage[glow]
```

---

## 📈 Section 6: Charts

### $canvasChartPie — Draws a Pie Chart

Renders a pie chart from semicolon-separated values. Each slice gets a color from the provided palette (with an automatic 12-color fallback if you don't specify enough colors).

```bdfd
$canvasChartPie[x;y;radius;data;colors;labels?;startAngle?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Center X |
| `y` | ✅ | Center Y |
| `radius` | ✅ | Chart radius |
| `data` | ✅ | Semicolon-separated values (e.g. `30;50;20`) |
| `colors` | ✅ | Semicolon-separated hex colors (e.g. `E53935;1E88E5;43A047`) |
| `labels` | ❌ | Semicolon-separated labels (accepted but **not rendered** by the runtime) |
| `startAngle` | ❌ | Starting angle in degrees (default: -90 = top) |
| `container` | ❌ | Container name |

> [!NOTE]
> **Labels are not rendered.** The `labels` parameter is accepted by the parser but the current runtime does **not** draw label text on the chart. Use `$canvasDrawText` to manually add a legend below your chart.

**Example — A three-segment pie chart:**

```bdfd
$canvasCreate[pieChart;400;400;white]
$canvasChartPie[200;180;120;40;35;25;E53935;1E88E5;43A047]
$canvasDrawText[Red: 40%  Blue: 35%  Green: 25%;200;340;14;#333333;center;400]
$attachImage[pieChart]
```

**Example — Custom start angle:**

```bdfd
$canvasCreate[donut;400;400;white]
$canvasChartPie[200;200;120;25;25;25;25;FF6B6B;4ECDC4;FFE66D;A8E6CF;;45]
$attachImage[donut]
```

---

### $canvasChartBar — Draws a Bar Chart

Renders a vertical bar chart with customizable spacing and optional max value override.

```bdfd
$canvasChartBar[x;y;width;height;data;colors;labels?;maxValue?;barSpacing?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Top-left X of the chart area |
| `y` | ✅ | Top-left Y of the chart area |
| `width` | ✅ | Chart width |
| `height` | ✅ | Chart height |
| `data` | ✅ | Semicolon-separated bar values |
| `colors` | ✅ | Semicolon-separated hex colors per bar |
| `labels` | ❌ | Semicolon-separated labels (accepted but **not rendered**) |
| `maxValue` | ❌ | Overrides the auto-calculated maximum Y value |
| `barSpacing` | ❌ | Gap between bars in pixels (default: 4) |
| `container` | ❌ | Container name |

**Example — Monthly stats bar chart:**

```bdfd
$canvasCreate[barChart;500;400;white]
$canvasChartBar[40;30;420;300;120;85;200;60;150;E53935;1E88E5;43A047;FB8C00;8E24AA;;;8]
$canvasDrawText[Monthly Activity;250;360;16;#333333;center;500]
$attachImage[barChart]
```

**Example — With a manual max value (to ensure consistent scale across multiple charts):**

```bdfd
$canvasCreate[comparison;500;400;white]
$canvasChartBar[40;30;420;300;$getUserVar[score];$getUserVar[highscore];1E88E5;E53935;;500;10]
$canvasDrawText[You vs Top Score;250;370;14;#333333;center;500]
$attachImage[comparison]
```

---

### $canvasChartLine — Draws a Line Chart

Renders a line chart with optional area fill, data point markers, and configurable line thickness.

```bdfd
$canvasChartLine[x;y;width;height;data;color;lineWidth?;fill?;showPoints?;pointRadius?;container?]
```

| Parameter | Required | Description |
|:---|:---|:---|
| `x` | ✅ | Top-left X of the chart area |
| `y` | ✅ | Top-left Y of the chart area |
| `width` | ✅ | Chart width |
| `height` | ✅ | Chart height |
| `data` | ✅ | Semicolon-separated Y values |
| `color` | ✅ | Line color |
| `lineWidth` | ❌ | Line thickness (default: 2) |
| `fill` | ❌ | `true` to fill the area under the line with a semi-transparent version of the line color (default: false) |
| `showPoints` | ❌ | `true` to draw data point dots (default: true) |
| `pointRadius` | ❌ | Radius of data point dots (default: 3) |
| `container` | ❌ | Container name |

**Example — A filled line chart showing growth:**

```bdfd
$canvasCreate[growth;600;400;white]
$canvasChartLine[40;30;520;300;10;25;45;70;55;90;115;43A047;3;true;true;4]
$canvasDrawText[Weekly Growth;300;370;16;#333333;center;600]
$attachImage[growth]
```

**Example — Thin line chart without markers (clean trend line):**

```bdfd
$canvasCreate[trend;500;350;white]
$canvasChartLine[40;30;420;280;100;95;88;72;65;50;42;E53935;2;false;false]
$canvasDrawText[Error Rate Over Time;250;330;14;#333333;center;500]
$attachImage[trend]
```

---

## 🧩 Section 7: Putting It All Together

### Complete Example — A User Profile Card

Here is a real-world example that combines canvas creation, image compositing, shapes, text, and a progress bar into a single profile card:

```bdfd
$canvasCreate[profile;700;300;#2C2F33]

$canvasDrawRoundedRect[15;15;670;270;16;#23272A;true]

$canvasCompositeImage[$authorAvatar;30;30;100;100;circle]

$canvasDrawText[$username;150;45;28;white]
$canvasDrawText[#$userDiscriminator;150;78;16;#AAAAAA]

$canvasContainer[stats;150;110;500;80]
$canvasDrawText[Level $getUserVar[level];0;0;20;gold;left;500;stats]
$canvasProgressBar[0;30;500;20;$getUserVar[xp];43A047;#555555;#FFFFFF;1;horizontal;;stats]
$canvasDrawText[$getUserVar[xp] / $getUserVar[xpMax] XP;0;58;12;#AAAAAA;left;500;stats]

$canvasDrawText[Messages: $getUserVar[messages];30;220;14;#CCCCCC]
$canvasDrawText[Joined: $memberJoinDate;30;250;14;#CCCCCC]

$attachImage[profile]
```

### Complete Example — A Dashboard with Pie and Bar Charts

```bdfd
$canvasCreate[dashboard;900;450;#1a1a2e]
$canvasDrawText[Server Analytics;450;30;28;white;center;900]

$canvasContainer[leftPanel;20;60;420;370]
$canvasChartPie[210;180;100;45;30;25;E53935;1E88E5;43A047;;-90;leftPanel]
$canvasDrawText[Activity Breakdown;210;310;14;#CCCCCC;center;420;leftPanel]

$canvasContainer[rightPanel;460;60;420;370]
$canvasChartBar[20;30;380;300;120;85;200;60;150;E53935;1E88E5;43A047;FB8C00;8E24AA;;;5;rightPanel]
$canvasDrawText[Monthly Members;210;350;14;#CCCCCC;center;420;rightPanel]

$attachImage[dashboard]
```

---

## ⚠️ Important Rules & Safety Tips

> [!WARNING]
> **Canvas dimensions limit.** The maximum allowed size is **4096 × 4096 pixels**. Exceeding this will cause the canvas creation to fail. If you need very large images, consider scaling down.

> [!WARNING]
> **URL timeout.** Images loaded from external URLs have a **15-second timeout**. If the remote server is slow to respond, the load will fail. Host your assets on fast, reliable servers or CDNs.

> [!TIP]
> **Use containers for layout.** Instead of hardcoding absolute positions for every element, define containers for logical sections (header, body, footer, sidebar). This makes your code easier to read and modify.

> [!TIP]
> **Layer order matters.** Operations are drawn in the order they appear in your code. The first operation is at the bottom (background), and the last operation is on top (foreground). Think of it like painting: you paint the background first, then add details on top.

> [!NOTE]
> **Auto-flush behavior.** If you call any non-canvas function (like `$sendMessage`, `$getUserVar`, or even a text string outside of `$canvasDrawText`) between canvas operations, the current canvas block will be **automatically rendered**. Place all your canvas operations together, and keep non-canvas logic before or after the canvas block.

> [!NOTE]
> **Font availability.** Text rendering uses Arial at three fixed sizes (14, 24, 48). For custom font sizes, the system automatically picks the closest available variant. If you need precise typography, test with your target size to ensure the output looks as expected.

---

## 📚 Summary

BDFD's canvas system gives you a complete 2D rendering engine inside your bot commands. Here is a quick recap of what you can do:

| Capability | Functions |
|:---|:---|
| **Create & load canvases** | `$canvasCreate`, `$canvasLoadImage`, `$canvasContainer`, `$attachImage` |
| **Draw shapes** | `$canvasDrawRect`, `$canvasDrawCircle`, `$canvasDrawRoundedRect`, `$canvasDrawLine`, `$canvasDrawArc` |
| **Draw text** | `$canvasDrawText` |
| **Progress bars** | `$canvasProgressBar` |
| **Image compositing** | `$canvasCompositeImage` |
| **Charts** | `$canvasChartPie`, `$canvasChartBar`, `$canvasChartLine` |
| **Effects** | 8 blend modes (`multiply`, `screen`, `overlay`, `darken`, `lighten`, `difference`, `hardLight`, `softLight`) |

With these 15 functions, you can build welcome cards, level-up banners, leaderboard graphics, server dashboards, progress trackers, and virtually any dynamic image your Discord community needs — all without leaving BDFD's scripting environment.
