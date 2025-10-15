import fs from "fs/promises";
import path from "path";

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const { products } = JSON.parse(jsonData);
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

export default HomePage;
