const { Pool } = require('pg');
let pool;
function getPool() {
  if (pool) return pool;
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
  return pool;
}

exports.handler = async (event) => {
  // simple login: expects JSON { admin_type: "stock"|"spr"|"pr", password: "..." }
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method not allowed" };
    }
    const body = JSON.parse(event.body || "{}");
    const { admin_type, password } = body;
    if (!admin_type || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: "admin_type and password required" }) };
    }
    const mapping = {
      stock1: process.env.ADMIN_STOCK_1_PASS,
      stock2: process.env.ADMIN_STOCK_2_PASS,
      spr: process.env.ADMIN_SPR_PASS,
      pr: process.env.ADMIN_PR_PASS
    };
    const expected = mapping[admin_type];
    if (!expected) {
      return { statusCode: 400, body: JSON.stringify({ error: "invalid admin_type" }) };
    }
    if (password === expected) {
      // NOTE: production should return JWT or session token. Here we return a simple success.
      return { statusCode: 200, body: JSON.stringify({ ok: true, role: admin_type }) };
    } else {
      return { statusCode: 401, body: JSON.stringify({ error: "invalid credentials" }) };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
