'use client'
import React, { useRef } from 'react'
import style from './Home.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
function Home() {
 const dev = useRef(null);
 
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(()=>{
    gsap.from("p",{y:20,opacity:0,rotate:80,scale:10,scrollTrigger:{trigger:dev.current,markers:false,start:"top 70%",end:"90% top",toggleActions:"play none resume reverse"}});
    gsap.from("a",{yPercent:-10,opacity:0,ease:"elastic.out(0.4,0.15)",stagger:0.2,scrollTrigger:{trigger:"a",markers:false,start:"top 70%",end:"bottom 90%",toggleActions:"restart none reverse reset"}});
  },{scope:dev})

  return (
    <div ref={dev} id='home' className={style.home}>
      <div className={style.left}>
        <p>I AM A DEV WHO WANT  TO DO BIG THING</p>
      </div>
      <div className={style.right}>
        <img src='right.svg' alt="" />
        <div className={style.social}>
          <a target='_blank' className={style.link} href="https://www.facebook.com/ben.frk.3"><img src='fb.svg' alt="" /></a>
          <a target='_blank' className={style.link} href="#"><img src="git.svg" alt="" /></a>
          <a target='_blank' className={style.link} href="https://wa.me/341041909"><img src='whatsapp.svg' alt="" /></a>
        </div>
      </div>
    </div>
  )
}

export default Home