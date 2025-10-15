import { EventList } from "@/components/events/EventList";
import { EventsSearch } from "@/components/events/EventsSearch";
import { getAllEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
