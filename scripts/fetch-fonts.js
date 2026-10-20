// Копирует WOFF2 из node_modules/@fontsource и генерирует assets/css/fonts.css.
const fs = require("fs");
const path = require("path");
const cfg = require("./fonts.config.js");

const root = path.join(__dirname, "..");
const out = [];
const copy = process.argv.includes("--no-copy") ? false : true;

for (const f of cfg.fonts) {
  const dir = path.join(root, "assets/fonts", f.id);
  fs.mkdirSync(dir, { recursive: true });
  const src = path.join(root, "node_modules/@fontsource", f.id);
  if (copy && fs.existsSync(src)) {
    const lic = path.join(src, "LICENSE");
    if (fs.existsSync(lic)) fs.copyFileSync(lic, path.join(dir, "OFL.txt"));
  }
  for (const [style, weight] of f.styles) {
    for (const [subset, range] of Object.entries(cfg.subsets)) {
      const file = `${f.id}-${subset}-${weight}-${style}.woff2`;
      if (copy && fs.existsSync(src)) fs.copyFileSync(path.join(src, "files", file), path.join(dir, file));
      out.push(`@font-face{font-family:"${f.family}";font-style:${style};font-weight:${weight};font-display:swap;src:url("../fonts/${f.id}/${file}") format("woff2");unicode-range:${range};}`);
    }
  }
}
for (const [style, weight, name] of cfg.ipa.files) {
  out.push(`@font-face{font-family:"${cfg.ipa.family}";font-style:${style};font-weight:${weight};font-display:swap;src:url("../fonts/${cfg.ipa.id}/${cfg.ipa.id}-${name}.woff2") format("woff2");}`);
}
fs.writeFileSync(path.join(root, "assets/css/fonts.css"), "/* Сгенерировано scripts/fetch-fonts.js. Шрифты: SIL Open Font License. */\n" + out.join("\n") + "\n");
console.log("fonts.css:", out.length, "@font-face");
