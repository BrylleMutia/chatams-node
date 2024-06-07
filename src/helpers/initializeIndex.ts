import {
   OpenAI,
   Settings,
   SimpleDirectoryReader,
   storageContextFromDefaults,
   VectorStoreIndex,
   OpenAIEmbedding,
   serviceContextFromDefaults,
} from "llamaindex";
import dotenv from "dotenv";
import type { LLMConfig } from "./types.js";

dotenv.config();

const LLM_CONFIG: LLMConfig = {
   model: process.env.AZURE_OPENAI_GPT4_ENGINE_MODEL,
   temperature: 0.5,
};

// initialize llm configuration
// ref: https://github.com/kimtth/chat-llamaindex-azure-openai/blob/main/app/api/llm/route.ts
const embedding = new OpenAIEmbedding({
   azure: { deploymentName: process.env.OPENAI_EMBED_ENGINE_DEPLOYMENT },
});
const llm = new OpenAI({
   azure: {
      apiKey: process.env.AZURE_OPENAI_KEY,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION,
      deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
   },
   model: LLM_CONFIG.model,
   temperature: LLM_CONFIG.temperature,
});

export const createIndex = async (clientName: string, category: string) => {
   const docsPath = `docs/${clientName}/${category}`;
   const indexPath = `indexes/${clientName}/${category}`;

   // Split text and create embeddings. Store them in a VectorStoreIndex
   const serviceContext = serviceContextFromDefaults({
      llm: llm,
      embedModel: embedding,
   });
   // persist the vector store automatically with the storage context
   const storageContext = await storageContextFromDefaults({
      persistDir: indexPath,
   });

   // load data from documents within directory
   const documents = await new SimpleDirectoryReader().loadData({
      directoryPath: docsPath,
   });

   //! V1
   // // convert data from documents to embeddings and store in index
   // const index = await VectorStoreIndex.fromDocuments(documents);
   // // save created index to directory (persist)
   // index.storageContext.indexStore.persist(indexPath);

   //! V2
   const index = await VectorStoreIndex.fromDocuments(documents, {
      storageContext,
      serviceContext,
   });

   return index;
};

export const loadIndex = async (
   query: string,
   clientName: string,
   category: string
) => {
   // TODO: How to prompt data outside of context
   const indexPath = `indexes/${clientName}/${category}`;

   // load the index
   const secondServiceContext = serviceContextFromDefaults({
      llm: llm,
      embedModel: embedding,
   });
   const secondStorageContext = await storageContextFromDefaults({
      persistDir: indexPath,
   });

   const loadedIndex = await VectorStoreIndex.init({
      storageContext: secondStorageContext,
      serviceContext: secondServiceContext,
   });

   const loadedQueryEngine = loadedIndex.asQueryEngine();
   const loadedResponse = await loadedQueryEngine.query({ query });
   console.log(loadedResponse.toString());

   return loadedResponse.toString();
};
