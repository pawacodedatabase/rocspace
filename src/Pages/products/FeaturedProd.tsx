import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];



}const BIN_ID = "6864f0d78960c979a5b5b7ad";
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";
const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

const FeaturedProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch products from JSONBin
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
      setProducts(response.data.record);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Pick 4 random products
  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-6 font-riss">Featured Products</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 p-5">
          {/* Skeleton Loader */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 animate-pulse h-[500px] rounded-lg overflow-hidden"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 font-graffiti"> <span className='text-red-500'>Featured </span>
         Products</h2>
    
  <div className="flex justify-center">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 max-w-7xl w-full">
    {randomProducts.map((product: Product) => (
      <div
        key={product.id}
        className="group relative bg-white border border-gray-200 rounded-md overflow-hidden shadow-md transition-transform duration-300  w-full max-w-[350px] mx-auto"
      >
        {/* Image Swap on Hover */}
        <Link to={`/product/${product.id}`} className="block relative w-full h-[500px]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alt`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </Link>

       
<div className='flex px-4 justify-between mb-4 mt-4'>
        {/* Product Name */}
        <p className="text-center text-black text-xs tracking-wide">{product.name.toUpperCase()}</p>

        {/* Price */}
        <p className="text-center text-[#111] text-sm font-bold ">
          {typeof product.price === 'number'
            ? `$${product.price.toLocaleString()}`
            : 'Price Unavailable'}

          {typeof product.originalPrice === 'number' && (
            <span className="text-gray-500 text-xs line-through ml-2">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </p>
</div>

      </div>
    ))}
  </div>
</div>

              <div className="flex justify-center">
  <Link to="/shop">
    <button className="bg-black text-white p-4 mb-5">View All Products</button>
  </Link>
</div>
    </div>
  );
};

export default FeaturedProduct;
