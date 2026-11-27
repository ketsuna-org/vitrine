---
layout: doc
title: bc.recorder
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Voice recording in JavaScript - record the voice of people who agreed, per person, with a visible announcement, a monthly quota and no hidden mode.
permalink: /docs/javascript/recorder/
published: false
---

`bc.recorder` records the voice of the people of a voice channel, one Ogg/Opus track per person. It is built so that nobody is recorded without having agreed: **a script cannot consent for anyone**.

- **Premium only.** Each account has **20 hours of recording per month** (resets on the 1st, UTC) and at most 2 recordings at the same time. One recording lasts 300 s by default and 600 s at most, with at most 5 people.
- **Consent first.** A person agrees once per server by pressing the button of the message posted by `consentPrompt`. The agreement lasts 6 months, or until the person withdraws, or until the reference text changes. People who did not agree are never listened to, even when they are in the channel.
- **Announcement.** Every recording is announced in a text channel, with the list of the people recorded and a "Withdraw my consent" button that stops the recording of that person at once. It cannot be turned off.
- Leaving the channel stops the recording of that person. The bot needs the **Guild Voice States** intent and the permission to join the channel. A bot can only be in one voice channel per server: recording and music exclude each other.

| JavaScript | What it does |
| --- | --- |
| `await bc.recorder.consentPrompt(channelId, { locale?, texts? })` | Posts the consent message (English, plus a full translation if you give `locale` and every block in `texts`). |
| `await bc.recorder.hasConsent(userId)` | `true` when the person has a valid agreement. Read only. |
| `await bc.recorder.withdraw(userId)` | Withdraws an agreement: the person themselves, or a member who can manage the server. |
| `await bc.recorder.start({ channelId, announceChannelId, maxSeconds? })` | Joins, announces and records. Returns `{ id, channelId, recordedUserIds, maxSeconds, quotaLimited }`. |
| `bc.recorder.status()` | `{ active, id, channelId, startedAt, recordingUserIds }`. |
| `await bc.recorder.stop()` | Stops and returns `{ id, durationMs, reason, tracks: [{ userId, name, bytes, externalConsent, file }] }`. |
| `await bc.recorder.quota()` | `{ premium, monthlySeconds, usedSeconds, remainingSeconds, resetsAt }`. |

If the quota left is shorter than `maxSeconds`, the recording starts with the time left, says so in the announcement and stops by itself (`reason: 'quota'`). When the quota is used up, `start` rejects with an error whose `code` is `voice_recorder_quota_exceeded`; the other codes are `voice_recorder_premium_required`, `voice_recorder_too_many_sessions`, `voice_recorder_disabled` and `voice_recorder_unavailable` (the platform could not be reached: nothing is recorded).

```js
// consent: post the message once in a channel
await bc.recorder.consentPrompt(interaction.channelId);

// start: record the people of your voice channel who agreed
const channelId = member.voice?.channelId;
const r = await bc.recorder.start({ channelId, announceChannelId: interaction.channelId, maxSeconds: 120 });

// stop: send the tracks back as attachments
const result = await bc.recorder.stop();
await channel.send({ files: result.tracks.map((t) => t.file) });
```

You are responsible for the recordings you make and keep: tell your members what the recording is for, and delete the files when you no longer need them. The platform keeps no audio: tracks live in memory until `stop` returns them.
