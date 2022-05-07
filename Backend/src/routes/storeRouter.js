import express from 'express';
import storeController from '../controllers/storeController.js';


const storeRouter = express.Router();



storeRouter.get('/', storeController.getAllContent);

storeRouter.post ('/', storeController.newContent)

storeRouter.patch ('/:id', storeController.updateContent)

storeRouter.delete ('/:id', storeController.deleteContent)




export default storeRouter;