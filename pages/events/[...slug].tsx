import { EventList } from "@/components/events/EventList";
import { ResultsTitle } from "@/components/events/ResultsTitle";
import { Button } from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";

const FilteredEventsPage = ({ hasError,filteredEvents, date }) => {
  // const router = useRouter();
  // const filterData = router.query.slug;
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (hasError) {
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
  const {year, month} = date;
  const dateObj = new Date(year, month - 1);
  return (
    <>
      <ResultsTitle date={dateObj} />
      <EventList items={filteredEvents} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const filterData = params.slug;
  if (!filterData) {
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
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }
    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      filteredEvents,
      date:{
        year:numYear,
        month:numMonth
      }
    },
  };
}

export default FilteredEventsPage;
