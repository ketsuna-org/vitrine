---
layout: doc
title: $canvasDrawText[]
translation_key: docs
category: Image & Canvas
function_name: canvasDrawText
syntax: $canvasDrawText[text;x;y;fontSize;color;textAlign?;maxWidth?;container?]
description: Draws text on the canvas at the specified position with configurable font size, color, and alignment
---
Text outside the canvas boundaries is clipped and will not appear in the output. The font is selected automatically based on font size: arial14 for sizes under 20px, arial24 for 20–39px, and arial48 for 40px and above. Multi-line text is not supported — each call draws a single line. Use template variable syntax `((varName))` to embed dynamic values in the text string.

## Examples

### Draw Styled Text on Canvas

```bdfd
$canvasCreate[textCanvas;500;120;#202225]
$canvasDrawText[textCanvas;Hello $username!;30;65;26;#5865F2]
$attachImage[textCanvas]
$sendMessage[Rendered dynamic user text on canvas.]
```
