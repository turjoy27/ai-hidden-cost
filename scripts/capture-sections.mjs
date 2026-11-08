import { execSync } from "child_process";
import fs from "fs";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "http://localhost:3000";

const sections = [
  { name: "calculator", selector: "#calculator", file: "public/screenshot-calculator.png" },
  { name: "environmental", selector: "#environmental-impact", file: "public/screenshot-environmental.png" },
  { name: "creativity", selector: "#human-creativity", file: "public/screenshot-creativity.png" },
  { name: "research", selector: "#research", file: "public/screenshot-research.png" },
];

console.log("Capturing section screenshots with clean Chrome profile...");

sections.forEach(({ name, file, selector }) => {
  try {
    execSync(
      `"${CHROME_PATH}" --headless=new --disable-gpu --user-data-dir="/tmp/chrome-sec-${name}" --screenshot="${file}" --window-size=1440,900 "${URL}${selector}"`,
      { stdio: "ignore" }
    );
    if (fs.existsSync(file)) {
      console.log(`✓ Captured ${name}: ${file} (${fs.statSync(file).size} bytes)`);
    }
  } catch (err) {
    console.warn(`! Warning capturing ${name}:`, err.message);
  }
});
