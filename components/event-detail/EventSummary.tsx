import classes from "./EventSummary.module.scss";

export const EventSummary = ({ title }) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};
