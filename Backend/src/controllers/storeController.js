import dotenv from 'dotenv';
import Products from '../models/content.js';
import FuzzySearch from 'fuzzy-search'

dotenv.config();

// Insert New Product

const newProduct = async (req, res) => {
  const { acronym, definition } = req.body;

  if (!acronym || !definition)
    return res.status(400).json({ message: 'Product Info Missing!' });

  // Check for duplicate record 
  const isExistingProduct= await Products.findOne({ acronym }).exec();
  if (isExistingProduct)
    return res.status(400).json({ message: 'Product Info Already Exists!' });

  try {
    // Create and store the new product
    const result = await Products.create({
      acronym,
      definition,
    });

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



// View All Products
const getAllProducts = async (req, res) => {
  const products = await Products.find();
  if (!products) return res.status(200).json([]);
  return res.json(products);
};


//impliments fuzzy search via params
const searchProducts = async (req, res) => {
 const { page, limit, search } =  req.query
  
const allProducts = await Products.find()
const foundItems = new FuzzySearch (allProducts, ['definition', 'acronym'],  {
  caseSensitive: false,
})
const results = foundItems.search(search)

//filters results based on page param and limit param
const numResults = results.length 
if (!numResults) return res.status(404).json({message: 'No Results Found'})
const numPages = (Math.ceil(numResults / limit))
if (page > numPages) {
  return res.status(400).json({message: 'Page Number Not Found'})
}

const resultStartNum = (page - 1) * limit
if ((page * limit - numResults) > 0)
return res.json(results.slice(resultStartNum, resultStartNum + numResults % limit))

return res.json(results.slice(resultStartNum, resultStartNum + 10))

}


// Delete Requested Product
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await Products.findOne({ _id: productId }).exec();

    if (!product) {
      return res.status(404).json({ message: 'Requested Item Does Not Exist!' });
    }
    await product.deleteOne({ _id: productId });

    return res.status(200).json({ success: 'Product Deleted!' });
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(400).json({ message: 'Invalid Product ID' });

    return res.status(500).json({ message: err.message });
  }
};

// Update Requested Content
async function updateProduct(req, res) {
  const { acronym, definition } = req.body;
  const { id: productId } = req.params;

  try {
    // Find content then update
    const result = await Products.findOneAndUpdate(
      { _id: productId },
      { $set: { acronym, definition } },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: 'Product Not Found!' });

    return res.json(result);
  } catch (err) {
    if (err.kind === 'ObjectId')
      return res.status(400).json({ message: 'Invalid Product Id' });

    return res.status(500).json({ message: err.message });
  }
}

export default {
  newProduct,
  getAllProducts,
  searchProducts,
  deleteProduct,
  updateProduct,
};