import { execSync } from "child_process";
import fs from "fs";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "http://localhost:3000#calculator";

console.log("Capturing #calculator screenshot...");

try {
  execSync(
    `"${CHROME_PATH}" --headless=new --screenshot="public/screenshot-calculator.png" --window-size=1440,900 "${URL}"`,
    { stdio: "ignore" }
  );
  if (fs.existsSync("public/screenshot-calculator.png")) {
    const size = fs.statSync("public/screenshot-calculator.png").size;
    console.log(`✓ Calculator screenshot captured: ${size} bytes`);
  }
} catch (err) {
  console.error("Failed:", err.message);
}
