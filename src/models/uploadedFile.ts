import mongoose from "mongoose";

interface IUploadedFile {
   path: string;
   systemFile: string;
   userFile: string;
   isSynced: boolean;
   userId: mongoose.Types.ObjectId;
   clientId: mongoose.Types.ObjectId;
   categoryId: mongoose.Types.ObjectId;
}

// output interface from mongoose
interface UploadedFileDoc extends IUploadedFile, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface UploadedFileModelType extends mongoose.Model<IUploadedFile> {
   build(attr: IUploadedFile): UploadedFileDoc;
}

const uploadedFileSchema = new mongoose.Schema<
   IUploadedFile,
   UploadedFileModelType
>(
   {
      path: { type: String, required: true },
      systemFile: { type: String, required: true },
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
uploadedFileSchema.static(
   "build",
   (attr: IUploadedFile) => new UploadedFileModel(attr)
);

export const UploadedFileModel = mongoose.model<
   IUploadedFile,
   UploadedFileModelType
>("UploadedFile", uploadedFileSchema);
