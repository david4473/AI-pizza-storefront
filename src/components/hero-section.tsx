"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-amber-900 text-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
          backgroundPosition: "center 30%",
        }}
      />

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Authentic Italian Pizza Baked to Perfection
              </h1>
              <p className="text-amber-200 text-lg md:text-xl mt-4">
                Handcrafted with love using traditional recipes and the freshest
                ingredients
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium"
              >
                Order Online <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-amber-400 bg-amber-900/50 text-white hover:bg-amber-800 hover:text-white"
              >
                View Our Menu
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-1 text-amber-200">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1 text-amber-200">
                <Star className="h-4 w-4" />
                <span className="text-sm">Top Rated</span>
              </div>
              <div className="flex items-center gap-1 text-amber-200">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">3 Locations</span>
              </div>
            </div>
          </div>

          <div className="relative h-64 md:h-auto">
            {/* Special Offer Card */}
            <motion.div
              className="bg-white z-10 text-amber-900 p-5 rounded-lg shadow-lg absolute right-0 top-1/2 transform -translate-y-1/2 max-w-xs"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                SPECIAL OFFER
              </div>
              <h3 className="font-bold text-lg mb-2">Weekend Special</h3>
              <p className="text-amber-800 text-sm mb-3">
                Get 20% off on all large pizzas this weekend. Use code WEEKEND20
                at checkout.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">20% OFF</span>
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Claim Offer
                </Button>
              </div>
            </motion.div>

            {/* Floating Pizza Image */}
            <motion.div
              className="absolute left-0 md:-left-10 bottom-0 w-48 h-48 md:w-64 md:h-64"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-amber-600/20 animate-pulse" />
                <img
                  src="/pizzas/hot.jpg"
                  alt="Signature Pizza"
                  className="absolute rotate-90 rounded-full inset-0 w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto fill-white"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
}
