import Link from "next/link";
import classes from "./EventItem.module.scss";
import { Button } from "../ui/Button";
import { AddressIcon } from "../icons/AddressIcon";
import { DateIcon } from "../icons/DateIcon";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

export const EventItem = ({ title, image, date, location, id }) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon/>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon/>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}><ArrowRightIcon/></span>
            </Button>
        </div>
      </div>
    </li>
  );
};
