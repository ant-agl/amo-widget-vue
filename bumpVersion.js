// bumpVersion.js
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Получаем путь к текущему каталогу
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Путь к файлу manifest.json
const manifestPath = join(__dirname, "public/manifest.json");

// Чтение manifest.json
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// Функция для автоинкремента версии
function incrementVersion(version) {
  const [major, minor, patch] = version.split(".").map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

// Обновление версии
manifest.widget.version = incrementVersion(manifest.widget.version);

// Запись изменений в manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
console.log(`Updated widget version to ${manifest.widget.version}`);
