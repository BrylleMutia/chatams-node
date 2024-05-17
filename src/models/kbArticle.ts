import mongoose from "mongoose";

interface IKBArticle {
   articleId: string;
   title: string;
   userFile: string;
   isSynced: boolean;
   clientId: mongoose.Types.ObjectId;
   categoryId: mongoose.Types.ObjectId;
}

// output interface from mongoose
interface WebExtractDoc extends IKBArticle, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface WebExtractModelType extends mongoose.Model<IKBArticle> {
   build(attr: IKBArticle): WebExtractDoc;
}

const webExtractSchema = new mongoose.Schema<IKBArticle, WebExtractModelType>(
   {
      articleId: { type: String, required: true },
      title: { type: String, required: true },
      userFile: { type: String, required: true },
      isSynced: { type: Boolean, required: true },
      clientId: {
         type: mongoose.SchemaTypes.ObjectId,
         required: true,
         ref: "Client",
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
   (attr: IKBArticle) => new WebExtractModel(attr)
);

export const WebExtractModel = mongoose.model<IKBArticle, WebExtractModelType>(
   "WebExtract",
   webExtractSchema
);
