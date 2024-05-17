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
   clientId: mongoose.Types.ObjectId;
   roleId: mongoose.Types.ObjectId;
   isApproved: boolean;
}

// output interface from mongoose
interface UserDoc extends IUser, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface UserModelType extends mongoose.Model<IUser> {
   build(attr: IUser): UserDoc;
}

const UserSchema = new mongoose.Schema<IUser, UserModelType>(
   {
      username: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, unique: true },
      authentication: {
         password: { type: String, required: true, select: false },
         salt: { type: String, select: false },
         sessionToken: { type: String, select: false },
      },
      clientId: {
         type: mongoose.SchemaTypes.ObjectId,
         required: true,
         ref: "Client",
      },
      roleId: {
         type: mongoose.SchemaTypes.ObjectId,
         required: true,
         ref: "Role",
      },
      isApproved: { type: Boolean, required: true, default: true },
   },
   { timestamps: true }
);
UserSchema.static("build", (attr: IUser) => new UserModel(attr));

// attach User interface and UserModel interface
export const UserModel = mongoose.model<IUser, UserModelType>(
   "User",
   UserSchema
);

// TODO: Add controllers / blueprints
// TODO: Add routers
// TODO: How to track objects that need indexing (prev was using separate model)
