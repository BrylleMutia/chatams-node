import express from "express";
import { CategoryModel } from "../models/category.js";
import mongoose from "mongoose";

export const addNewCategory = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const clientId = req.params.clientId;
      const { categoryName } = req.body;

      if (!categoryName)
         return res.status(400).json({ message: "Category name is required" });

      const newCategory = await CategoryModel.build({
         name: categoryName,
         clientId: new mongoose.Types.ObjectId(clientId),
      }).save();

      return res.status(200).json({ data: newCategory });
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Add new category failed with error: ${err}` });
   }
};

export const getCategoriesInClient = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const clientId = req.params.clientId;

      const categories = await CategoryModel.find({ clientId });

      return res.status(200).json({ data: categories });
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Get categories in client failed with error: ${err}` });
   }
};
