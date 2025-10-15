import { products } from "../data/dummy-backend.json";

function HomePage({ products }) {
  return (
    <ul>
      {products && products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products,
    },
  };
}

export default HomePage;
