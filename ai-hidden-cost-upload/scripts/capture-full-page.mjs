import { execSync } from "child_process";
import fs from "fs";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "http://localhost:3000";

console.log("Capturing resolved hero screenshot with virtual time budget...");

// Run Chrome headless with virtual-time-budget to advance timers by 5000ms
try {
  execSync(
    `"${CHROME_PATH}" --headless=new --screenshot="public/screenshot-resolved-desktop.png" --window-size=1440,900 --virtual-time-budget=5000 "${URL}"`,
    { stdio: "ignore" }
  );
  if (fs.existsSync("public/screenshot-resolved-desktop.png")) {
    const size = fs.statSync("public/screenshot-resolved-desktop.png").size;
    console.log(`✓ Resolved desktop screenshot captured: ${size} bytes`);
  }
} catch (err) {
  console.error("Failed:", err.message);
}
