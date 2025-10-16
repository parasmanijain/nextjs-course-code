import Head from 'next/head';
import { getFeaturedEvents } from "@/helpers/api-util";
import { EventList } from "@/components/events/EventList";
import { NewsletterRegistration } from '@/components/input/NewsletterRegistration';

const HomePage = ({ events }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve.'/>
      </Head>
      <NewsletterRegistration/>
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
    revalidate: 1800,
  };
}

export default HomePage;
