import fs from "fs/promises";
import path from "path";

const ProductDetailPage = ({ product }) => {
  const { title, description } = product || {};

    if(!product){
      return <p>Loading...</p>
    }
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
};

export async function getStaticProps(context) {
  const { params } = context;
  const { pid } = params;
  const { products } = await getData();
  const product = products.find((productObj) => productObj.id === pid);

  if(!product) {
    return {
        notFound: true
    }
  }
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { products } = await getData();
  const paths = products.map((product) => ({ params: { pid: product.id } }));

  return {
    paths,
    fallback: true,
  };
}

export default ProductDetailPage;
