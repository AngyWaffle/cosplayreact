import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router-dom';
import { updateCart } from './cartUtils';
import { showNotification } from '../script';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    //const { addToCart } = useContext(CartContext);

    useEffect(() => {
      axios.get('/products.json')
        .then(response => {
          setFeaturedProducts(response.data.slice(0, 3));
        })
        .catch(error => {
          console.error('There was an error fetching the products!', error);
        });
      
    }, []);
  

    
    const handleStartShopping = () => {
        navigate('/products');
      };

      const addToCart = (id) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = existingCart.findIndex(item => item.id === id);
        if (productIndex > -1) {
          existingCart[productIndex].quantity += 1;
        } else {
          existingCart.push({ id, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        updateCart();
        showNotification('Added to cart!');
        
      };
        return(
            <>
              <main>
                    <section class="hero bg-cover bg-center h-screen thingy">
                        <div class="flex items-center justify-center h-full bg-black bg-opacity-50">
                            <div class="text-center">
                                <h2 class="text-5xl font-bold mb-4">Welcome to the Dungeon Crawler Cosplay Shop!</h2>
                                <p class="mb-6">Your one-stop shop for all your dungeon crawler cosplay needs. From armor to accessories, we have it all.</p>
                                <button onClick={handleStartShopping} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Start Shopping</button>
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto p-6">
                        <h2 className="text-4xl font-bold text-center mb-8">Featured Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="bg-gray-800 p-6 rounded">
                            <img src={product.image} alt={product.name} className="mb-4 rounded" />
                            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                            <p className="mb-4">{product.description}</p>
                            <p className="mb-4">${product.price}</p>
                            <button onClick={() => addToCart(product.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add to cart</button>
                            </div>
                        ))}
                        </div>
                    </section>

                    <section class="bg-gray-800 p-6">
                        <div class="container mx-auto">
                            <h2 class="text-4xl font-bold text-center mb-8">Customer Testimonials</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div class="bg-gray-900 p-6 rounded">
                                    <p class="mb-4">"The best cosplay shop I've ever found. Their armor is top-notch!"</p>
                                    <p class="font-bold">- Adventurer Alice</p>
                                </div>
                                <div class="bg-gray-900 p-6 rounded">
                                    <p class="mb-4">"I love my new sword! It's perfect for my next convention."</p>
                                    <p class="font-bold">- Warrior Bob</p>
                                </div>
                                <div class="bg-gray-900 p-6 rounded">
                                    <p class="mb-4">"Great quality and fast shipping. Highly recommend!"</p>
                                    <p class="font-bold">- Knight Carol</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="container mx-auto p-6 text-center">
                        <h2 class="text-4xl font-bold mb-4">Join Our Newsletter</h2>
                        <p class="mb-6">Stay updated with our latest products and offers.</p>
                        <form class="flex flex-col items-center">
                            <input type="email" placeholder="Enter your email" class="bg-gray-800 text-white p-2 rounded mb-4 w-1/2"/>
                            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Subscribe</button>
                        </form>
                    </section>
                </main>

            </>
    )
}

export default Home;