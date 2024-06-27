"use client";

import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

export default function Carroussel(props: any) {
  const table = props.cards.map((element: any, index: any) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(true);
  const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);
  const [cards] = useState(table);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayInterval, setAutoplayInterval] = useState<number | undefined>(
    props.autoplayInterval || 4000
  );

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % cards.length;
      setGoToSlide(nextIndex);
      setCurrentSlide(nextIndex);
    };
    const autoplay = setInterval(nextSlide, autoplayInterval);

    return () => clearInterval(autoplay);
  }, [
    props.offset,
    props.showArrows,
    props.cards,
    currentSlide,
    cards.length,
    autoplayInterval,
  ]);

  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}
