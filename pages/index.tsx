import { getFeaturedEvents } from "@/helpers/api-util";
import { EventList } from "@/components/events/EventList";

const HomePage = ({ events }) => {
  return (
    <div>
      <header>
        <nav></nav>
      </header>
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      events,
    },
  };
}

export default HomePage;
