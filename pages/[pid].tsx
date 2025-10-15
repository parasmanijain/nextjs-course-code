import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ product }) => {
  const { title, description } = product;
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const { pid } = params;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const { products } = JSON.parse(jsonData);
  const product = products.find((productObj) => productObj.id === pid);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
       {
        params: {
          pid: "p2",
        },
      },
       {
        params: {
          pid: "p3",
        },
      },
    ],
    fallback: false
  };
}

export default ProductDetailPage;
