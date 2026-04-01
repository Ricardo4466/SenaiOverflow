/**
 * Conecta no banco `postgres` e cria DB_NAME se ainda não existir.
 * Uso: node src/scripts/ensure-database.js
 */
require("dotenv").config({
  override: process.env.NODE_ENV !== "production",
});

const { Client } = require("pg");
const dbConfig = require("../config/database");

async function main() {
  const url = dbConfig.url;
  if (!url) {
    console.error("Defina DATABASE_URL ou DB_* no .env");
    process.exit(1);
  }

  let base = url.trim();
  if (/^postgresql:/i.test(base)) {
    base = "postgres:" + base.slice("postgresql:".length);
  }

  const u = new URL(base);
  const dbName = decodeURIComponent(u.pathname.replace(/^\//, "") || "senai_overflow");
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dbName)) {
    throw new Error(`DB_NAME inválido para CREATE DATABASE: ${dbName}`);
  }

  u.pathname = "/postgres";
  const adminUrl = u.toString();

  const client = new Client({ connectionString: adminUrl });
  await client.connect();

  const { rows } = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [dbName]
  );

  if (rows.length === 0) {
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`Banco criado: ${dbName}`);
  } else {
    console.log(`Banco já existe: ${dbName}`);
  }

  await client.end();
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
