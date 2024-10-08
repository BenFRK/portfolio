'use client'
import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import style from './Menu.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

function Menu() {
  let [ishow, setishow] = useState(false);
  const red = useRef<HTMLDivElement>(null);
  const white = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLLIElement>(null);
  const second = useRef<HTMLLIElement>(null);
  const third = useRef<HTMLLIElement>(null);
  const fourth = useRef<HTMLLIElement>(null);
  const pic = useRef(null);

  const planel = () => {
    setishow(!ishow);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    if (ishow == false) {
      gsap.from(white.current, { y: -100, duration: 0.1 });
    } else {
      tl.from(red.current, { y: 900, duration: 0.1 })
        .from(pic.current, { x: 200, duration: 0.1 })
        .to(first.current, { opacity: 1, duration: 0.1 })
        .to(second.current, { opacity: 1, duration: 0.1 })
        .to(third.current, { opacity: 1, duration: 0.1 })
        .to(fourth.current, { opacity: 1, duration: 0.1 });
    }
  }, [ishow]);

  return (
    <>
      <div ref={white} className={style.menu}>
        <div className={clsx({ [style.top]: !ishow, [style.none]: ishow })}>
          <p>BEN FRk.</p>
          <button className={style.btn} onClick={planel}>MENU</button>
        </div>
      </div>
      <div ref={red} className={clsx({ [style.none]: !ishow, [style.show]: ishow })}>
        <div className={style.left}>
          <ul>
            <li ref={first}><Link onClick={planel} href={"#home"}>HOME</Link></li>
            <li ref={second}><Link onClick={planel} href={"#about"}>ABOUT</Link></li>
            <li ref={third}><Link onClick={planel} href={"#skills"}>SKILLS</Link></li>
            <li ref={fourth}><Link onClick={planel} href={"#contact"}>CONTACT</Link></li>
          </ul>
        </div>
        <div className={style.right}>
          <button onClick={planel}>CLOSE</button>
          <img ref={pic} src="flower.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Menu;
