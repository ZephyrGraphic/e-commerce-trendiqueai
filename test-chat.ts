
import { PrismaClient } from '@prisma/client'
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Explicitly load .env from current directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient()
const logFile = path.resolve(process.cwd(), 'diagnostic_result.txt');

// Reset log file
try { fs.unlinkSync(logFile); } catch (e) {}

function log(...args: any[]) {
    console.log(...args);
    try {
        fs.appendFileSync(logFile, args.map(a => 
            typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
        ).join(' ') + '\n');
    } catch (e) {}
}

async function main() {
  log("--- DIAGNOSTIC START ---");
  
  log("1. Checking Database...");
  try {
     const products = await prisma.product.findMany({
        take: 3,
        select: { name: true }
    });
    log(`✅ DB Connection OK. Fetched ${products.length} products.`);
  } catch (e: any) {
    log("❌ DB Error:", e.message);
  }

  log("\n2. Checking API Key...");
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    log("❌ GEMINI_API_KEY is missing/undefined");
  } else {
    log(`✅ GEMINI_API_KEY found (Length: ${key.length})`);
    log(`   First 4 chars: ${key.substring(0, 4)}`);
    // Basic format check
    if (!key.startsWith("AIza")) {
        log("⚠️ Warning: Key does not start with 'AIza'. Might be invalid.");
    }
  }

  if (key) {
      log("\n3. Listing Available Models...");
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        
        if (data.models) {
             log(`✅ Found ${data.models.length} models.`);
             const names = data.models.map((m: any) => m.name).join(", ");
             log("Models:", names);
        } else {
             log("❌ No models found in response:", JSON.stringify(data, null, 2));
        }

      } catch (e: any) {
        log("❌ ListModels API Error:", e.message);
      }
  }

  log("--- DIAGNOSTIC END ---");
}

main();
