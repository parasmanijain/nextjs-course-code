import { EventList } from "@/components/events/EventList";
import { getFeaturedEvents } from "@/dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <header>
        <nav></nav>
      </header>
      <EventList items={featuredEvents}/>
    </div>
  );
};

export default HomePage;
