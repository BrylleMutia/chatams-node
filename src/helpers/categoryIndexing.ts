import fs from "fs";
import path from "path";

// create directory for each client
export const createClientDirectory = (clientName: string) => {
   const BASE_FOLDERS = ["docs", "docs_temp", "indexes"];

   for (const folder of BASE_FOLDERS) {
      const clientPath = path.join(folder, clientName);

      if (!fs.existsSync(clientPath)) {
         console.log(`Creating path for client: ${clientPath}`);
         fs.mkdirSync(clientPath, { recursive: true });
         console.log(`Created directory: ${clientPath}`);
      }
   }

   const INITIAL_CATEGORIES = ["ALL", "KB Articles"];
   for (const category of INITIAL_CATEGORIES) {
      createCategoryFolder(clientName, category);
   }
};

// create folders for each category under each client
export const createCategoryFolder = (clientName: string, category: string) => {
   const categoryPath = path.join("docs", clientName, category);

   if (!fs.existsSync(categoryPath)) {
      console.log(`Creating path for category: ${categoryPath}`);
      fs.mkdirSync(categoryPath, { recursive: true });
      console.log(`Created directory for category: ${categoryPath}`);

      // create placeholder file
      const content =
         "This is a placeholder file. This application is created by the Constellation GenAI Team.";
      fs.writeFile(
         path.join(categoryPath, "placeholder_file.txt"),
         content,
         (err) => {
            if (err)
               return console.error(
                  `Failed to create placeholder file: ${err}`
               );
            console.log("Created placeholder file...");
         }
      );
   }
};

// TODO: Continue transition for Category Indexing
