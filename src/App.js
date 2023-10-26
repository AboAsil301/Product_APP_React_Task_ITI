import React, { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Products from "./Pages/Products";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Cart from "./Pages/Cart";
// import NotFound from "./Pages/NotFound";
// import ProductDetails from "./components/ProductDetails"; // Import the ProductDetails component
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";

const Navbar = lazy(() => import("./components/Navbar"));
const Products = lazy(() => import("./Pages/Products"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Cart = lazy(() => import("./Pages/Cart"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data from the provided API
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Router>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Products products={products} />} />{" "}
              {/* Set the Products page as the default route */}
              <Route
                path="/products"
                element={<Products products={products} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              {/* Route for displaying product details */}
              <Route path="/product/:id" element={<ProductDetails />} />
              {/* NotFound route should be the last one */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </ThemeProvider>
      </Router>
    </Suspense>
  );
}

export default App;
