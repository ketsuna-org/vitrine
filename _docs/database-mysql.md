---
layout: doc
title: MySQL (sql)
translation_key: docs
category: "Database"
function_name: sql
syntax: await sql.query(query, [values])
description: Query and interact with an external MySQL or MariaDB database using the sql keyword in JavaScript scripts.
---

# MySQL (`sql`)

When MySQL is configured in your bot settings, the global `sql` object provides direct access to a MySQL/MariaDB connection pool powered by `mysql2/promise`.

## Syntax

```js
// Run a query with ? placeholders
const [rows, fields] = await sql.query(queryText, valuesArray);

// Prepare and execute a statement
const [results] = await sql.execute(queryText, valuesArray);

// Get a dedicated connection (e.g. for transactions)
const conn = await sql.getConnection();
```

## Methods & Properties

| Name | Type | Description |
|---|---|---|
| `sql.query(sql, [values])` | Method | Runs an SQL query with `?` parameter placeholders. Returns `[rows, fields]`. |
| `sql.execute(sql, [values])` | Method | Prepares and executes an SQL statement with cached statement caching. |
| `sql.getConnection()` | Method | Acquires a connection from the pool. Must be released with `conn.release()`. |
| `sql.pool` | Property | Direct reference to the underlying `mysql2.Pool` instance. |

## Examples

### 1. Initialize Tables
```js
await sql.query(`
  CREATE TABLE IF NOT EXISTS user_economy (
    user_id VARCHAR(32) PRIMARY KEY,
    coins BIGINT NOT NULL DEFAULT 100,
    bank BIGINT NOT NULL DEFAULT 0,
    daily_streak INT NOT NULL DEFAULT 0,
    last_daily TIMESTAMP NULL DEFAULT NULL
  );
`);
```

### 2. Daily Rewards Command
```js
const userId = interaction.user.id;

const [rows] = await sql.query(
  'SELECT coins, last_daily FROM user_economy WHERE user_id = ?',
  [userId]
);

let coins = 100;
if (rows.length === 0) {
  await sql.query(
    'INSERT INTO user_economy (user_id, coins, last_daily) VALUES (?, 300, NOW())',
    [userId]
  );
  coins = 300;
} else {
  const lastDaily = rows[0].last_daily ? new Date(rows[0].last_daily).getTime() : 0;
  const now = Date.now();
  const cooldown = 24 * 60 * 60 * 1000;

  if (now - lastDaily < cooldown) {
    const hoursLeft = Math.ceil((cooldown - (now - lastDaily)) / (1000 * 60 * 60));
    return interaction.reply({
      content: `⏳ You already claimed your daily reward! Come back in ${hoursLeft} hour(s).`,
      ephemeral: true,
    });
  }

  await sql.query(
    'UPDATE user_economy SET coins = coins + 200, last_daily = NOW() WHERE user_id = ?',
    [userId]
  );
  coins = Number(rows[0].coins) + 200;
}

await interaction.reply(`🎉 You claimed your daily reward of 200 coins! Total balance: **${coins} coins**.`);
```

### 3. Transactions
```js
const conn = await sql.getConnection();
try {
  await conn.beginTransaction();
  await conn.query('UPDATE user_economy SET coins = coins - ? WHERE user_id = ?', [50, senderId]);
  await conn.query('UPDATE user_economy SET coins = coins + ? WHERE user_id = ?', [50, receiverId]);
  await conn.commit();
} catch (err) {
  await conn.rollback();
  throw err;
} finally {
  conn.release();
}
```

## Security Best Practice

Always use `?` parameter placeholders with `sql.query` and `sql.execute` rather than injecting variables directly into the query string to prevent SQL injection attacks.
