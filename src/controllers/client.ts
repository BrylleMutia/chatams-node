import express from "express";
import { UserModel } from "../models/user.js";
import { ClientModel } from "../models/client.js";

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

      return res.status(200).json({ data: client });
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Add new client failed with error: ${err}` });
   }
};
