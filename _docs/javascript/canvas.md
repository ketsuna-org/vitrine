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

## bc.canvas helpers

Three helpers shorten the common steps, with the same limits as the BDFD functions (a canvas is 1 to 4096 pixels per side):

| JavaScript | BDFD equivalent |
|------------|-----------------|
| `bc.canvas.create(width, height, background?)` | `$canvasCreate` (returns a canvas, background is a CSS name or hex) |
| `bc.canvas.drawTiles(ctx, tiles)` | `$canvasTileGrid` (draws the result of `bc.grid.tiles`) |
| `bc.canvas.attach(canvas, name?)` | `$attachImage` (returns a PNG attachment for `files`) |

The drawing itself is the full `canvas` 2D API, so the image is not pixel-identical to the BDFD one (fonts and edges are smoother), but anything BDFD draws can be drawn.

### Mini-map from a tile grid

```javascript
const colors = ['green', 'green', 'blue', 'gray', '', 'green'];
const tiles = bc.grid.tiles({ x: 10, y: 10, columns: 3, rows: 2, size: 40, gap: 2, colors });
const canvas = bc.canvas.create(140, 100, '#1e1f22');
bc.canvas.drawTiles(canvas.getContext('2d'), tiles);
await interaction.reply({ files: [bc.canvas.attach(canvas, 'map')] });
```

### Progress bar

```javascript
const canvas = bc.canvas.create(300, 40, '#1e1f22');
const ctx = canvas.getContext('2d');
const percent = 65;
ctx.fillStyle = '#4f545c';
ctx.fillRect(10, 10, 280, 20);
ctx.fillStyle = '#57f287';
ctx.fillRect(10, 10, Math.round(280 * percent / 100), 20);
ctx.fillStyle = '#ffffff';
ctx.font = '14px sans-serif';
ctx.fillText(`${percent}%`, 135, 25);
await interaction.reply({ files: [bc.canvas.attach(canvas, 'progress')] });
```

### Round avatar

```javascript
const { loadImage } = require('canvas');
const canvas = bc.canvas.create(256, 256);
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.arc(128, 128, 128, 0, Math.PI * 2);
ctx.clip();
ctx.drawImage(await loadImage(interaction.user.displayAvatarURL({ extension: 'png', size: 256 })), 0, 0, 256, 256);
await interaction.reply({ files: [bc.canvas.attach(canvas, 'avatar')] });
```

## BDFD equivalent

BDScript uses deferred canvas blocks (`$canvasCreate`, drawing ops, `$attachImage`). See the [Canvas functions guide](/advanced-topics/2026/06/11/image-creation-canvas-functions-in-bdfd/) and [Image & Canvas](/docs/#image-canvas) function reference.

## Restrictions

- Local filesystem paths are blocked for images and fonts.
- WebP images are normalized to PNG internally.
