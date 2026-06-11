---
layout: doc
title: $canvasDrawText
translation_key: docs
category: Image & Canvas
function_name: canvasDrawText
syntax: $canvasDrawText[text;x;y;fontSize;color;textAlign?;maxWidth?;container?]
description: Draws text on the canvas at the specified position with configurable font size, color, and alignment
parameters:
  - name: text
    type: string
    required: true
    description: The text string to render. Supports template variables via ((varName)).
  - name: x
    type: integer
    required: true
    description: Horizontal position
  - name: y
    type: integer
    required: true
    description: Vertical position (baseline)
  - name: fontSize
    type: integer
    required: true
    description: Font size in pixels. Auto-selects from arial14 (<20px), arial24 (20–39px), or arial48 (≥40px).
  - name: color
    type: color
    required: true
    description: Text color (hex or named)
  - name: textAlign
    type: string
    required: false
    description: Horizontal text alignment (requires maxWidth)
    enum: "left, center, right"
  - name: maxWidth
    type: integer
    required: false
    description: Constrains the text area width for alignment. Text outside this width is not clipped.
  - name: container
    type: string
    required: false
    description: Container name for relative positioning
returns:
  type: canvas
  description: Modifies the canvas in-place by drawing the text at the specified position.
related:
  - canvasCreate
  - canvasDrawRect
  - canvasContainer
examples:
  - title: Basic text
    code: |
      $canvasCreate[label;300;100;white]
      $canvasDrawText[Hello World!;20;60;32;black]
      $attachImage[label]
  - title: Centered title
    code: |
      $canvasCreate[header;600;80;#1a1a2e]
      $canvasDrawText[Monthly Report;0;50;28;white;center;600]
      $attachImage[header]
  - title: Right-aligned value
    code: |
      $canvasDrawText[$getUserVar[score];0;40;20;gold;right;200]
---
Text outside the canvas boundaries is clipped and will not appear in the output. The font is selected automatically based on font size: arial14 for sizes under 20px, arial24 for 20–39px, and arial48 for 40px and above. Multi-line text is not supported — each call draws a single line. Use template variable syntax `((varName))` to embed dynamic values in the text string.
