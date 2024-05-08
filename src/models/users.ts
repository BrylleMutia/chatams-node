import mongoose from "mongoose";

// input interface to mongoose
interface IUser {
   username: string;
   email: string;
   authentication: {
      password: string;
      salt?: string;
      sessionToken?: string;
   };
}

// output interface from mongoose
interface UserDoc extends IUser, mongoose.Document {
   created_at: Date;
   updated_at: Date;
}

// Put all user instance methods in this interface (statics)
interface UserModelType extends mongoose.Model<IUser> {
   build(attr: IUser): UserDoc;
}

const UserSchema = new mongoose.Schema<IUser, UserModelType>(
   {
      username: { type: String, required: true },
      email: { type: String, required: true },
      authentication: {
         password: { type: String, required: true, select: false },
         salt: { type: String, select: false },
         sessionToken: { type: String, select: false },
      },
   },
   { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
UserSchema.static("build", (attr: IUser) => new UserModel(attr));

// attach User interface and UserModel interface
export const UserModel = mongoose.model<IUser, UserModelType>(
   "User",
   UserSchema
);
