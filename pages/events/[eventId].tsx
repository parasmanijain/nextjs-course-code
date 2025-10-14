import { useRouter } from "next/router";
import { getEventById } from "@/dummy-data";
import { EventSummary } from "@/components/event-detail/EventSummary";
import { EventLogistics } from "@/components/event-detail/EventLogistics";
import { EventContent } from "@/components/event-detail/EventContent";

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);
  if (!event) {
    return <p>No Event Found</p>;
  }
  const { title, description, date, image, id, location } = event;
  return (
    <div>
      <>
        <EventSummary title={title} />
        <EventLogistics
          date={date}
          address={location}
          image={image}
          imageAlt={title}
        />
        <EventContent>
          <p>{description}</p>
        </EventContent>
      </>
    </div>
  );
};

export default EventDetailPage;
