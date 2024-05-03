import express from "express";
import { UserRequestType, createUser, getUserByEmail } from "../db/users.js";
import { authentication, random } from "../helpers/index.js";

export const register = async (
   req: express.Request<{}, {}, UserRequestType>,
   res: express.Response
) => {
   try {
      const { email, username, password } = req.body;

      if (!email || !password || !username) return res.sendStatus(400);

      const existingUser = await getUserByEmail(email);
      if (existingUser) return res.sendStatus(400);

      const salt = random();
      const user = await createUser({
         email,
         username,
         authentication: {
            salt,
            password: authentication(salt, password),
         },
      });

      return res.status(200).json(user).end();
   } catch (err) {
      console.log(err);
      return res.sendStatus(400);
   }
};
