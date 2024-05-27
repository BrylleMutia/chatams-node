// TODO: Chat controller
import express from "express";
import { UserModel } from "../models/user.js";
import { UserHistoryModel } from "../models/userHistory.js";

export const ask = async (req: express.Request, res: express.Response) => {
   try {
      const userId = req.params.userId;
      const category = req.params.category;
      const { prompt } = req.body;

      // get user and client details
      const user = await UserModel.findById(userId);
      user.populate("client");

      // get chat history for user
      let history = await UserHistoryModel.find({ userId });

      if (prompt) {
         // add current prompt to user history for context
         history.push(prompt);
         history.join(" ");

         // TODO: Add chat engine
      }
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Get categories in client failed with error: ${err}` });
   }
};
