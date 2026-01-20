#!/usr/bin/env node

import { execSync } from "child_process";

const projectName = process.argv[2] || "my-app";
const repo = "https://github.com/alamin-git-25/amin-dashboard-template.git";

console.log(`🚀 Creating project: ${projectName}`);
console.log(`📦 Cloning template from GitHub...`);

execSync(`git clone ${repo} ${projectName}`, { stdio: "inherit" });

console.log("✔ Template cloned");

/* Rename package.json */
import fs from "fs";
import path from "path";

const pkgPath = path.join(process.cwd(), projectName, "package.json");
if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log("✔ package.json updated");
}

/* Install dependencies */
console.log("📦 Installing dependencies...");
execSync("npm install", { cwd: path.join(process.cwd(), projectName), stdio: "inherit" });

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