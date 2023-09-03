import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import "swiper/swiper-bundle.min.css"; // Import Swiper styles
import "./Cards.css";

SwiperCore.use([Autoplay]);
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Cards = ({ card }) => {
  const randomDelay = getRandomDelay(5000, 10000);
  return (
    <div className="flexColStart r-card">
      <Swiper className="swipper" autoplay={{ delay: randomDelay }}>
        {card.image.map((img, j) => (
          <SwiperSlide key={j} style={{ width: "20rem" }}>
            <img className="card-image" src={img} alt={`img-${j}`} />
          </SwiperSlide>
        ))}
      </Swiper>
          
      <span className="secondaryText r-price">
        <span
          className="price-symbol"
          style={{ color: "green", paddingRight: "0.3rem" }}
        >
          Rs.
        </span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">{card.title}</span>
      <span className="secondaryText">{card.description}</span>
    </div>
  );
};

export default Cards;
