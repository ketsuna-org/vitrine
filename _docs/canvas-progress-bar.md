---
layout: doc
title: $canvasProgressBar[]
translation_key: docs
category: Image & Canvas
function_name: canvasProgressBar
syntax: $canvasProgressBar[x;y;width;height;percentage;barColor;trackColor;(textColor);(borderWidth);(orientation);(fontSize);(container);(borderRadius)]
description: Draws a progress bar (horizontal or vertical) with a track, a fill, a centered percentage label and an optional border
---
## Syntax

```
$canvasProgressBar[x;y;width;height;percentage;barColor;trackColor;(textColor);(borderWidth);(orientation);(fontSize);(container);(borderRadius)]
```

## Parameters

The first 7 parameters are required; the 6 following ones are optional (13 at most).

| Parameter | Description |
|---|---|
| `x`, `y` | Position of the bar. |
| `width`, `height` | Size of the bar (defaults to 100 and 20 if the value is not a number). |
| `percentage` | Fill percentage, an integer between 0 and 100 (clamped to this range; 0 if not a number). |
| `barColor` | Color of the filled part (and of the border). |
| `trackColor` | Color of the full bar area behind the fill. Required. |
| `textColor` | Optional. Color of the percentage label. White when empty. |
| `borderWidth` | Optional. Border thickness (0 to 50, default 0). The border is drawn in `barColor`; there is no separate border color. |
| `orientation` | Optional. `vertical` for a vertical bar; any other value gives a horizontal bar. |
| `fontSize` | Optional. Font size of the percentage label (default 14). |
| `container` | Optional. Name of the container to draw into. |
| `borderRadius` | Optional. Corner radius (0 to 500, default 0). Rounded corners are rendered. |

A label showing the percentage (e.g. `75%`) is drawn at the center of the bar. Horizontal bars fill left-to-right; vertical bars fill bottom-to-top.

## Examples

### Render Level XP Progress Bar

```bdfd
$canvasCreate[levelCard;600;140;#181818]
$canvasDrawText[levelCard;Level 15 — 75% XP;30;45;20;#FFFFFF]
$canvasProgressBar[30;70;540;26;75;#5865F2;#2F3136;#FFFFFF;3;horizontal;14;levelCard;10]
$attachImage[levelCard]
$sendMessage[Rendered dynamic XP progress bar.]
```
