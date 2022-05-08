import express from 'express';
import storeController from '../controllers/storeController.js';


const storeRouter = express.Router();



storeRouter.get('/', storeController.getAllProducts);

storeRouter.get('/search', storeController.searchProducts);

storeRouter.post ('/', storeController.newProduct)

storeRouter.patch ('/:id', storeController.updateProduct)

storeRouter.delete ('/:id', storeController.deleteProduct)




export default storeRouter;