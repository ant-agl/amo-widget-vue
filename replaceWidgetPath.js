import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import yargs from "yargs";

// Получаем путь к текущей директории с использованием import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Парсим аргументы командной строки
const argv = yargs(process.argv.slice(2)).parse();

// Получаем параметр --mode, если его нет, то по умолчанию используем 'development'
const mode = argv.mode || "development";

// Загружаем переменные окружения из нужного файла
dotenv.config({
  path: path.resolve(__dirname, `.env.${mode}`),
});

// Читаем значение переменной окружения VITE_WIDGET_PATH
const port = process.env.VITE_PORT;

if (!port) {
  console.error("VITE_PORT не задан в .env файле");
  process.exit(1);
}

const widgetPath = port ? `http://localhost:${port}` : ".";

// Путь к файлу script.js
const scriptPath = path.resolve(__dirname, "dist", "script.js");

// Читаем содержимое файла script.js
fs.readFile(scriptPath, "utf8", (err, data) => {
  if (err) {
    console.error("Ошибка при чтении файла:", err);
    return;
  }

  // Заменяем все вхождения {{BASE_PATH}} на widgetPath
  const updatedData = data.replace(/{{BASE_PATH}}/g, widgetPath);

  // Записываем обновленное содержимое обратно в файл
  fs.writeFile(scriptPath, updatedData, "utf8", (err) => {
    if (err) {
      console.error("Ошибка при записи файла:", err);
    } else {
      console.log("Файл успешно обновлен");
    }
  });
});
