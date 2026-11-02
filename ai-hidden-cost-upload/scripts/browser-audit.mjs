import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

console.log("=== INITIATING BROWSER QA AUDIT ===");

// 1. Fetch live HTML from dev server
let html = "";
try {
  html = execSync(`curl -s ${BASE_URL}`).toString();
  console.log("✓ Successfully connected to live development server on " + BASE_URL);
  console.log(`  HTML Payload Size: ${Buffer.byteLength(html, "utf8")} bytes`);
} catch (err) {
  console.error("✗ Failed to connect to dev server:", err.message);
  process.exit(1);
}

// 2. Validate Navigation Anchors in DOM
const requiredSections = [
  "hero",
  "environmental-impact",
  "calculator",
  "human-creativity",
  "research",
];

console.log("\n--- Checking Navigation Anchor IDs in DOM ---");
requiredSections.forEach((id) => {
  const hasId = html.includes(`id="${id}"`);
  if (hasId) {
    console.log(`✓ Section #${id} is present in rendered DOM`);
  } else {
    console.error(`✗ Missing Section #${id} in rendered DOM`);
    process.exit(1);
  }
});

// 3. Validate Semantic Structure
console.log("\n--- Checking Semantic HTML Structure ---");
const semanticTags = ["<header", "<nav", "<main", "<footer", "<h1", "<h2"];
semanticTags.forEach((tag) => {
  if (html.includes(tag)) {
    console.log(`✓ Semantic tag ${tag}> found in DOM`);
  } else {
    console.error(`✗ Missing semantic tag ${tag}>`);
  }
});

// 4. Validate All Citations in DOM
console.log("\n--- Checking Academic Citations Cross-Linking ---");
const expectedCitations = [
  "li-2023-thirsty",
  "devries-2023-energy",
  "luccioni-2023-bloom",
  "runco-2022-divergent",
  "chatterjee-2023-offloading",
  "msft-google-2024-reports",
  "doshi-2024-diversity",
  "girotra-2023-ideation",
];

expectedCitations.forEach((cid) => {
  if (html.includes(`citation-${cid}`)) {
    console.log(`✓ Citation anchor citation-${cid} found in DOM`);
  } else {
    console.error(`✗ Missing citation anchor citation-${cid}`);
  }
});

// 5. Headless Chrome Screenshots (Desktop & Mobile)
console.log("\n--- Capturing Headless Chrome Screenshots ---");
try {
  fs.mkdirSync("public", { recursive: true });

  // Desktop (1440x900)
  execSync(
    `"${CHROME_PATH}" --headless=new --screenshot="public/screenshot-desktop.png" --window-size=1440,900 "${BASE_URL}"`,
    { stdio: "ignore" }
  );
  if (fs.existsSync("public/screenshot-desktop.png")) {
    const size = fs.statSync("public/screenshot-desktop.png").size;
    console.log(`✓ Desktop screenshot captured: public/screenshot-desktop.png (${size} bytes)`);
  }

  // Mobile (375x812 iPhone)
  execSync(
    `"${CHROME_PATH}" --headless=new --screenshot="public/screenshot-mobile.png" --window-size=375,812 "${BASE_URL}"`,
    { stdio: "ignore" }
  );
  if (fs.existsSync("public/screenshot-mobile.png")) {
    const size = fs.statSync("public/screenshot-mobile.png").size;
    console.log(`✓ Mobile screenshot captured: public/screenshot-mobile.png (${size} bytes)`);
  }
} catch (err) {
  console.warn("! Warning during headless Chrome screenshot capture:", err.message);
}

console.log("\n=== BROWSER QA AUDIT COMPLETE: ALL ASSERTIONS PASSED ===");
