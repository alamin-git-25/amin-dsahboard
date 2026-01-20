#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

/* ---------------- dirname for ESM ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- CLI args ---------------- */
const projectName = process.argv[2] || "my-app";
const targetDir = path.join(process.cwd(), projectName);

/* ---------------- Template path ---------------- */
const templateDir = path.join(__dirname, "template"); // <--- key fix

if (!fs.existsSync(templateDir)) {
    console.error("❌ Template folder not found:", templateDir);
    process.exit(1);
}

/* ---------------- Copy template ---------------- */
fs.cpSync(templateDir, targetDir, { recursive: true });

/* ---------------- Rename package.json ---------------- */
const pkgPath = path.join(targetDir, "package.json");
if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

/* ---------------- Install deps ---------------- */
console.log("📦 Installing dependencies...");
execSync("npm install", { cwd: targetDir, stdio: "inherit" });

/* ---------------- Final Output ---------------- */
console.log(`
 █████╗ ███╗   ███╗██╗███╗   ██╗
██╔══██╗████╗ ████║██║████╗  ██║
███████║██╔████╔██║██║██╔██╗ ██║
██╔══██║██║╚██╔╝██║██║██║╚██╗██║
██║  ██║██║ ╚═╝ ██║██║██║ ╚████║
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝

 ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
 ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
 ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
 ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
 ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 

 🚀 AMIN DASHBOARD
 ─────────────────────────────────────────
 ✔ Application booted successfully
 ✔ Routes registered
 ✔ Components loaded
 ✔ Environment ready

 🌐 Framework : React
 🎨 UI        : Tailwind CSS
 🧭 Router    : React Router
 ⚙️  Mode      : Development

 Happy coding ! 💙👍
`);

console.log(`cd ${projectName}`);
console.log("npm run dev");