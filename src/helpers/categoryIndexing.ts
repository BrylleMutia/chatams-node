import fs from "fs";
import path from "path";
import { CategoryModel } from "../models/category.js";
import { createIndex } from "./initializeIndex.js";
import { ClientModel } from "../models/client.js";

// create file directory for each client
export const createClientDirectory = async (clientName: string) => {
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

// create index for all categories that need initial index or reindexing
export const createCategoryIndex = async (clientId: string) => {
   const categoriesNeedIndex = await CategoryModel.find({
      needIndex: true,
      clientId,
   }).exec();

   if (!categoriesNeedIndex.length)
      return console.log("No category needs indexing...");

   const clientName = (await ClientModel.findById(clientId).exec()).name;

   for (let category of categoriesNeedIndex) {
      createIndex(clientName, category.name).then((index) => {
         if (index) {
            // once index is created, change status in db
            category.needIndex = false;
            category.save();

            console.log(
               `Rebuilding index for ${clientName}/${category.name} successful!`
            );
         }
      });
   }
};
