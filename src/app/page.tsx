import React from 'react'
import Welcome from './part/welcome/Welcome'
import Home from './part/Home/Home' 
import Skills from './part/Skills/Skills' 
import About from './part/About/About' 
import Contact from './part/Contact/Contact' 
function page() {
  return (
    <>
      <Welcome />
      <Home />
      <About />
      <Skills />
      <Contact />
    </>
  )
}

export default page