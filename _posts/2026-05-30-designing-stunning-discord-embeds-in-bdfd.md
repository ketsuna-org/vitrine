---
title: "Designing Stunning Discord Embeds in BDFD"
description: Master the art of building structured, premium, and visually stunning Discord embeds using native BDFD styling actions.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-embeds-guide
locale: en
content_language: en
layout: post
category: Embeds
toc: true
function_syntax: $title[text]
---

Standard text messages are fine for basic conversation, but they lack structure. If you want your Discord bot to look premium, professional, and readable, you must master **Embeds**. Embeds are specially formatted cards that support custom colors, images, titles, fields, footers, and metadata.

In this guide, we will explore the complete BDFD/Bot Creator embed styling toolset and learn how to build gorgeous, highly optimized layouts for your commands.

---

## 🎨 Anatomy of a Discord Embed

A standard Discord embed consists of several distinct blocks. BDFD maps each block to a dedicated, intuitive function:

```mermaid
graph TD
    A[Embed Structure] --> B[$author[name;iconURL;url]]
    A --> C[$title[text]]
    A --> D[$description[long_markdown_text]]
    A --> E[$addField[name;value;inline_true_or_false]]
    A --> F[$thumbnail[imageURL]]
    A --> G[$image[largeImageURL]]
    A --> H[$footer[text;iconURL]]
    A --> I[$color[hex_color_code]]
    A --> J[$addTimestamp]
```

---

## 1. Setting the Foundation (Title, Description, and Color)

Every great embed starts with a clean title and description. You can also specify an accent color to give your command a consistent theme:

* **`$title[text]`**: Sets the bold header of your embed. Keep it short.
* **`$description[text]`**: The main body of your embed. Supports standard Discord Markdown (bold, lists, codeblocks, custom emojis).
* **`$color[hex_code]`**: Specifies the vertical accent bar color on the left. Must be a valid hexadecimal code (e.g. `#3b82f6` or `3b82f6`).

### Code Example: Core Embed
```bdfd
$nomention
$title[📖 Server Rules]
$color[#f59e0b]
$description[
Welcome to our community! Please follow these guidelines:

1. **Be Respectful**: Treat everyone with kindness.
2. **No Spamming**: Keep channels clean and readable.
3. **Use Common Sense**: Have fun and stay safe!
]
```

---

## 2. Using Fields for Structured Data (`$addField`)

Fields are perfect for displaying key-value data (like catalog lists, user stats, or system diagnostics). By setting the third parameter to `true`, fields will align horizontally **in-line**:

```bdfd
$addField[name;value;inline]
```
* **`name`**: The bold header of the field column.
* **`value`**: The text content within the column.
* **`inline`**: Set to `true` to align fields side-by-side (up to 3 per row on desktop). Set to `false` to display the field on its own new line.

### Code Example: In-line Fields
```bdfd
$nomention
$title[📊 Server Diagnostics]
$color[#10b981]

$addField[CPU Usage;🟢 `12%` / Standard Load;true]
$addField[RAM Usage;🟡 `64%` / Stable;true]
$addField[Uptime;⚡ `3d 12h 4m`;true]
```

---

## 3. Adding Imagery (`$thumbnail` and `$image`)

Images bring your commands to life. You can add two types of images to any embed:

* **`$thumbnail[url]`**: Places a small image in the top-right corner. Perfect for displaying avatars, guild icons, or system status badges.
* **`$image[url]`**: Renders a large, full-width image at the bottom of the embed card. Best used for displaying banners, graphs, or welcome cards.

> [!TIP]
> Always verify that your image URLs end in a valid image extension (such as `.png`, `.jpg`, `.jpeg`, or `.gif`) for Discord to render them reliably.

---

## 4. Footers, Authors, and Timestamps

Adding metadata blocks gives your cards a complete, professional feel:

* **`$author[name;iconURL;url]`**: Places a small profile block above the title. Excellent for attributing commands to specific users or your bot.
* **`$footer[text;iconURL]`**: Renders small gray text at the bottom.
* **`$addTimestamp`**: Automatically appends the current date and time to the footer, showing when the embed was generated.

---

## 🏆 The Ultimate Showcase: Server Info Command

Below is a complete, production-ready `!serverinfo` command that integrates every single layout feature we've discussed:

```bdfd
$nomention
$title[🏰 Server Information: $serverName]
$color[#6366f1]
$thumbnail[$serverIcon]

$author[System Analytics;$userAvatar[$botID]]

$description[
Detailed metrics and statistical overview for **$serverName**.
]

$addField[👑 Server Owner;<@$serverOwner>;true]
$addField[🗺️ Server Region;`$serverRegion`;true]
$addField[👥 Total Members;`$membersCount` members;true]

$addField[💬 Channels;📝 `$channelCount[text]` Text / 🔊 `$channelCount[voice]` Voice;true]
$addField[🎭 Total Roles;`$roleCount` custom roles;true]
$addField[⚡ Boost Tier;Tier `$boostLevel` (`$boostCount` boosts);true]

$image[$serverSplash]

$footer[Requested by $username; $authorAvatar]
$addTimestamp
```
