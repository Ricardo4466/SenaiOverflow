// Em dev, o `.env` do projeto manda (evita DATABASE_URL velho no ambiente do Windows).
require("dotenv").config({
  override: process.env.NODE_ENV !== "production",
});

/**
 * Mesmo padrão do e360-journey-backend:
 * - DATABASE_URL (opcional, aspas permitidas)
 * - ou DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 */
function stripQuotes(value) {
  if (value == null || typeof value !== "string") return value;
  const t = value.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

function buildDatabaseUrl() {
  const direct = stripQuotes(process.env.DATABASE_URL);
  if (direct) return direct;

  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "5432";
  const user = encodeURIComponent(process.env.DB_USER || "postgres");
  const password = encodeURIComponent(process.env.DB_PASSWORD || "");
  const dbName = process.env.DB_NAME || "senai_overflow";

  return `postgres://${user}:${password}@${host}:${port}/${dbName}`;
}

const define = {
  timestamps: true,
  underscored: true,
};

const postgres = {
  dialect: "postgres",
  define,
};

const url = buildDatabaseUrl();

module.exports = {
  url,
  config: postgres,
  development: {
    url,
    ...postgres,
  },
  test: {
    url,
    ...postgres,
  },
  production: {
    url,
    ...postgres,
  },
};
