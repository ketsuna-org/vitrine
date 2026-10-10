---
layout: doc
title: $canvasDrawText[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawText
syntax: $canvasDrawText[text;x;y;fontSize;color;(textAlign);(maxWidth);(container)]
description: Draws text on the current canvas at a position, with a font size, color and optional alignment inside a maximum width.
---
$canvasDrawText draws a line of text on the current canvas. It returns an empty string.

Canvas functions work on the **current canvas**, the last one made with `$canvasCreate`; they have no canvas-name argument. Called before any `$canvasCreate` they have no effect. Numeric arguments must be whole numbers; text that is not a whole number gives the default of that parameter.

## Parameters

| Parameter | Description |
|---|---|
| `text` | Required. The text. An empty text draws nothing. |
| `x`, `y` | Required. Position of the top-left corner of the text. |
| `fontSize` | Required. Selects one of **three** built-in bitmap sizes: below 20 gives a small font, 20 to 39 a medium font, 40 and above a large font. Other values within a bucket give the same result. |
| `color` | Required. Colors are a 6-digit hexadecimal value with or without `#` (`#5865F2`), an 8-digit `RRGGBBAA` value, or one of these names (case-insensitive): red, green, blue, white, black, transparent, yellow, cyan, magenta, orange, purple, pink, gray, grey, lime, navy, teal, aqua, maroon, silver, gold. An empty or unreadable color becomes white. The 3-digit shorthand `#abc` is **not** supported (it is read as `000ABC`). |
| `textAlign` | Optional. `center` or `right` (left otherwise). It only has an effect when `maxWidth` is greater than 0. |
| `maxWidth` | Optional. Width of the box in which the text is aligned, starting at `x`. It does not wrap or cut the text. |
| `container` | Optional. Name of a container defined earlier with `$canvasContainer`: the x/y position is then offset by the container's x/y. An unknown name means no offset. |

## Behavior

- Only the characters of the built-in fonts are drawn: letters outside basic ASCII (such as `é`, `ü`, `ç`), `€` and emoji are not drawn in tests.
- A line break in the text starts a new line.
- The text is cut off at the edges of the canvas; nothing is wrapped.
- Sequences written `((name))` are removed from the text (no variables are available there).

## Examples

### Draw Styled Text on Canvas

```bdfd
$canvasCreate[textCanvas;500;120;#202225]
$canvasDrawText[Hello $username!;30;65;26;#5865F2]
$attachImage[textCanvas]
$sendMessage[Rendered dynamic user text on canvas.]
```

### Center a title in a 400 px box

```bdfd
$canvasCreate[title;500;100;#202225]
$canvasDrawText[Server Rules;50;40;24;#FFFFFF;center;400]
$attachImage[title]
$sendMessage[Centered title.]
```
