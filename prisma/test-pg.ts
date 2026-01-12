import "dotenv/config";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testPg() {
  console.log("Testing PG connection...");
  console.log("URL:", process.env.DATABASE_URL?.replace(/:[^:@]*@/, ":****@")); // Hide password
  try {
    await client.connect();
    console.log("✅ Connected successfully via PG driver!");
    const res = await client.query('SELECT NOW()');
    console.log("Time from DB:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

testPg();
