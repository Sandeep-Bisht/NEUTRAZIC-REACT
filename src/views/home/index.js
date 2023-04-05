import React, { useEffect } from "react";
import useProducts from "../../state/product/hooks/useProducts";


const Home = () => {
  const [product, isLoading, setListProducts] = useProducts();

  useEffect(() => {
    if (!product.list || product.list.length === 0) {
      setListProducts();
    }
  }, [product, setListProducts]);

  return (
    <div>
    </div>
  );
};
export default Home;
