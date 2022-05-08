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





const newProduct = async (req, res) => {
    const { acronym, definition } = req.body;
  
    if (!acronym || !definition)
      return res.status(400).json({ message: 'Product Info Missing!' });
  
    // Check for duplicate record - requirements TBD
    // For now, it checks the acronym
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

  const newProduct = async (req, res) => {
    let productArray = req.body
    let acronym = ''
    let definition = ''
    
    productArray.forEach(product => {
      acronym = product.acronym
      definition = product.definition
  
  
      if (!acronym || !definition)
        return res.status(400).json({ message: 'Product Info Missing!' });
  
      // Check for duplicate record - requirements TBD
      // For now, it checks the acronym
      const isExistingProduct = await Products.findOne({ acronym }).exec();
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
    })
  };
  
  