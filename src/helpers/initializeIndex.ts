import {
   OpenAI,
   Settings,
   SimpleDirectoryReader,
   VectorStoreIndex,
} from "llamaindex";
import dotenv from "dotenv";

dotenv.config();

// initialize llm configuration
Settings.llm = new OpenAI({ model: "gpt-4-32k", temperature: 0 });

export const initializeIndex = async (clientName: string, category: string) => {
   // const directoryPath = `src/indexes/${clientName}/${category}`;
   const directoryPath = `src/indexes`;

   // load data from documents within directory
   const documents = await new SimpleDirectoryReader().loadData({
      directoryPath,
   });

   // convert data from documents to embeddings and store in index
   return await VectorStoreIndex.fromDocuments(documents);
};
