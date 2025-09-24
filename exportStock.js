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
    const res = await db.query('SELECT code,name,price,quantity,min_qty,image_url FROM stocks ORDER BY code');
    const rows = res.rows;
    const header = 'code,name,price,quantity,min_qty,image_url\n';
    const body = rows.map(r => `${r.code},"${(r.name||'').replace(/"/g,'""')}",${r.price||0},${r.quantity||0},${r.min_qty||0},${r.image_url||''}`).join('\n');
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=stocks.csv"
      },
      body: header + body
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
