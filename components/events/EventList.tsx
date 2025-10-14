import { EventItem } from "./EventItem";
import classes from './EventList.module.scss';

export const EventList = ({ items }) => {
  return (
    <ul>
      {items.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
};
