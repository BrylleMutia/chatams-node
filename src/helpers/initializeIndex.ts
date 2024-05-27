import { SimpleDirectoryReader, VectorStoreIndex } from "llamaindex";

export const initializeIndex = async (clientName: string, category: string) => {
   const directoryPath = `src/indexes/${clientName}/${category}`;

   // load data from documents within directory
   const documents = await new SimpleDirectoryReader().loadData({
      directoryPath,
   });

   // convert data from documents to embeddings and store in index
   return await VectorStoreIndex.fromDocuments(documents);
};