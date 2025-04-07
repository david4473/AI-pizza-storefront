"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PizzaCardProps } from "@/types/index";
import { useCart } from "@/context/cart-context";

export default function PizzaCard({
  id,
  name,
  description,
  price,
  image,
  rating = 0,
  isVegetarian = false,
  isSpicy = false,
  isNew = false,
  ingredients = [],
}: PizzaCardProps) {
  const { addItem } = useCart();

  const onAddToCart = (id: string) => {
    addItem({
      id,
      name,
      description,
      price,
      image,
      rating,
      isVegetarian,
      isSpicy,
      isNew,
      ingredients,
    });
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-amber-100">
      {/* Pizza Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-amber-500 hover:bg-amber-600">New</Badge>
          )}
          {isVegetarian && (
            <Badge className="bg-green-500 hover:bg-green-600">
              Vegetarian
            </Badge>
          )}
          {isSpicy && (
            <Badge className="bg-red-500 hover:bg-red-600">Spicy</Badge>
          )}
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-amber-900 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 flex-1">{description}</p>

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-amber-100">
          <div className="text-amber-900 font-bold">${price.toFixed(2)}</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
            >
              <Info className="h-4 w-4 mr-1" />
              Details
            </Button>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => onAddToCart(id)}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
