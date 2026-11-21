---
layout: doc
title: bc.files
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Files of the bot in JavaScript - write, read, list, delete, attach to a message and share a temporary link, in the storage of the account.
permalink: /docs/javascript/files/
---

A JavaScript bot keeps files (a generated image, a CSV export, a backup) in the storage of its owner. The quota is the one of the account (plan and storage packs). Files belong to one bot: a path is only visible to the bot that wrote it. A file is at most 25 MB. The same files are reachable in BDFD with `$fileUpload`, `$fileRead`, `$fileList`, `$fileDelete`, `$fileExists`, `$fileURL` and `$fileAttach`.

| JavaScript | BDFD |
| --- | --- |
| `await bc.files.put(path, data, { contentType?, encoding? })` | `$fileUpload`: writes or replaces. `data` is text or bytes; `encoding: 'base64'` decodes a base64 text. |
| `await bc.files.get(path)` and `await bc.files.getText(path, { encoding? })` | `$fileRead`: the bytes, or the text. |
| `await bc.files.list(prefix?, { limit?, after? })` | `$fileList`: `[{ path, size, contentType, updatedAt }]`. |
| `await bc.files.delete(path)` | `$fileDelete`: `true` when the file existed. |
| `await bc.files.exists(path)` | `$fileExists` |
| `await bc.files.attach(path, name?)` | `$fileAttach`: an attachment to put in `files: [...]` of a message, like `bc.canvas.attach`. At most 10 MB (`file_too_large` above). `name` defaults to the end of the path. |
| `await bc.files.url(path, { minutes? })` | `$fileURL`: a temporary read link (1 hour by default, 7 days at most). Images, audio, video, plain text and PDF open in the browser, the rest downloads. |

A path is made of segments separated by `/` (255 bytes at most), with no `..`, no empty segment and no leading or trailing `/`.

A failing operation rejects with an error whose `code` is `file_not_found`, `file_too_large`, `file_quota_exceeded`, `file_invalid_path` or `files_unavailable` (self-hosted runner without a Manager). `bc.files.lastError()` returns the last code.

```js
const csv = 'name,score\n' + rows.map(r => `${r.name},${r.score}`).join('\n');
await bc.files.put('exports/week-12.csv', csv, { contentType: 'text/csv' });
await interaction.reply({
  content: 'Here is the export',
  files: [await bc.files.attach('exports/week-12.csv', 'ranking.csv')],
});
```
