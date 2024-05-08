import express from "express";
import { UserModel } from "../models/users.js";
import { authentication, random } from "../helpers/index.js";

export const register = async (req: express.Request, res: express.Response) => {
   try {
      const { email, username, password } = req.body;

      if (!email || !password || !username) return res.sendStatus(400);

      const existingUser = await UserModel.findOne({ email });
      if (existingUser)
         return res.status(400).json({ message: "User already exists" }).end();

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
