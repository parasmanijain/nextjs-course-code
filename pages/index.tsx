import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const { products } = JSON.parse(jsonData);

  if (!products) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (products.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

export default HomePage;
