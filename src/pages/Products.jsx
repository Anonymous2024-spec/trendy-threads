import { useState } from "react";
import ProductList from "../components/ProductList";
import { productsData } from "../data/products";

export default function Products() {
  const [products, setProducts] = useState(productsData);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <div>
      <ProductList products={products} onUpdateProduct={handleUpdateProduct} />
    </div>
  );
}
