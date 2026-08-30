import { useEffect, useState } from "react";
import ProductCard from "../components/ProducCard.jsx";

const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect (() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="hero-banner">
          <h1>Welcome to Vebdora Mall</h1>
          <p>Discover the best products at unbeatable prices.</p>
        </div>
        <h2>Featured Products</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;