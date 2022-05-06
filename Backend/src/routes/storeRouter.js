import express from 'express';
import storeController from '../controllers/storeController';
import verifyToken from '../middlewares/jwtVerify'

const storeRouter = express.Router();



storeRouter.get('/', storeController.getAllContent);

storeRouter.post ('/', storeController.addContent)

storeRouter.patch ('/:id', storeController.updateContent)

storeRouter.delete ('/:id', storeController.deleteContent)




export default storeRouter;