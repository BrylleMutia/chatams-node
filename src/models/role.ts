import mongoose from "mongoose";

interface IRole {
   name: string;
}

// output interface from mongoose
interface RoleDoc extends IRole, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface RoleModelType extends mongoose.Model<IRole> {
   build(attr: IRole): RoleDoc;
}

const roleSchema = new mongoose.Schema<IRole, RoleModelType>(
   {
      name: { type: String, required: true, unique: true },
   },
   {
      timestamps: true,
   }
);
roleSchema.static("build", (attr: IRole) => new RoleModel(attr));

export const RoleModel = mongoose.model<IRole, RoleModelType>(
   "Role",
   roleSchema
);
