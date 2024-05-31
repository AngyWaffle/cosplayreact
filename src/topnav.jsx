import { Route, NavLink, Routes, HashRouter } from "react-router-dom";
import burgerMenu from './script';
import Home from './components/Home';
import Cart from './components/Cart';
import About from './components/About';
import Products from './components/Products';
import "./topnav.css";
import React, { useEffect, useState  } from "react";
import { updateCart } from './components/cartUtils';  // Import the custom update function

function Topnav() {
    const [cartCount, setCartCount] = useState(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        return totalQuantity;
    });

    useEffect(() => {
        const updateCartCount = () => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(totalQuantity);
        };

        // Listen for the custom cart update event
        window.addEventListener('cartUpdated', updateCartCount);

        // Update cart count on component mount
        updateCartCount();

        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);


      return (
        <HashRouter>
            <nav className="topnav">
                <div id="myLinks">
                    <NavLink className="links" to="/"><strong>Home</strong></NavLink>
                    <NavLink className="links" to="/products"><strong>Products</strong></NavLink>
                    <NavLink className="links" to="/about"><strong>About Us</strong></NavLink>
                    <NavLink className="links hover:underline" to="/cart">
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartCount > 0 && (
                  <span className="top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
                )}</NavLink>
                </div>

                <a href="javascript:void(0);" className="icon" onClick={burgerMenu}>
                    <i className="fa fa-bars"></i>
                </a>
            </nav>
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/products" element={<Products />} />
                    <Route exact path="/about"  element={<About />} />
                    <Route exact path="/cart"  element={<Cart />} />
                </Routes>
            </div>
            <footer className="bg-gray-800 p-6">
                  <div className="container mx-auto text-center">
                      <p>Follow us on:</p>
                      <div className="flex justify-center space-x-4 mt-2">
                          <a href="#" className="hover:text-blue-500">Facebook</a>
                          <a href="#" className="hover:text-blue-500">Twitter</a>
                          <a href="#" className="hover:text-blue-500">Instagram</a>
                      </div>
                      <p className="mt-4">&copy; 2024 Dungeon Crawler Cosplay Shop. All rights reserved.</p>
                </div>
            </footer>
        </HashRouter>
    );
  };

export default Topnav;