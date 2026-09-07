// Meet de tekentijd van het brein: hoeveel ms per beeldje kost de animatie in de hero?
// Gebruik: node perf.mjs [url]   (standaard http://localhost:3000/)
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
const CHROME =
  process.env.CHROME ||
  (process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : "google-chrome");
const port = 9700 + Math.floor(Math.random() * 200);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${tmpdir()}/cdp-${port}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); break; } catch { await sleep(200); } }
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
await send("Page.enable");
const url = process.argv[2] || "http://localhost:3000/";
await send("Page.navigate", { url });
// Wacht tot de pagina geladen én gehydrateerd is (het canvas krijgt pas dan een breedte); de dev-server kan even compileren.
for (let i = 0; i < 60; i++) {
  const klaar = await send("Runtime.evaluate", { returnByValue: true, expression: "document.readyState === 'complete' && (document.querySelector('#hero canvas')?.getBoundingClientRect().width ?? 0) > 0" });
  if (klaar?.result?.value) break;
  await sleep(500);
}
await sleep(2000);
// Wikkel requestAnimationFrame-callbacks in een timer en meet 120 beeldjes.
const r = await send("Runtime.evaluate", { awaitPromise: true, returnByValue: true, expression: `
  new Promise((resolve) => {
    const tijden = []; let n = 0;
    const orig = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => orig((t) => { const s = performance.now(); cb(t); tijden.push(performance.now() - s); if (++n === 120) { window.requestAnimationFrame = orig; tijden.sort((a,b)=>a-b); resolve({ gem: tijden.reduce((a,b)=>a+b,0)/tijden.length, p95: tijden[Math.floor(tijden.length*0.95)], max: tijden[tijden.length-1] }); } });
    setTimeout(() => resolve({ fout: 'geen 120 beeldjes binnen 6s', n }), 6000);
  })` });
console.log("tekentijd per beeldje (ms, retina 2x, 1440px):", JSON.stringify(r.result.value));
chrome.kill(); process.exit(0);
