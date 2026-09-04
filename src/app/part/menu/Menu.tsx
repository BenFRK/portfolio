'use client'
import { useState } from 'react'
import clsx from 'clsx'
import style from './Menu.module.scss'
import Image from 'next/image'
import Link from 'next/link'

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((open) => !open);

  return (
    <>
      <div className={style.menu}>
        <div className={clsx({ [style.top]: !isOpen, [style.none]: isOpen })}>
          <p>BEN FRk.</p>
          <button type="button" className={style.btn} onClick={toggle}>MENU</button>
        </div>
      </div>
      <div className={clsx({ [style.none]: !isOpen, [style.show]: isOpen })}>
        <div className={style.left}>
          <ul>
            <li><Link onClick={toggle} href={"#home"}>HOME</Link></li>
            <li><Link onClick={toggle} href={"#about"}>ABOUT</Link></li>
            <li><Link onClick={toggle} href={"#skills"}>SKILLS</Link></li>
            <li><Link onClick={toggle} href={"#contact"}>CONTACT</Link></li>
          </ul>
        </div>
        <div className={style.right}>
          <button type="button" onClick={toggle}>CLOSE</button>
          <Image src="/flower.png" alt="" width={375} height={666} />
        </div>
      </div>
    </>
  );
}

export default Menu