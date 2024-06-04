import {
   OpenAI,
   Settings,
   SimpleDirectoryReader,
   storageContextFromDefaults,
   VectorStoreIndex,
   AzureOpenAI,
} from "llamaindex";
import dotenv from "dotenv";

dotenv.config();


// TODO: Fix invalid API error on chat trial
// const llm = new AzureOpenAI(
//    api_key
// );

// (model = os.getenv("OPENAI_GPT4_32K_ENGINE_MODEL")),
//    (deployment_name = os.getenv("OPENAI_GPT4_32K_ENGINE_DEPLOYMENT")),
//    (api_key = os.getenv("OPENAI_API_KEY")),
//    (azure_endpoint = os.getenv("OPENAI_API_BASE")),
//    (api_version = os.getenv("OPENAI_API_VERSION")),
//    (temperature = 0.5)

// initialize llm configuration
Settings.llm = new OpenAI({ model: "gpt-4-32k", temperature: 0 });

export const createIndex = async (clientName: string, category: string) => {
   const docsPath = `docs/${clientName}/${category}`;
   const indexPath = `indexes/${clientName}/${category}`;

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
   // Split text and create embeddings. Store them in a VectorStoreIndex
   // persist the vector store automatically with the storage context
   const storageContext = await storageContextFromDefaults({
      persistDir: indexPath,
   });
   const index = await VectorStoreIndex.fromDocuments(documents, {
      storageContext,
   });

   return index;
};

export const loadIndex = async (
   query: string,
   clientName: string,
   category: string
) => {
   const indexPath = `src/indexes/${clientName}/${category}`;

   //! V1
   // // Query the index
   // const queryEngine = index.asQueryEngine();
   // const response = await queryEngine.query({ query });

   // // Output response
   // console.log(response.toString());

   //! V2
   // load the index
   // TODO: Try both implementation and determine the difference with above
   const secondStorageContext = await storageContextFromDefaults({
      persistDir: indexPath,
   });
   const loadedIndex = await VectorStoreIndex.init({
      storageContext: secondStorageContext,
   });
   const loadedQueryEngine = loadedIndex.asQueryEngine();
   const loadedResponse = await loadedQueryEngine.query({ query });
   console.log(loadedResponse.toString());

   return loadedResponse.toString();
};
