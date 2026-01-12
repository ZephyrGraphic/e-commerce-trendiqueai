const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const url = process.env.DATABASE_URL;
console.log('DATABASE_URL:', url);
if (url) {
  console.log('Hex:', Buffer.from(url).toString('hex'));
}

// Check .env file encoding
const envContent = fs.readFileSync('.env');
console.log('.env first 20 bytes hex:', envContent.subarray(0, 20).toString('hex'));
