---
layout: doc
title: console & fetch
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Logging and HTTP requests in BDJS scripts.
permalink: /docs/javascript/console/
---

## console

Standard logging routed to bot logs.

```javascript
console.log('Command ran');
console.warn('Missing option');
console.error('Something failed');
```

## fetch

Proxied `fetch` for HTTP requests (same restrictions as the runner sandbox).

```javascript
const res = await fetch('https://api.example.com/data');
const data = await res.json();
```

Use [$httpGet](/docs/httpget/) and related BDFD functions for equivalent behavior in BDScript.
