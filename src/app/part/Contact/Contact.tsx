"use client";
import React, { useRef } from "react";
import style from "./style.module.scss";
import { gsap, Power4 } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

function Contact() {
  const work = useRef<HTMLDivElement>(null);
  const links = useRef<HTMLAnchorElement[]>([]);
  const collectLink = (el: HTMLAnchorElement | null) => {
    if (el) {
      links.current.push(el);
    } else {
      links.current = [];
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      tl.to(links.current, 0.1, { skewX: 50, ease: Power4.easeInOut })
        .to(links.current, 0.01, { skewX: 0, ease: Power4.easeInOut })
        .to(links.current, 0.04, { opacity: 0 })
        .to(links.current, 0.04, { opacity: 1 })
        .to(links.current, 0.04, { x: -20 })
        .to(links.current, 0.04, { x: 0 });

      gsap.to(work.current, {
        duration: 2,
        borderRadius: () =>
          `0 0 ${gsap.utils.random(30, 3)}% ${gsap.utils.random(5, 17)}%`,
        y: () => gsap.utils.random(-10, 10),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.from(work.current, { scale: 0.4, duration: 0.4, xPercent: 25, scrollTrigger: { trigger: work.current, markers: false, start: "top 40%", toggleActions: "restart none reverse reverse" } });
    },
    { scope: work }
  );

  return (
    <div id="contact" ref={work} className={style.contact}>
      <p>LET&apos;S WORK TOGETHER</p>
      <div className={style.body}>
        <div className={style.left}>
          <p>LET&apos;S BUILD SOMETHING GREAT TOGETHER</p>
          <a ref={collectLink} target="_blank" href="mailto:faaroukabdoulahbenalex@gmail.com">
            SEND A MAIL
          </a>
        </div>
        <div className={style.left}>
          <p>FOLLOW ME</p>
          <a ref={collectLink} target="_blank" href="https://www.instagram.com/neb_faarouk/">
            INSTAGRAM
          </a>
          <a ref={collectLink} target="_blank" href="https://www.facebook.com/ben.frk.3">
            FACEBOOK
          </a>
          <a ref={collectLink} href="#">LINKEDIN</a>
          <a ref={collectLink} href="#">GITHUB</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;