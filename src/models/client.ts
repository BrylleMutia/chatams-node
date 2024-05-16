import mongoose from "mongoose";

interface IClient {
   name: string;
   openAiKey: string;
}

// output interface from mongoose
interface ClientDoc extends IClient, mongoose.Document {
   createdAt: Date;
   updatedAt: Date;
}

// Put all user instance methods in this interface (statics)
interface ClientModelType extends mongoose.Model<IClient> {
   build(attr: IClient): ClientDoc;
}

const clientSchema = new mongoose.Schema<IClient, ClientModelType>(
   {
      name: { type: String, required: true },
      openAiKey: { type: String, required: false },
   },
   {
      timestamps: true,
   }
);
clientSchema.static("build", (attr: IClient) => new ClientModel(attr));

export const ClientModel = mongoose.model<IClient, ClientModelType>(
   "client",
   clientSchema
);
