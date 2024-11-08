import { exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

// Получаем путь к текущей директории с использованием import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем переменные окружения из нужного файла
dotenv.config({
  path: path.resolve(__dirname, `.env.development`),
});

// Читаем значение переменной окружения VITE_WIDGET_PATH
const port = process.env.VITE_PORT;

if (!port) {
  console.error("VITE_PORT не задан в .env файле");
  process.exit(1);
}

const serve = exec(`npx serve dist -p ${port}`);

// Логирование стандартного вывода
serve.stdout.on("data", (data) => {
  console.log(`serve: ${data}`);
});

// Логирование ошибок
serve.stderr.on("data", (data) => {
  console.error(`serve err: ${data}`);
});

// Логирование завершения процесса
serve.on("close", (code) => {
  console.log(`Процесс завершен с кодом: ${code}`);
});
