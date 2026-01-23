import { Plus, Soup, Star } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";

import type { ProductWithCategories } from "@/views/product/types/product";

type ProductCarouselProps = {
  products: ProductWithCategories[];
  storeSlug?: string;
};

export function ProductCarousel({ products, storeSlug }: ProductCarouselProps) {
  return (
    <div className="flex justify-center">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
        }}
      >
        <CarouselContent className="w-full">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="w-fit basis-1/2 lg:basis-2/5"
            >
              <div className=" p-3 pb-5 bg-white hover:bg-primary/20 rounded-xl border border-background hover:border-primary transition-all duration-300">
                <a
                  href={
                    storeSlug
                      ? `${storeSlug}/products/${product.slug}`
                      : `/products/${product.slug}`
                  }
                >
                  <div className="flex flex-col w-full shrink-0 gap-2.5">
                    <div className="relative flex w-full h-37.5 shrink-0 rounded-xl bg-accent overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          className="w-full h-full object-cover"
                          alt="thumbnail"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <Soup size={52} className="stroke-primary" />
                        </div>
                      )}

                      <div className="absolute top-1 right-1 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                        <Star className="text-primary size-4 fill-primary" />
                        <p className="text-sm">4.8</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div>
                        {product.categories &&
                          product.categories.length &&
                          product.categories.map((category) => (
                            <p
                              key={category.id}
                              className="text-primary font-medium text-xs w-fit"
                            >
                              {category.name}
                            </p>
                          ))}
                      </div>
                      <h3 className="text-accent-foreground font-medium text-sm">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground font-normal text-[10px] line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </a>

                <div className="flex items-center justify-between">
                  <p className="text-destructive font-semibold text-sm">
                    Rp {product.price}
                  </p>
                  <Button
                    type="button"
                    className="flex items-center justify-center w-6 h-6 rounded-full"
                    data-id="1"
                    aria-label="Add to cart"
                    variant="primary"
                    onClick={() => console.log("Klik")}
                  >
                    <Plus className="size-4 stroke-3" />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
