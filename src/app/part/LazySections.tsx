"use client";

import dynamic from "next/dynamic";

// Les sections animées par GSAP sont chargées dynamiquement (ssr:false) :
// GSAP et ScrollTrigger sortent du bundle initial et ne sont téléchargés
// qu'au moment de l'hydratation, améliorant ainsi le First Load JS.
export const Welcome = dynamic(() => import("./welcome/Welcome"), {
  ssr: false,
});
export const Home = dynamic(() => import("./Home/Home"), { ssr: false });
export const About = dynamic(() => import("./About/About"), { ssr: false });
export const Skills = dynamic(() => import("./Skills/Skills"), { ssr: false });
export const Contact = dynamic(() => import("./Contact/Contact"), {
  ssr: false,
});