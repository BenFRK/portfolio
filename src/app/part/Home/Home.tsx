'use client'
import React, { useRef } from 'react'
import style from './Home.module.scss'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

function Home() {
  const dev = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const social = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(tagline.current, { y: 20, opacity: 0, rotate: 80, scale: 10, scrollTrigger: { trigger: dev.current, markers: false, start: "top 40%", end: "50% top", toggleActions: "play none none reverse" } });
    const links = social.current ? Array.from(social.current.children) : [];
    gsap.from(links, { yPercent: -10, opacity: 0, ease: "elastic.out(0.4,0.15)", stagger: 0.2, scrollTrigger: { trigger: social.current, markers: false, start: "top 70%", end: "bottom 90%", toggleActions: "restart none reverse reset" } });
  });

  return (
    <div ref={dev} id='home' className={style.home}>
      <div className={style.left}>
        <p ref={tagline}>I AM A DEV WHO WANT TO DO BIG THING</p>
      </div>
      <div className={style.right}>
        {/* <img src='right.svg' alt="" /> */}
        <div ref={social} className={style.social}>
          <a target='_blank' className={style.link} href="https://www.facebook.com/ben.frk.3"><Image src='/fb.svg' alt="facebook icon" width={100} height={100} className='hidden md:block' /><Image src='/fb.svg' alt="facebook icon" width={75} height={75} className='block md:hidden' /></a>
          <a target='_blank' className={style.link} href="#"><Image src="/git.svg" alt="git" width={100} height={100} className='hidden md:block' /> <Image src="/git.svg" alt="git" width={75} height={75} className='block md:hidden' /></a>
          <a target='_blank' className={style.link} href="https://wa.me/341041909"><Image src='/whatsapp.svg' alt="whatsapp.svg" height={100} width={100} className='hidden md:block' /><Image src='/whatsapp.svg' alt="whatsapp.svg" height={75} width={75} className='block md:hidden' /></a>
        </div>
      </div>
    </div>
  )
}

export default Home