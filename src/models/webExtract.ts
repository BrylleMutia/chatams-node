import mongoose from "mongoose";

interface IWebExtract {
   url: string;
   content: string;
   userFile: string;
   isSynced: boolean;
   userId: mongoose.Types.ObjectId;
   clientId: mongoose.Types.ObjectId;
   categoryId: mongoose.Types.ObjectId;
}

// output interface from mongoose
interface WebExtractDoc extends IWebExtract, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface WebExtractModelType extends mongoose.Model<IWebExtract> {
   build(attr: IWebExtract): WebExtractDoc;
}

const webExtractSchema = new mongoose.Schema<IWebExtract, WebExtractModelType>(
   {
      url: { type: String, required: true },
      content: { type: String, required: true },
      userFile: { type: String, required: true },
      isSynced: { type: Boolean, required: true },
      clientId: {
         type: mongoose.SchemaTypes.ObjectId,
         required: true,
         ref: "Client",
      },
      userId: {
         type: mongoose.SchemaTypes.ObjectId,
         required: true,
         ref: "User",
      },
      categoryId: {
         type: mongoose.SchemaTypes.ObjectId,
         required: true,
         ref: "Category",
      },
   },
   {
      timestamps: true,
   }
);
webExtractSchema.static(
   "build",
   (attr: IWebExtract) => new WebExtractModel(attr)
);

export const WebExtractModel = mongoose.model<
   IWebExtract,
   WebExtractModelType
>("WebExtract", webExtractSchema);
