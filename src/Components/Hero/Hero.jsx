import React from "react";
import "./Hero.css";
import {motion} from 'framer-motion'
import {HiLocationMarker} from 'react-icons/hi'
import SearchBar from "../SearchBar/SearchBar";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
            <div className="hero-title">
                <motion.h1
                initial={{x:"-5rem",opacity:0}}
                animate={{x:0,opacity:1}}
                transition={{
                  duration:2,
                  type:"spring"
                }}
                >"Turning Dreams <br />into Addresses <br /> Your Journey <br /> Home Begins Here."</motion.h1>
            </div>
            <div className="flexColStart hero-desc">
                <span className="secondaryText">Turning Houses into Homes, One Client at a Time.</span>                
                <span className="secondaryText">Unlocking Doors to Your Future Home.</span>

            </div>
           <SearchBar/>
        </div>
        {/* right side */}
        <div className="flexCenter hero-right">
          <div className="img-container">
            <motion.img  initial={{y:"7rem",opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{
                  duration:2,
                  type:"spring"
                }} src="hero_image-1.png" alt="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
