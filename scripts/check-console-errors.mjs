import { spawn } from "child_process";
import http from "http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

console.log("Starting Chrome with remote debugging on port 9222...");

const chrome = spawn(CHROME_PATH, [
  "--headless=new",
  "--remote-debugging-port=9222",
  "--no-first-run",
  "--no-default-browser-check",
  "http://localhost:3000",
]);

setTimeout(async () => {
  try {
    const res = await fetch("http://127.0.0.1:9222/json");
    const tabs = await res.json();
    console.log("Active Chrome Tabs:", tabs.length);
    if (tabs.length > 0) {
      console.log("Tab Title:", tabs[0].title);
      console.log("Tab URL:", tabs[0].url);
      console.log("WebSocket Debugger URL:", tabs[0].webSocketDebuggerUrl);
    }
  } catch (err) {
    console.error("Failed to query Chrome DevTools:", err.message);
  } finally {
    chrome.kill();
    process.exit(0);
  }
}, 3000);
