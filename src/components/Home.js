import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem.js';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(`/api/v1/products`);
      setProducts(data?.products);
    }

    fetchProducts();
  }, []);

  return (
    <div className="mx-32">
      <h1 className="text-3xl text-blue-500 font-bold mb-5">
        Popular Products
      </h1>

      <div className="grid grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
