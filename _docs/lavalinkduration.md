---
layout: doc
title: $lavalinkDuration[]
translation_key: docs
category: Music
function_name: lavalinkDuration
syntax: $lavalinkDuration[]
description: Returns the total duration of the currently playing track in milliseconds
---
Returns the total duration of the currently playing track in milliseconds. To display a human-readable format (minutes:seconds), divide by 60000 for minutes and use modulo for seconds. Returns 0 if no track is playing.
