---
layout: doc
title: canvas
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Image generation with require('canvas') in BDJS sandbox scripts.
permalink: /docs/javascript/canvas/
---

Generate images in JavaScript with `require('canvas')`. Remote `http(s)` and `data:` URLs are supported; local file paths are blocked.

## Module exports

| Export | Description |
|--------|-------------|
| `createCanvas(width, height, type?)` | Create a drawing surface |
| `loadImage(url)` | Load image from URL or buffer |
| `registerFont(url, { family })` | Register a remote font |
| `createImageData(array, w, h?)` | Raw pixel buffer |

PNG filter constants: `PNG_NO_FILTERS`, `PNG_ALL_FILTERS`, `PNG_FILTER_NONE`, etc.

## Canvas methods

`getContext('2d')`, `toBuffer()`, `toDataURL()`, `createPNGStream()`, `createJPEGStream()`

## Context2D drawing

Common methods: `fillRect`, `strokeRect`, `fillText`, `strokeText`, `drawImage`, `arc`, `fill`, `stroke`, `beginPath`, `closePath`, `moveTo`, `lineTo`, `save`, `restore`, `translate`, `rotate`, `scale`

## Example

```javascript
const { createCanvas } = require('canvas');

const canvas = createCanvas(400, 200);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#5865f2';
ctx.fillRect(0, 0, 400, 200);
ctx.fillStyle = '#ffffff';
ctx.font = '32px sans-serif';
ctx.fillText('Hello!', 20, 100);

const buffer = canvas.toBuffer('image/png');
const { AttachmentBuilder } = require('discord.js');
const file = new AttachmentBuilder(buffer, { name: 'banner.png' });

await interaction.reply({ files: [file] });
```

## BDFD equivalent

BDScript uses deferred canvas blocks (`$canvasCreate`, drawing ops, `$attachImage`). See the [Canvas functions guide](/advanced-topics/2026/06/11/image-creation-canvas-functions-in-bdfd/) and [Image & Canvas](/docs/#image-canvas) function reference.

## Restrictions

- Local filesystem paths are blocked for images and fonts.
- WebP images are normalized to PNG internally.
