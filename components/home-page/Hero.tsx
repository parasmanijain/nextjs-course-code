import Image from "next/image";
import classes from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={`/images/site/paras.jpg`}
          alt="An image showing Paras"
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>Hi, I am Paras</h1>
      <p>I blog about web development</p>
    </section>
  );
};
