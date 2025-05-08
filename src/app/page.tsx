import Hero from "@/components/hero";
import Benefits from "@/components/benefits";
import Plans from "@/components/plans";
import Testimonials from "@/components/testimonials";
import Faq from "@/components/faq";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full pt-14">
      <Hero />
      <Benefits />
      <Plans />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
}
