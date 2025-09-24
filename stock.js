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
  const db = getPool();
  try {
    if (event.httpMethod === "GET") {
      const res = await db.query('SELECT * FROM stocks ORDER BY name');
      return { statusCode: 200, body: JSON.stringify(res.rows) };
    }
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { code, name, price, quantity, min_qty, image_url } = body;
      const insert = await db.query(
        `INSERT INTO stocks(code,name,price,quantity,min_qty,image_url) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        [code, name, price || 0, quantity || 0, min_qty || 0, image_url || null]
      );
      return { statusCode: 201, body: JSON.stringify(insert.rows[0]) };
    }
    return { statusCode: 405, body: "Method not allowed" };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
