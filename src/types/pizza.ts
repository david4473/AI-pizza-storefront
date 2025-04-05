export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  ingredients?: string[];
}
