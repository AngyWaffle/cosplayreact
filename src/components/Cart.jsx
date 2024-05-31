// src/CartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { updateCart } from './cartUtils';

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
      axios.get('/products.json')
        .then(response => {
          const products = response.data;
          const cartProducts = cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            return { ...product, quantity: cartItem.quantity };
          });
          setCartProducts(cartProducts);
  
          const totalValue = cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
          setTotal(totalValue);
        })
        .catch(error => {
          console.error('There was an error fetching the products!', error);
        });
    }, []);
  
    const removeFromCart = (id) => {
        const updatedCart = cartProducts.filter(product => product.id !== id);
        setCartProducts(updatedCart);
    
        const updatedLocalStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
        const newLocalStorageCart = updatedLocalStorageCart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newLocalStorageCart));
    
        const totalValue = updatedCart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        setTotal(totalValue);
        updateCart();

/*         const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        var i=0;
        cartItems.forEach(element => {
            i = i + element.quantity
        });
        const cartCount=i; */
      };

      const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return;
    
        const updatedCart = cartProducts.map(product => {
          if (product.id === id) {
            product.quantity = quantity;
          }
          return product;
        });
        setCartProducts(updatedCart);
    
        const updatedLocalStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = updatedLocalStorageCart.findIndex(item => item.id === id);
        if (productIndex > -1) {
          updatedLocalStorageCart[productIndex].quantity = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));
    
        const totalValue = updatedCart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        setTotal(totalValue);

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        var i=0;
        cartItems.forEach(element => {
            i = i + element.quantity
        });
        const cartCount=i;
        updateCart();
      };

  return (
<>
      <main className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center mb-8">Your Cart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartProducts.length > 0 ? (
            cartProducts.map(product => (
              <div key={product.id} className="bg-gray-800 p-6 rounded">
                <img src={product.image} alt={product.name} className="mb-4 rounded" />
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="mb-4">{product.description}</p>
                <label htmlFor={`quantity-${product.id}`} className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${product.id}`}
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="bg-gray-700 text-white p-2 rounded"
                    min="1"
                  />
                <p className="mb-4">${product.price}</p>
                <button onClick={() => removeFromCart(product.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2">Remove</button>
             </div>
            ))
          ) : (
            <p className="text-center w-full">Your cart is empty.</p>
          )}
        </div>
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
        </div>
      </main>
    </>
  );
}

export default Cart;
