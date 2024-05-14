import express from "express";
import { UserModel } from "../models/users.js";
import { authentication, random } from "../helpers/index.js";

export const register = async (req: express.Request, res: express.Response) => {
   try {
      const { email, username, password } = req.body;

      if (!email || !password || !username) return res.sendStatus(400);

      const existingUser = await UserModel.findOne({ email });
      if (existingUser)
         return res
            .status(400)
            .json({ message: "User already exists", id: existingUser._id })
            .end();

      const salt = random();
      const user = await UserModel.build({
         email,
         username,
         authentication: {
            password: authentication(salt, password),
            salt,
         },
      }).save();

      console.log(user.created_at);
      console.log(user.updated_at);

      return res.status(200).json(user).end();
   } catch (err) {
      console.log(err);
      return res.sendStatus(400);
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

      return res.status(200).json(existingUser).end();
   } catch (err) {
      console.log(err);
      return res.sendStatus(400);
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
