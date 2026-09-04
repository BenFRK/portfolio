import {
  Home,
  About,
  Skills,
  Contact,
  Welcome,
} from "./part/LazySections";

function Page() {
  return (
    <>
      <Welcome />
      <Home />
      <About />
      <Skills />
      <Contact />
    </>
  );
}

export default Page;