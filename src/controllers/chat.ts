// TODO: Chat controller
import express from "express";
import { UserModel } from "../models/user.js";
import { UserHistoryModel } from "../models/userHistory.js";
import { initializeIndex } from "../helpers/initializeIndex.js";
import { IClient } from "../models/client.js";

export const ask = async (req: express.Request, res: express.Response) => {
   try {
      const userId = req.params.userId;
      const category = req.params.category;
      const { prompt } = req.body;

      // get user and client details
      const user = await UserModel.findById(userId);
      if (!user) return res.json(400).json({ error: "User not found" });

      let clientName = "";
      user.populate<{ client: IClient }>("client").then((doc) => {
         clientName = doc.client.name;
      });

      // get chat history for user
      let history = await UserHistoryModel.find({ userId });

      if (prompt && clientName && category) {
         // add current prompt to user history for context
         history.push(prompt);
         const query = history.join(" ");

         const index = await initializeIndex(clientName, category);
         // get retriever
         const retriever = index.asRetriever();
         // Create a query engine
         const queryEngine = index.asQueryEngine({ retriever });
         const response = await queryEngine.query({ query });

         return res.status(200).json({ data: response.toString() });
      } else
         return res.status(400).json({ error: "Required fields are missing" });
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Ask in chat failed with error: ${err}` });
   }
};