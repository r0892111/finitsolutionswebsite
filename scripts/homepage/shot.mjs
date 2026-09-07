// Full-page screenshots with real device emulation via the Chrome DevTools Protocol.
// Usage: node shot.mjs <url> <out.png> <width> <height> [mobile:1|0] [scale] [clickSelector]
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { writeFileSync } from "node:fs";

const [url, out, w, h, mobile = "0", scale = "2", clickSel = ""] = process.argv.slice(2);
const CHROME =
  process.env.CHROME ||
  (process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : "google-chrome");
const port = 9222 + Math.floor(Math.random() * 500);

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  `--remote-debugging-port=${port}`, `--user-data-dir=${tmpdir()}/cdp-${port}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getTargets() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`);
      return await r.json();
    } catch { await sleep(200); }
  }
  throw new Error("chrome did not start");
}

const targets = await getTargets();
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
};
const send = (method, params = {}) =>
  new Promise((resolve) => { const i = ++id; pending.set(i, resolve); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: +w, height: +h, deviceScaleFactor: +scale, mobile: mobile === "1",
});
if (mobile === "1") await send("Emulation.setTouchEmulationEnabled", { enabled: true });
await send("Page.navigate", { url });
await sleep(2500);
// stash cookie banner so it does not cover the page
await send("Runtime.evaluate", { expression: `localStorage.setItem('fs_cookie_consent_v1', JSON.stringify({choices:{essential:true,statistics:false,marketing:false,social:false},expiry:new Date(Date.now()+864e5).toISOString()}))` });
await send("Page.reload");
await sleep(2500);
// Wacht tot de pagina gehydrateerd is (op de homepage krijgt het brein-canvas dan een breedte), max. 30 s.
for (let i = 0; i < 60; i++) {
  const { result } = await send("Runtime.evaluate", { returnByValue: true, expression: "document.readyState === 'complete' && (!document.querySelector('#hero canvas') || document.querySelector('#hero canvas').getBoundingClientRect().width > 0)" });
  if (result?.value) break;
  await sleep(500);
}
if (clickSel) {
  await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(clickSel)})?.click()` });
  await sleep(600);
}
await send("Runtime.evaluate", { expression: `document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; if (i.dataset.nimg && !i.complete) { const src = i.src; i.src = ''; i.src = src; } })` });
await sleep(1500);
if (!clickSel) {
  await send("Runtime.evaluate", { expression: `(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); })()`, awaitPromise: true });
  await sleep(800);
}
const { result } = await send("Runtime.evaluate", { expression: "Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)", returnByValue: true });
const fullH = clickSel ? +h : result.value;
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: fullH, deviceScaleFactor: +scale, mobile: mobile === "1" });
await sleep(400);
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: !clickSel, clip: clickSel ? { x: 0, y: 0, width: +w, height: +h, scale: 1 } : undefined });
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
console.log(`${out}: ${w}x${fullH} @${scale}x`);
ws.close();
chrome.kill();
