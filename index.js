#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

/* ---------------- ESM dirname ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- Project Name ---------------- */
const projectName = process.argv[2] || "amin-dashboard";
const targetDir = path.join(process.cwd(), projectName);
const templateDir = path.join(__dirname, "template");

/* ---------------- Banner ---------------- */
console.log(`
========================================
 🚀 AMIN DASHBOARD INSTALLER
========================================
Creating project: ${projectName}
`);

/* ---------------- Validation ---------------- */
if (fs.existsSync(targetDir)) {
    console.error(`❌ Folder already exists: ${projectName}`);
    process.exit(1);
}

if (!fs.existsSync(templateDir)) {
    console.error("❌ Template folder not found:", templateDir);
    process.exit(1);
}

/* ---------------- Copy Template ---------------- */
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(templateDir, targetDir, { recursive: true });

console.log("✔ Template copied");

/* ---------------- Rename package.json ---------------- */
const pkgPath = path.join(targetDir, "package.json");

if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log("✔ package.json updated");
}

/* ---------------- Install Dependencies ---------------- */
console.log("📦 Installing dependencies...");
try {
    execSync("npm install", {
        cwd: targetDir,
        stdio: "inherit",
    });
} catch (err) {
    console.error("❌ npm install failed");
    process.exit(1);
}

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