export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  description?: string | null;
  status: string;
};
