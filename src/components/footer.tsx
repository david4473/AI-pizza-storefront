import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amber-50 px-4 py-8 w-full border-t border-amber-100">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-2 text-amber-900">
            PIZZA PERFECTION
          </h2>
          <p className="text-amber-800 max-w-2xl">
            Serving the most delicious handcrafted pizzas in town since 2010.
            Made with fresh ingredients and baked to perfection in our
            traditional wood-fired ovens.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
          <Link
            href="/"
            className="text-amber-900 hover:text-amber-600 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-amber-900 hover:text-amber-600 hover:underline"
          >
            Menu
          </Link>
          <Link
            href="/locations"
            className="text-amber-900 hover:text-amber-600 hover:underline"
          >
            Locations
          </Link>
          <Link
            href="/order-online"
            className="text-amber-900 hover:text-amber-600 hover:underline"
          >
            Order Online
          </Link>
          <Link
            href="/about-us"
            className="text-amber-900 hover:text-amber-600 hover:underline"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-amber-900 hover:text-amber-600 hover:underline"
          >
            Contact
          </Link>
        </nav>

        <div className="border-t border-amber-200 pt-4">
          <div className="text-sm text-amber-700 flex justify-between items-center">
            <div>© 2025 Pizza Perfection. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
