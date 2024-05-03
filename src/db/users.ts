import mongoose from "mongoose";

export type UserRequestType = mongoose.Document & {
   username: string;
   email: string;
   password: string;
};

export type UserModelType = mongoose.Document & {
   username: string;
   email: string;
   authentication: {
      password: string;
      salt?: string;
      sessionToken?: string;
   };
};

const UserSchema = new mongoose.Schema<UserModelType>({
   username: { type: String, required: true },
   email: { type: String, required: true },
   authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
   },
});

export const UserModel = mongoose.model<UserModelType>("User", UserSchema);

// actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
   UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById({ _id: id });
export const createUser = (values: Record<string, any>) =>
   new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
   UserModel.findByIdAndUpdate(id, values);
