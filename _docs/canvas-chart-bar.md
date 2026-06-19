---
layout: doc
title: $canvasChartBar[]
translation_key: docs
category: Image & Canvas
function_name: canvasChartBar
syntax: $canvasChartBar[x;y;width;height;data;colors;labels?;maxValue?;barSpacing?;container?]
description: Draws a bar chart with automatic scaling and configurable bar spacing
---
Bar width is calculated automatically by dividing the chart area width by the number of data values, minus barSpacing. Without a maxValue override, the tallest bar is scaled to fill the full chart height. Labels are parsed but not rendered — use separate $canvasDrawText calls below each bar if you need labels. Use $canvasChartLine for datasets better suited to trends over discrete categories.
