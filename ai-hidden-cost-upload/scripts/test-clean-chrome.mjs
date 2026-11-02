import { execSync } from "child_process";
import fs from "fs";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "http://localhost:3000";

console.log("Testing headless Chrome with clean user-data-dir and disable-gpu...");

try {
  execSync(
    `"${CHROME_PATH}" --headless=new --disable-gpu --user-data-dir="/tmp/chrome-qa-profile" --screenshot="public/screenshot-test.png" --window-size=1440,900 "${URL}"`,
    { stdio: "inherit" }
  );
  if (fs.existsSync("public/screenshot-test.png")) {
    const size = fs.statSync("public/screenshot-test.png").size;
    console.log(`✓ Clean Chrome screenshot captured: ${size} bytes`);
  }
} catch (err) {
  console.error("Error running Chrome:", err.message);
}
