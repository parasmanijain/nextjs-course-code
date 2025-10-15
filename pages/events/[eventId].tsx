import { EventSummary } from "@/components/event-detail/EventSummary";
import { EventLogistics } from "@/components/event-detail/EventLogistics";
import { EventContent } from "@/components/event-detail/EventContent";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { getEventById, getAllEvents } from "@/helpers/api-util";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found</p>
      </ErrorAlert>
    );
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

export async function getStaticProps({ params }) {
  const eventId = params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths,
    fallback: false
  };
}

export default EventDetailPage;
