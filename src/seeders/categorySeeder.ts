import mongoose from "mongoose";
import { CategoryModel } from "../models/category.js";

export const initializeCategory = async (clientId: mongoose.Types.ObjectId) => {
   const initCategories = ["ALL", "KB Articles"];

   for (const category of initCategories) {
      const existingCategory = await CategoryModel.findOne({
         name: category,
         clientId,
      }).exec();
      if (existingCategory) break;

      const newCategory = CategoryModel.build({
         name: category,
         clientId,
      });

      await newCategory.save();
      console.log(`Created initial category: ${newCategory.name}`);
   }
};
