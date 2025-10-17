import Image from "next/image";
import classes from "./PostHeader.module.scss";

export const PostHeader = ({ title, image }) => {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image
        src={image}
        alt={title}
        width={200}
        height={150}
        style={{ width: "100%", height: "auto" }}
        priority
      />
    </header>
  );
};
