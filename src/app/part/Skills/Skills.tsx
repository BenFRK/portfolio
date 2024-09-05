'use client'
import React, { useRef } from 'react'
import style from './Skills.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Tech from '@/app/Components/Tech';
function Skills() {
  const txt = useRef<HTMLParagraphElement>(null);
  useGSAP(()=>{
    gsap.from(".show",{duration:3,opacity:0,fontSize:70,stagger:0.5,scrollTrigger:{trigger:".show",markers:false,start:"top 50%",end:"bottom bottom",toggleActions:"reverse end none none",scrub:1}})
  },{scope:txt})
  return (
    <div id='skills' className={style.skills}>
      <p>SKILLS</p>
      <div className={style.body}>
        <div className={style.left}>
          <p ref={txt}>I <span className='show'>C</span>AN USE TH<span className='show'>O</span>SE T<span className='show'>OO</span >L<span className='show'>S</span></p>
        </div>
        <div className={style.right}>
          <div className={style.bloc}>
            <p>CORE</p>
            <div className={style.row}>
              <Tech titre={"HTML"} logo={"html"} />
              <Tech titre={"CSS"} logo={"css"} />
              <Tech titre={"JS"} logo={"js"} />
            </div>
          </div>
          <div className={style.bloc}>
            <p>FRAMEWORKS AND LIBRAIRIES</p>
            <div className={style.row}>
            <Tech titre={"SASS"} logo={"sass"} />
            <Tech titre={"TAILWIND"} logo={"tailwind"} />
            <Tech titre={"GSAP"} logo={"gsap"} />
            <Tech titre={"REACT"} logo={"react"} />
            <Tech titre={"NEXT"} logo={"next"} />
              
            </div>
          </div>
          <div className={style.bloc}>
            <p>MORE TOOLS</p>
            <div className={style.row}>
            <Tech titre={"VERCEL"} logo={"vercel"} />
            <Tech titre={"FIGMA"} logo={"figma"} />
            <Tech titre={"GIT"} logo={"git"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills