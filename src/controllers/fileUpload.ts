import express from "express"


export const uploadFile = async (req: express.Request, res: express.Response) => {
   try {
      const userId = req.params.userId
      const category = req.params.category

      // get file from request
      const files = req.files["docs"]
      for(const file of files)

   }
}