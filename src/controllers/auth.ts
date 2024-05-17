import express from "express";
import { UserModel } from "../models/user.js";
import { authentication, random } from "../helpers/index.js";
import { ClientModel } from "../models/client.js";
import mongoose from "mongoose";

export const register = async (req: express.Request, res: express.Response) => {
   try {
      const { email, username, password, client_id } = req.body;

      if (!email || !password || !username) return res.sendStatus(400);

      // check if user email exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser)
         return res
            .status(400)
            .json({ message: "User already exists", id: existingUser._id })
            .end();

      // check if client exists
      const existingClient = await ClientModel.findById(client_id);
      if (!existingClient)
         return res.status(400).json({ message: "Client not found" }).end();

      const salt = random();
      const user = await UserModel.build({
         email,
         username,
         authentication: {
            password: authentication(salt, password),
            salt,
         },
         clientId: client_id,
         isApproved: true,
         roleId: new mongoose.mongo.ObjectId("2"), // admin role id
      }).save();

      return res.status(200).json({ data: user }).end();
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `User auth failed with error: ${err}` })
         .end();
   }
};

export const login = async (req: express.Request, res: express.Response) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) return res.sendStatus(400);

      // check if user email exists
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser)
         return res
            .status(400)
            .json({ message: "Incorrect email or password" })
            .end();

      // check if password matched
      const password_hash = authentication(
         existingUser.authentication.salt,
         password
      );
      if (existingUser.authentication.password !== password_hash)
         return res
            .status(400)
            .json({ message: "Incorrect email or password" })
            .end();

      // populate client details
      existingUser.populate("client");

      return res.status(200).json({ data: existingUser }).end();
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `User auth failed with error: ${err}` })
         .end();
   }
};

// handle approvals for new users
export const toggleApprovals = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const { toggled_user_ids } = req.body;
      const clientId = req.body.params.clientId;

      if (toggled_user_ids.length < 1)
         return res
            .status(400)
            .json({ message: "No user IDs to update approval" });

      let updatedUserIds = [];
      for (const userId of updatedUserIds) {
         const user = await UserModel.findOne({
            _id: userId,
            clientId: clientId,
         });
         user.isApproved = !user.isApproved; // toggle
         user.save();

         updatedUserIds.push(user._id);
      }

      return res.status(200).json({ data: updatedUserIds }).end();
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `User approval failed with error: ${err}` })
         .end();
   }
};

export const getUserDetails = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const userId = req.params.id;

      const existingUser = await UserModel.findById(userId);
      if (!existingUser)
         return res.status(400).json({ message: "User doesn't exist" }).end();

      existingUser.populate("client");

      return res.status(200).json({ data: existingUser }).end();
   } catch (err) {
      console.log(err);
      return res
         .status(400)
         .json({ error: `Get user details failed with error: ${err}` });
   }
};

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

export const deleteUser = async (
   req: express.Request,
   res: express.Response
) => {
   try {
      const userId = req.params.id;

      if (!userId) return res.sendStatus(400);

      const existingUser = await UserModel.findById(userId);
      if (!existingUser)
         return res.status(400).json({ message: "User doesn't exist" }).end();

      const deletedUser = await UserModel.findByIdAndDelete(userId);

      return res.status(200).json(deletedUser).end();
   } catch (err) {
      console.log(err);
      return res.sendStatus(400);
   }
};
