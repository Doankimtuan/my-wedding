#!/usr/bin/env node

// Load environment variables from .env.local
require("dotenv").config({ path: ".env.local" });

/**
 * Generate TypeScript types from Supabase database
 * This script uses the Supabase API to generate types without requiring CLI login
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const PROJECT_ID = "lfremgnutasmckuwxeuk";
const OUTPUT_FILE = path.join(__dirname, "../lib/supabase/database.types.ts");

// You can get this from: https://supabase.com/dashboard/account/tokens
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error(
    "❌ Error: SUPABASE_ACCESS_TOKEN environment variable is not set."
  );
  console.log("\n📝 To fix this:");
  console.log("1. Go to: https://supabase.com/dashboard/account/tokens");
  console.log("2. Generate a new access token");
  console.log("3. Add it to your .env.local:");
  console.log("   SUPABASE_ACCESS_TOKEN=your_token_here");
  console.log("\n4. Then run: npm run db:types\n");
  process.exit(1);
}

const options = {
  hostname: "api.supabase.com",
  path: `/v1/projects/${PROJECT_ID}/types/typescript`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

console.log("🔄 Generating TypeScript types from Supabase...");

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    if (res.statusCode === 200) {
      // Ensure directory exists
      const dir = path.dirname(OUTPUT_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Parse JSON response and extract types
      let typesContent = data;
      try {
        const parsed = JSON.parse(data);
        if (parsed.types) {
          typesContent = parsed.types;
        }
      } catch (e) {
        // If not JSON, use as-is
      }

      // Write types to file
      fs.writeFileSync(OUTPUT_FILE, typesContent);
      console.log(`✅ Types generated successfully: ${OUTPUT_FILE}`);
    } else {
      console.error(`❌ Error: ${res.statusCode} - ${res.statusMessage}`);
      console.error(data);
      process.exit(1);
    }
  });
});

req.on("error", (error) => {
  console.error("❌ Request failed:", error.message);
  process.exit(1);
});

req.end();
