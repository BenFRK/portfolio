'use client'
import React, { useRef } from 'react'
import style from './Home.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
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
          <a target='_blank' className={style.link} href="https://www.facebook.com/ben.frk.3"><Image src='fb.svg' alt="facebook icon" width={100} height={100} className='hidden md:block' /><Image src='fb.svg' alt="facebook icon" width={75} height={75} className='block md:hidden' /></a>
          <a target='_blank' className={style.link} href="#"><Image src="git.svg" alt="git" width={100} height={100} className='hidden md:block' /> <Image src="git.svg" alt="git" width={75} height={75} className='block md:hidden' /></a>
          <a target='_blank' className={style.link} href="https://wa.me/341041909"><Image src='whatsapp.svg' alt="whatsapp.svg" height={100} width={100} className='hidden md:block' /><Image src='whatsapp.svg' alt="whatsapp.svg" height={75} width={75} className='block md:hidden' /></a>
        </div>
      </div>
    </div>
  )
}

export default Home