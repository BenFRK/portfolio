import style from './Tech.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { Power4 } from 'gsap'
import Image from 'next/image'

interface Techprops {
  titre:String;
  logo:String;
}
function Tech({ titre, logo }:Techprops) {
  let pic;
  const tec = useRef<HTMLDivElement>(null);
  const ima = useRef<HTMLImageElement>(null);
  const txtglitch = gsap.timeline({ repeat: -1, repeatDelay: 2 });
  switch (logo) {
    case "html":
      pic = "html.svg";
      break;

    case "css":
      pic = "css.svg";
      break;

    case "js":
      pic = "js.svg";
      break;

    case "sass":
      pic = "sass.svg";
      break;

    case "tailwind":
      pic = "tailwind.svg";
      break;

    case "gsap":
      pic = "gsap.svg";
      break;

    case "ts":
      pic = "ts.svg";
      break;

    case "react":
      pic = "react.svg";
      break;

    case "next":
      pic = "next.svg";
      break;

    case "vercel":
      pic = "vercel .svg";
      break;

    case "figma":
      pic = "figma.svg";
      break;

    case "git":
      pic = "git2.svg";
      break;

    default:
      pic = ""
      break;
  }
  useGSAP(() => {
    gsap.from(ima.current, { duration: 1, opacity: 0, y: 50, scrollTrigger: { trigger: tec.current, markers: false, start: "top 80%", end: "bottom bottom", toggleActions: "reverse reverse none none", scrub: 2 } });
    txtglitch.to(tec.current, 0.1, { skewX: 30, ease: Power4.easeInOut }).to(tec.current, 0.01, { skewX: 0, ease: Power4.easeInOut }).to(tec.current, 0.04, { opacity: 0 }).to(tec.current, 0.04, { opacity: 1 }).to(tec.current, 0.04, { x: -20 }).to(tec.current, 0.04, { x: 0 })
  })
  return (
    <div ref={tec} className={style.tech}>
      <Image ref={ima} src={pic} alt="tech" width={30} height={30} className='block md:hidden'/>
      <Image ref={ima} src={pic} alt="tech" width={75} height={75} className='hidden md:block'/>
      <p>{titre}</p>
    </div>
  )
}

export default Tech