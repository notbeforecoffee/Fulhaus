// GET - Shop Product Page | - Displaying demanded product page with page numbers

//:page points out what page we are on
router.get('/shop/:page', async (req, res, next) => {

    // Declaring variable
    const resPerPage = 10; // results per page
    const page = req.params.page || 1; // Page user is on

    try {
        //only if there is a search query, execute the code
        if (req.query.search) {
            // Declaring query based/search variables
            const searchQuery = req.query.search,
                regex = new RegExp(escapeRegex(req.query.search), 'gi');

            // Find Demanded Products - Skipping page values, limit results per page
            const foundProducts = await Product.find({ name: regex })
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage);

            // Count how many products were found
            const numOfProducts = await Product.count({ name: regex });

            // Renders The Page
            res.render('shop-products.ejs'), {
                products: foundProducts,
                currentPage: page,
                pages: Math.ceil(numOfProducts / resPerPage),
                searchVal: searchQuery,
                numOfResults: numOfProducts
            };
        }
    } catch (err) {
        throw new Error(err);
    }
});


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
  const result = foundItems.search(search)
  return res.status(200).json(result)
  }





// const newProduct = async (req, res) => {
//   const { acronym, definition } = req.body;

//   if (!acronym || !definition)
//     return res.status(400).json({ message: 'Product Info Missing!' });

//   // Check for duplicate record - requirements TBD
//   // For now, it checks the acronym
//   const isExistingProduct= await Products.findOne({ acronym }).exec();
//   if (isExistingProduct)
//     return res.status(400).json({ message: 'Product Info Already Exists!' });

//   try {
//     // Create and store the new product
//     const result = await Products.create({
//       acronym,
//       definition,
//     });

//     return res.status(201).json(result);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
  
// const searchProducts = async (req, res) => {
//     const { someSearchVariable } =  req.query
     
//    const allProducts = await Products.find()
//    const searcher = new FuzzySearch (allProducts, ['definition'], {
//      caseSensitive: false,
//    })
//    const result = searcher.search(someSearchVariable)
//    return res.status(200).json(result)
//    }