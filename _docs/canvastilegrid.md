---
layout: doc
title: $canvasTileGrid
translation_key: docs
category: "Image & Canvas"
function_name: canvasTileGrid
syntax: $canvasTileGrid[x;y;columns;rows;tileSize;colors;(gap);(separator)]
description: "Fills a grid of square tiles in one call, for a mini-map."
---

# $canvasTileGrid

Fills a grid of square tiles in one call, for a mini-map or a board.

## Syntax

```
$canvasTileGrid[x;y;columns;rows;tileSize;colors;(gap);(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `x` | Left of the grid. |
| `y` | Top of the grid. |
| `columns` | Number of columns. |
| `rows` | Number of rows (at most 1024 tiles in all). |
| `tileSize` | Side of a tile in pixels. |
| `colors` | One color per tile, row by row, separated by `,`. An empty entry leaves the tile unpainted. |
| `gap` | Optional. Pixels between tiles (default 0). |
| `separator` | Optional. Separator of `colors` (default `,`). |

## Return Value

- string.

## Usage

```
$canvasCreate[map;140;140;black]$canvasTileGrid[10;10;2;2;50;red,green,blue,;5]
```

## Example

```bdfd
$canvasCreate[map;140;140;black]
$canvasTileGrid[10;10;2;2;50;red,green,blue,yellow;5]
$attachImage[map]
```

## Notes

JavaScript: `bc.grid.tiles({x, y, columns, rows, size, gap, colors})` returns the rectangles to draw.
