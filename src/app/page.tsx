import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import PizzaCard from "@/components/pizza-card";
import { pizzas } from "@/data/pizzas";
import Pizza from "@types/pizza";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <HeroSection />

        <div className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">
            Our Signature Pizzas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pizzas.map((pizza) => (
              <PizzaCard key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
