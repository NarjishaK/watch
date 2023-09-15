import React from 'react'
import  { useState } from 'react';

function whishlist() {
    const initialProducts = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
      ];
    
      const [products, setProducts] = useState(initialProducts);
      const [wishlist, setWishlist] = useState([]);
    
      // Function to add a product to the wishlist
      const addToWishlist = (product) => {
        if (!wishlist.includes(product)) {
          setWishlist([...wishlist, product]);
        }
      };
    
      // Function to remove a product from the wishlist
      const removeFromWishlist = (product) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
        setWishlist(updatedWishlist);
      };
  return (
    <>
    <div>
      <h1>Product Wishlist</h1>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
          </li>
        ))}
      </ul>

      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => removeFromWishlist(product)}>Remove from Wishlist</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default whishlist