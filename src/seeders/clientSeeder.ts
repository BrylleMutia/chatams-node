import { createClientDirectory } from "../helpers/categoryIndexing.js";
import { ClientModel } from "../models/client.js";
import { initializeCategory } from "./categorySeeder.js";

export const initializeClients = async () => {
   const clients = [
      "DEV",
      "CLIENT1",
      "CLIENT2",
      "CLIENT3",
      "CLIENT4",
      "CLIENT5",
      "CLIENT6",
      "CLIENT7",
      "CLIENT8",
      "CLIENT9",
      "CLIENT10",
   ];

   for (const client of clients) {
      const existingClient = await ClientModel.findOne({
         name: client.toUpperCase(),
      }).exec();
      if (existingClient) break;

      const newClient = ClientModel.build({
         name: client.toUpperCase(),
      });

      await newClient.save();

      initializeCategory(newClient._id);
      createClientDirectory(newClient.name);

      console.log(`Created initial client: ${newClient.name} `);
   }
};
