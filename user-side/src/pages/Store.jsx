import React, { useEffect, useState } from "react";
import "./store.css";
// import ReactPaginate from 'react-paginate'

function Store() {

  const [content, setContent] = useState("fückyou");
  

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6",
        {
          method: "GET",
        }
      );
      const products = await response.json();
      setContent(JSON.stringify(products.data.products));
      // content = products.data.products
      // console.log(products.data.products);
    };
    getProducts();
    // console.log(content)
  }, []);

  return (
    <div className="Store" id="Store">
      <div>
        {/* <h1>{JSON.stringify(content[0].fulhausProductName)}</h1> */}
        {/* {setContent(JSON.parse(content))} */}
        {/* <h1>{typeof(content)}</h1> */}
        {/* <h1>{JSON.stringify(content[0].fulhausProductName)}</h1> */}
        {content}
      </div>

      <div>
        {content.length > 0 &&
          content.map((product) => (
            <div key={content._id}>
              <ul>
                <li>{product}</li>
                </ul>
            </div>
          ))}
      </div>

      {/* <div>
        {content.map((product) => {
          return (
            <div>
              <img src={product.imageURLs} />
              </div>
          )
        })}
      </div> */}
    </div>
  );
}

export default Store;
