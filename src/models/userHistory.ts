import mongoose from "mongoose";

interface IUserHistory {
   userId: mongoose.Types.ObjectId;
   inputPrompt: string;
   outputPrompt: string;
   categoryId: mongoose.Types.ObjectId;
}

// output interface from mongoose
interface UserHistoryDoc extends IUserHistory, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface UserHistoryModelType extends mongoose.Model<IUserHistory> {
   build(attr: IUserHistory): UserHistoryDoc;
}

const userHistorySchema = new mongoose.Schema<
   IUserHistory,
   UserHistoryModelType
>(
   {
      userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
      inputPrompt: { type: String, required: true },
      outputPrompt: { type: String, required: true },
      categoryId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Category" }
   },
   {
      timestamps: true,
   }
);
userHistorySchema.static(
   "build",
   (attr: IUserHistory) => new UserHistoryModel(attr)
);

export const UserHistoryModel = mongoose.model<
   IUserHistory,
   UserHistoryModelType
>("client", userHistorySchema);
