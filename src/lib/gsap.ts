import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power4 } from "gsap";

// Centralise l'enregistrement du plugin pour éviter les appels dupliqués
// (et les oublis, comme dans Skills.tsx) dans chaque composant.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, Power4 };