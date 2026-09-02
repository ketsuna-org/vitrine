---
layout: doc
title: PostgreSQL (pgsql)
translation_key: docs
category: "Database"
function_name: pgsql
syntax: await pgsql.query(sql, [params])
description: Query and interact with an external PostgreSQL database using the pgsql keyword in JavaScript scripts.
---

# PostgreSQL (`pgsql`)

When PostgreSQL is configured in your bot settings, the global `pgsql` object provides direct access to a PostgreSQL connection pool powered by `pg`.

## Syntax

```js
// Run a query
const result = await pgsql.query(sqlText, paramsArray);

// Acquire a dedicated client (e.g. for transactions)
const client = await pgsql.connect();
```

## Methods & Properties

| Name | Type | Description |
|---|---|---|
| `pgsql.query(text, [params])` | Method | Executes a parameterized SQL query and returns `{ rows, rowCount, fields }`. |
| `pgsql.connect()` | Method | Acquires a client connection from the pool. Must be released with `client.release()`. |
| `pgsql.pool` | Property | Direct reference to the underlying `pg.Pool` instance. |

## Examples

### 1. Initialize Tables
```js
await pgsql.query(`
  CREATE TABLE IF NOT EXISTS user_levels (
    user_id VARCHAR(32) PRIMARY KEY,
    guild_id VARCHAR(32) NOT NULL,
    xp BIGINT DEFAULT 0,
    level INT DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);
```

### 2. Leveling & XP Tracking (Discord Message Event)
```js
const userId = message.author.id;
const guildId = message.guild.id;

// Upsert user XP with parameterized query
const res = await pgsql.query(`
  INSERT INTO user_levels (user_id, guild_id, xp, level)
  VALUES ($1, $2, 10, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET xp = user_levels.xp + 10, updated_at = NOW()
  RETURNING xp, level;
`, [userId, guildId]);

const currentXp = res.rows[0].xp;
console.log(`User ${message.author.username} now has ${currentXp} XP!`);
```

### 3. Server Leaderboard Slash Command
```js
const topUsers = await pgsql.query(`
  SELECT user_id, xp, level
  FROM user_levels
  WHERE guild_id = $1
  ORDER BY xp DESC
  LIMIT 10;
`, [interaction.guild.id]);

const description = topUsers.rows.map((row, index) => {
  return `**#${index + 1}** <@${row.user_id}> — Level ${row.level} (${row.xp} XP)`;
}).join('\n');

await interaction.reply({
  embeds: [{
    title: `🏆 Leaderboard — ${interaction.guild.name}`,
    description: description || 'No data yet.',
    color: 0x5865F2,
  }],
});
```

### 4. Transactions
```js
const client = await pgsql.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - 100 WHERE id = $1', [senderId]);
  await client.query('UPDATE accounts SET balance = balance + 100 WHERE id = $2', [recipientId]);
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}
```

## Security Best Practice

Always use parameterized placeholders (`$1`, `$2`, etc.) instead of string concatenation to prevent SQL injection vulnerabilities.
