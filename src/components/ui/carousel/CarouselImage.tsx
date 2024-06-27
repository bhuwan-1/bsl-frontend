"use client";

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

type Props = {
  imagen: string;
};

export const CarouselImage: React.FC<Props> = ({ imagen }) => {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={{
        ...props3,
        backgroundImage: `url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "40px",
        cursor: "pointer",
        width: "682px",
        height: "397px",
      }}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    ></animated.div>
  );
};
