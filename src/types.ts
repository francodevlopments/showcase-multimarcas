export type ProductCategory =
  | "Camisetas"
  | "Camisas"
  | "Moletons"
  | "Calças"
  | "Tênis"
  | "Bonés"
  | "Bolsas"
  | "Acessórios";

export type ProductGender = "Masculino" | "Feminino" | "Unissex";

export type ColorOption = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  gender: ProductGender;
  price: number;
  originalPrice?: number;
  colors: ColorOption[];
  sizes: string[];
  images: string[];
  description: string;
  material: string;
  delivery: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  popularity: number;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};
