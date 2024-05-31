import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { updateCart } from './cartUtils';
import { closeBurger, showNotification } from '../script';


function Products() {
  closeBurger();
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  const addToCart = (id) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = existingCart.findIndex(item => item.id === id);
    if (productIndex > -1) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push({ id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));

/*     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQuantity); */
    showNotification('Added to cart!');
    updateCart();
  };

  useEffect(() => {
    axios.get('/products.json')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });

      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
  }, []);
        return(
            <>
            <main className="container mx-auto p-6">
            <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-gray-800 p-6 rounded">
                  <img src={product.image} alt={product.name} className="mb-4 rounded" />
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="mb-4">{product.description}</p>
                  <p className="mb-4">${product.price}</p>
                  <button onClick={() => addToCart(product.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add to cart</button>
                </div>
              ))}
            </div>
          </main>
          </>

        )
}

export default Products;