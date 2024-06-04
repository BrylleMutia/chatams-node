import express from "express";
import { UserModel } from "../models/user.js";
import { ClientModel } from "../models/client.js";
import { initializeCategoryInDB } from "../seeders/categorySeeder.js";
import {
   createCategoryIndex,
   createClientDirectory,
} from "../helpers/categoryIndexing.js";

export const getUsersInClient = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const clientId = req.params.clientId;

      const existingUsers = await UserModel.find({ clientId });

      if (existingUsers.length < 1)
         return res
            .status(400)
            .json({ message: "No existing users for client" })
            .end();

      return res.status(200).json({ data: existingUsers }).end();
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Get users failed with error: ${err}` });
   }
};

export const addNewClient = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const clientName = req.body.clientName;

      const client = await ClientModel.build({
         name: clientName.toUpperCase(),
      }).save();

      // add new category records for client in db
      initializeCategoryInDB(client.id).then(() => {
         // create file structure for client + indexes
         createClientDirectory(client.name).then(() => {
            createCategoryIndex(client.id);
         });
      });

      return res.status(200).json({ data: client });
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Add new client failed with error: ${err}` });
   }
};

export const getClientDetails = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const clientId = req.params.clientId;
      const client = await ClientModel.findById(clientId).exec();

      return res.status(200).json({ data: client });
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Get client details failed with error: ${err}` });
   }
};

export const getAllClientDetails = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const client = await ClientModel.find({}).exec();

      return res.status(200).json({ data: client });
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Get client details failed with error: ${err}` });
   }
};
