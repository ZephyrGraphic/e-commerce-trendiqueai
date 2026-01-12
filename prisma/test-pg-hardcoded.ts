import { Client } from "pg";

// Hardcoding for test only
const connectionString = "postgresql://postgres.zycswfmncnxbgzruxsbh:Kaydeen2002K@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

async function testPgHardcoded() {
  console.log("Testing PG Hardcoded...");
  try {
    await client.connect();
    console.log("✅ Connected successfully via PG driver (Hardcoded)!");
    const res = await client.query('SELECT NOW()');
    console.log("Time from DB:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

testPgHardcoded();
