import React, { useEffect } from "react";
import useProducts from "../../state/product/hooks/useProducts";

// import List from './components/list';
// import Card from './components/card';

const Home = () => {
  const [product, isLoading, setListProducts] = useProducts();

  useEffect(() => {
    if (!product.list || product.list.length === 0) {
      setListProducts();
    }
  }, [product, setListProducts]);

  return (
    <div>
      {/* <button className="btn btn-primary btn-lg" onClick={setListProducts} type="submit">
        Refresh
      </button>
      <List>
        {product?.list?.map(p => (
          <Card key={p.id}>
            <h1>{p.title}</h1>
            <span>${p.price}</span>
          </Card>
        ))}
      </List> */}
    </div>
  );
};
export default Home;
