#!/usr/bin/env node

/**
 * 🦀 Tauri App Generator
 * -----------------------
 * This script automates Tauri app creation from an existing web app build.
 *
 * Usage:
 * 1. Place this file in a folder with:
 *    - build/            (your frontend production files)
 *    - icon.ico          (your app icon)
 *    - config.json       (contains appName and version)
 *
 * 2. Run:  node tauri-app-generator.js
 *
 * 3. Then: cd <appName> && npm run tauri build
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const __dirname = process.cwd();

const CONFIG_FILE = path.join(__dirname, "config.json");
if (!fs.existsSync(CONFIG_FILE)) {
  console.error("❌ Missing config.json file. Please create one with:");
  console.log(`{
  "appName": "MyApp",
  "version": "1.0.0"
}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
const appName = config.appName || "TauriApp";
const appVersion = config.version || "1.0.0";

const buildDir = path.join(__dirname, "build");
const iconFile = path.join(__dirname, "icon.ico");

if (!fs.existsSync(buildDir)) {
  console.error("❌ Missing 'build' folder. Please include your webapp build.");
  process.exit(1);
}

if (!fs.existsSync(iconFile)) {
  console.error("❌ Missing 'icon.ico' file.");
  process.exit(1);
}

// --- Step 1: Create new Tauri app ---
console.log(`🚀 Creating new Tauri project: ${appName}...`);
execSync(`npm create tauri-app@latest ${appName} --yes`, { stdio: "inherit" });

// --- Step 2: Copy frontend build to src-tauri/dist ---
const tauriPath = path.join(__dirname, appName);
const distPath = path.join(tauriPath, "src-tauri", "dist");
fs.rmSync(distPath, { recursive: true, force: true });
fs.mkdirSync(distPath, { recursive: true });

console.log("📁 Copying build files...");
fs.cpSync(buildDir, distPath, { recursive: true });

// --- Step 3: Copy icon ---
const iconDest = path.join(tauriPath, "src-tauri", "icons", "icon.ico");
fs.copyFileSync(iconFile, iconDest);
console.log("🎨 Copied icon.ico");

// --- Step 4: Update tauri.conf.json ---
const confFile = path.join(tauriPath, "src-tauri", "tauri.conf.json");
let conf = JSON.parse(fs.readFileSync(confFile, "utf8"));
conf.package.productName = appName;
conf.package.version = appVersion;
conf.tauri.bundle.identifier = `com.${appName.toLowerCase()}.app`;
conf.tauri.bundle.icon = ["icons/icon.ico"];
conf.build.distDir = "../src-tauri/dist";
fs.writeFileSync(confFile, JSON.stringify(conf, null, 2));

console.log("⚙️ Updated tauri.conf.json");

// --- Step 5: Success message ---
console.log(`
✅ Done! Your Tauri app project "${appName}" is ready.

Next steps:
  cd ${appName}
  npm run tauri build

Your .exe will appear in:
  ${appName}/src-tauri/target/release/
`);
