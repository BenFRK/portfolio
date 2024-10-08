"use client";
import React from "react";
import style from "./Welcome.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Power1 } from "gsap";
import Image from "next/image";
function Welcome() {
  gsap.registerPlugin(ScrollTrigger);
  const welcome = useRef<HTMLHRElement>(null);
  const world = useRef(null);
  const wrap = useRef(null);
  const scroll = useRef(null);
  const respo = useRef(null);
  const stay = useRef(null);
  const tl = gsap.timeline();
  useGSAP(() => {
    tl.from(welcome.current, { delay: 1, duration: 0.5, opacity: 0, x: -200 })
      .from(world.current, { duration: 0.5, opacity: 0, x: -500 })
      .from(scroll.current, { duration: 2, opacity: 0 })
      .from(respo.current, { duration: 1.2, opacity: 0 });
    gsap.from(scroll.current, {
      duration: 3,
      borderRadius: () =>
        `${gsap.utils.random(50, 80)}% ${gsap.utils.random(
          50,
          80
        )}% ${gsap.utils.random(20, 50)}% ${gsap.utils.random(
          20,
          50
        )}% / ${gsap.utils.random(50, 80)}% ${gsap.utils.random(
          50,
          80
        )}% ${gsap.utils.random(20, 50)}% ${gsap.utils.random(20, 50)}%`,
      scaleX: () => gsap.utils.random(0.8, 1.2),
      scaleY: () => gsap.utils.random(0.8, 1.2),
      x: () => gsap.utils.random(-20, 20),
      y: () => gsap.utils.random(-20, 20),
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });


    gsap.to(scroll.current, {
      scale: 15,
      Color: "white",
      scrollTrigger: {
        trigger: scroll.current,
        markers: false,
        toggleActions: "play none none reverse",
        start: "40% 60%",
        end: "bottom 35%",
        scrub: 1,
      },
    });


    gsap.to(wrap.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: wrap.current,
        markers: false,
        pin:true,
        toggleActions: "play end none reverse",
        start: "50% 46%",
        end: "80% top",
      },
    });
  });
  return (
    <div ref={stay}>
      <div ref={wrap} id="wrap" className={style.welcome}>
        <h1 ref={welcome}>WELCOME</h1>
        <div className={style.world}>
          <p ref={world}>THIS IS MY WORLD</p>
          <div ref={scroll} className={style.down}>
            <p>scroll down</p>
            <Image src="mouse.svg" alt="mouse" height={24} width={24} />
          </div>
        </div>
        <p ref={respo} className={style.respo}>
          scroll down
        </p>
      </div>
    </div>
  );
}

export default Welcome;
