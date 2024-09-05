"use client";
import React, { useRef } from "react";
import style from "./About.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

function About() {
  const right = useRef(null);
  const left = useRef(null);
  const smile = useRef(null);
  const motiv = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    // .from(right.current,{xPercent:200,opacity:0,ease:"elastic.out(0.4,0.15)"});
    // .from(left.current,{duration:0.5,yPercent:500,opacity:0,ease:"ease in out"});
    gsap.from(right.current,{xPercent:-500,opacity:0,ease:"ease in out",duration:0.5,scrollTrigger:{trigger:left.current,markers:false,start:"top 50%",toggleActions:"restart none none reverse"}});
    gsap.to(smile.current,{scrollTrigger:{trigger:smile.current,markers:false,start:"top 20%",end:"150% top",pin:true,scrub:1}});
    gsap.to(motiv.current,{scrollTrigger:{trigger:motiv.current,markers:false,start:"top 20%",end:"275% top",pin:true,scrub:1}});
  });

  return (
    <div id="about" className={style.about}>
      <p>ABOUT ME</p>
      <div className={style.body}>
        <div ref={left} className={style.left}>
          <p>
            Hello, my name is FAAROUK Abdoullah Ben Alex, and I am a passionate
            web developer dedicated to creating modern and high-performing
            websites and web applications. With a degree in computer science, I
            recently completed an enriching internship at Saha Technologie,
            where I was able to apply my theoretical knowledge and develop
            real-world projects.
          </p>
          <div className={style.pics}>
            <img ref={smile} src="smile.svg" alt="" />
          </div>
          <h3 ref={motiv}>MOTIVATED AND ALWAYS LOOKING FOR PROGRESS</h3>
        </div>
        <div ref={right} className={style.right}>
          <div className={style.wrap}>
            <div className={style.square}>
              <div className={style.cubeN}></div>
              <div className={style.cubeN}></div>
              <div className={style.cube}></div>
            </div>
            <div className={style.square}>
              <div className={style.cubeN}></div>
              <div className={style.cube}></div>
              <div className={style.cubeN}></div>
            </div>
            <div className={style.square}>
              <div className={style.cubeN}></div>
              <div className={style.cubeN}></div>
              <div className={style.cube}></div>
            </div>
          </div>

          <p>
            I am a motivated individual, always ready to learn new things and
            constantly seeking new challenges. I firmly believe that continuous
            learning is the key to success in the field of web development.
            Every new project is an opportunity to expand my skills and discover
            new technologies. I invite you to work with me to explore new ideas
            and tackle exciting challenges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
