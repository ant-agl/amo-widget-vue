import AdmZip from "adm-zip";
import path from "path";
import fs from "fs";

const outputZip = path.resolve("./widget.zip");
const sourceDir = path.resolve("./dist/");

const zip = new AdmZip();

const addFolderToZip = (folderPath, zipInstance) => {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const newZipFolder = path.relative(sourceDir, itemPath);
      zipInstance.addLocalFolder(itemPath, newZipFolder);
    } else {
      const relativePath = path.relative(sourceDir, itemPath);
      zipInstance.addLocalFile(
        itemPath,
        path.dirname(relativePath),
        path.basename(relativePath)
      );
    }
  }
};

addFolderToZip(sourceDir, zip);

zip.writeZip(outputZip, (error) => {
  if (error) {
    console.error("Ошибка при создании архива:", error);
  } else {
    console.log(`Архив создан успешно: ${outputZip}`);
  }
});
