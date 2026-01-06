export type Category = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image: string;
  description?: string | null;
  status: string;
  store: {
    id: string;
    name: string;
    image?: string;
  };
};
