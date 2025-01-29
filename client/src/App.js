import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Characteristic from "./components/Characteristic.js";

const BASE_API_URL = "http://localhost:3005";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This initial data fetch is just to verify your setup is working.
  // Feel free to modify or remove it as you build your solution.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = filters.length ? `?characteristic=${filters.join(',')}` : '';
        const response = await axios.get(`${BASE_API_URL}/products${query}`);
        setProducts(response.data);
        setLoading(false);
        console.log('Products loaded:', response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
        setError('Oops! Something went wrong');
      }
    };

    fetchProducts();
  }, [filters, loading]);

  const handlClick = (event) => {
    const name = event.target.name;
    let newFilters = [...filters];
    if(!filters.includes(name)) {
      newFilters.push(name);
    }else{
      const indexOfName = filters.indexOf(name);
      if(indexOfName > -1){
        newFilters.splice(indexOfName, 1);
      }else{
        newFilters = [];
      }
    } 

    setFilters(newFilters);
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Product Compass</h1>
      </header>
      <div className="message">Welcome! Select one or more characteristics to filter by.</div>
      <div className="product-grid">
        {
          loading ? <div>Loading...</div> 
            : 
            error ? <div>{error}</div> 
              : 
                products.map((product, index) => (
                  <div key={index} className="product-item">
                    <h3>{product.name}</h3>
                    <h5>
                      <span>Score: {" "}</span>
                      {product.score}
                    </h5>
                    {product.characteristics.map((char, charIndex) => (
                      <Characteristic 
                        key={charIndex} 
                        char={char} 
                        handlClick={handlClick} 
                        isSelected={filters.includes(char)} />
                    ))}
                  </div>
          ))
        }
      </div>
    </div>
  );
};

export default App;
