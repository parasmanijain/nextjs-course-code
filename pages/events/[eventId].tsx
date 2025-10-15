import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { EventSummary } from "@/components/event-detail/EventSummary";
import { EventLogistics } from "@/components/event-detail/EventLogistics";
import { EventContent } from "@/components/event-detail/EventContent";
import { ErrorAlert } from "@/components/ui/ErrorAlert";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading!</p>
      </div>
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export default EventDetailPage;
