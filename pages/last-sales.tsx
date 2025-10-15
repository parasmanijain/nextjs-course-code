import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const LastSalesPage = () => {
  const [sales, setSales] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error, isLoading } = useSWR(
    "https://nextjs-course-44d17-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   const getData = async () => {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       "https://nextjs-course-44d17-default-rtdb.firebaseio.com/sales.json"
  //     );
  //     const data = await response.json();
  //     setIsLoading(false);
  //     const transformedSales = [];
  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume,
  //       });
  //     }
  //     setSales(transformedSales);
  //   };
  //   useEffect(() => {
  //     getData();
  //   }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Failed to load.</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
