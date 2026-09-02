---
layout: doc
title: External Database Integration
translation_key: docs
category: "Database"
function_name: external-database
syntax: pgsql | sql | mongo
description: Connect your pure JavaScript Discord bot to an external PostgreSQL, MySQL, or MongoDB database.
---

# External Database Integration

Bot Creator allows **pure JavaScript Discord bots** to connect directly to your own external databases. This gives you complete ownership and persistence over your bot's data, allowing you to build large-scale inventory systems, economy bots, complex leveling trackers, and cross-platform integrations.

## Overview

When running a JavaScript bot, the Bot Settings screen replaces the audio (Lavalink) tab with a dedicated **Database** tab. You can configure one active external database engine:

| Engine | Script Keyword | Driver / Client |
|---|---|---|
| **PostgreSQL** | `pgsql` | Node `pg` Pool (with SSL support) |
| **MySQL** | `sql` | `mysql2/promise` Pool |
| **MongoDB** | `mongo` | Official MongoDB Node driver |

---

## Configuration in the App

1. Open your bot in **Bot Creator**.
2. Navigate to **Bot Settings** (gear icon) > **Database** tab.
3. Select your **Database Type** (`PostgreSQL`, `MySQL`, or `MongoDB`).
4. Enter your connection string (URI) or configure individual fields:
   - **Direct URI**: e.g., `postgresql://user:pass@host:5432/dbname`, `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
   - **Individual Fields**: Host, Port, Database Name, Username, Password, and SSL toggle.
5. Tap **Enregistrer la configuration** (Save).
6. Next time your bot starts or syncs, the database pool is automatically initialized.

---

## Global Keywords in JavaScript

Whenever a database is configured in the bot settings, the corresponding global object is directly available inside all commands, events, and scheduled handlers:

### 1. PostgreSQL (`pgsql`)
```js
// Parameterized query using $1, $2 placeholders
const result = await pgsql.query(
  'SELECT xp, level FROM users WHERE id = $1',
  [message.author.id]
);
```
See the full [PostgreSQL Documentation](/docs/database-postgres) for details.

### 2. MySQL (`sql`)
```js
// Parameterized query using ? placeholders
const [rows] = await sql.query(
  'SELECT coins FROM profiles WHERE user_id = ?',
  [interaction.user.id]
);
```
See the full [MySQL Documentation](/docs/database-mysql) for details.

### 3. MongoDB (`mongo`)
```js
// Access collections directly
const users = mongo.collection('users');
const profile = await users.findOne({ userId: message.author.id });
```
See the full [MongoDB Documentation](/docs/database-mongodb) for details.

---

## Connection Resilience & Lifecycle

- **Non-blocking startup**: Database connections connect lazily. If your database server is temporarily offline when the bot starts, the Discord gateway connection will still succeed.
- **Clean shutdown**: When you stop, restart, or reload your bot, existing connections are gracefully drained and closed.
- **Connection pooling**: Connections are automatically pooled and reused across events and commands for maximum performance.
