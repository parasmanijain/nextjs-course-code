import useSWR from "swr";
import { EventList } from "@/components/events/EventList";
import { ResultsTitle } from "@/components/events/ResultsTitle";
import { Button } from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json())

const FilteredEventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const filterData = router.query.slug;

  const { data, error, isLoading } = useSWR(
    "https://nextjs-course-44d17-default-rtdb.firebaseio.com/events.json"
  ,fetcher);

  useEffect(() => {
    if (data) {
      const eventList = [];
      for (const key in data) {
        eventList.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(eventList);
    }
  }, [data]);

  if (!events || !filterData || isLoading) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2025 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 || error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter.Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // if (hasError) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>Invalid Filter.Please adjust your values!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Events found for the choden filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  // const { year, month } = date;
   const dateObj = new Date(numYear, numMonth - 1);
  return (
    <>
      <Head>
          <title>Filtered Events</title>
          <meta name="description" content={`All events for ${numMonth}/${numYear}.`} />
        </Head>
      <ResultsTitle date={dateObj} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps({ params }) {
//   const filterData = params.slug;
//   if (!filterData) {
//     return <p className="center">Loading...</p>;
//   }

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2025 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
