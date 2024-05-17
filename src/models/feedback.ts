import mongoose from "mongoose";

interface IFeedback {
   prompt: string;
   response: string;
   score: number;
   systemFile: string;
   isSynced: boolean;
   userId: mongoose.Types.ObjectId;
   clientId: mongoose.Types.ObjectId;
   categoryId: mongoose.Types.ObjectId;
}

// output interface from mongoose
interface FeedbackDoc extends IFeedback, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface FeedbackModelType extends mongoose.Model<IFeedback> {
   build(attr: IFeedback): FeedbackDoc;
}

const feedbackSchema = new mongoose.Schema<IFeedback, FeedbackModelType>(
   {
      prompt: { type: String, required: true },
      response: { type: String, required: true },
      score: { type: Number, required: true },
      systemFile: { type: String, required: true },
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
feedbackSchema.static(
   "build",
   (attr: IFeedback) => new FeedbackModel(attr)
);

export const FeedbackModel = mongoose.model<IFeedback, FeedbackModelType>(
   "Feedback",
   feedbackSchema
);
