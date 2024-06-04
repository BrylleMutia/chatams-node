import mongoose from "mongoose";

interface ICategory {
   name: string;
   clientId: mongoose.Types.ObjectId;
   needIndex?: boolean;
}

// output interface from mongoose
interface CategoryDoc extends ICategory, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface CategoryModelType extends mongoose.Model<ICategory> {
   build(attr: ICategory): CategoryDoc;
}

const categorySchema = new mongoose.Schema<ICategory, CategoryModelType>(
   {
      name: { type: String, required: true },
      clientId: {
         type: mongoose.SchemaTypes.ObjectId,
         required: true,
         ref: "Client",
      },
      needIndex: { type: Boolean, required: false, default: true },
   },
   {
      timestamps: true,
   }
);
categorySchema.static("build", (attr: ICategory) => new CategoryModel(attr));

export const CategoryModel = mongoose.model<ICategory, CategoryModelType>(
   "Category",
   categorySchema
);
