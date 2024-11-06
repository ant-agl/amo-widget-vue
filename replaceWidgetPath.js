import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import yargs from "yargs";

// Получаем путь к текущей директории с использованием import.meta.url
const __filename = new URL(import.meta.url).pathname;
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
const widgetPath = process.env.VITE_WIDGET_PATH;

if (!widgetPath) {
  console.error("VITE_WIDGET_PATH не задан в .env файле");
  process.exit(1);
}

// Путь к файлу script.js
const scriptPath = path.resolve(__dirname, "dist", "script.js");

// Читаем содержимое файла script.js
fs.readFile(scriptPath, "utf8", (err, data) => {
  if (err) {
    console.error("Ошибка при чтении файла:", err);
    return;
  }

  // Заменяем все вхождения {{WIDGET_PATH}} на import.meta.env.VITE_WIDGET_PATH
  const updatedData = data.replace(/{{WIDGET_PATH}}/g, widgetPath);

  // Записываем обновленное содержимое обратно в файл
  fs.writeFile(scriptPath, updatedData, "utf8", (err) => {
    if (err) {
      console.error("Ошибка при записи файла:", err);
    } else {
      console.log("Файл успешно обновлен");
    }
  });
});
