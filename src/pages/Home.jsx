import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const $URL = "https://fakestoreapi.com/products/category/women's%20clothing";
  const [loading, setLoading] = useState(true);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch($URL);
      const data = await response.json();
      setProducts(data);
      console.log(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>TrendyThreads</h1>
      <p>Welcome All to Trendy Threads</p>
      <ul className="">
        {loading ? (
          <p>Loading..</p>
        ) : (
          product.map((item) => (
            <li key={item.id}>
              <div>
                <img src={item.image} alt="Image" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
