import { Category } from "@/types/category.js";
import { Product } from "@/types/product.js";
import { Button } from "@workspace/ui/components/button.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";

import { Plus, Star } from "lucide-react";

type ProductCarouselProps = { products: (Product & { category: Category })[] };

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <div className="flex justify-center">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
        }}
      >
        <CarouselContent className="w-full">
          {products.map((product, index) => (
            <CarouselItem key={index} className="w-fit basis-1/2 lg:basis-2/5">
              <div className=" p-3 pb-5 bg-white hover:bg-primary/20 rounded-xl border border-background hover:border-yellow-500 transition-all duration-300">
                <a href="/details">
                  <div className="flex flex-col w-full shrink-0 gap-2.5">
                    <div className="relative flex w-full h-37.5 shrink-0 rounded-xl bg-accent overflow-hidden">
                      <img
                        src={product.image}
                        className="w-full h-full object-cover"
                        alt="thumbnail"
                      />

                      <div className="absolute top-1 right-1 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                        <Star className="text-yellow-500 size-4 fill-yellow-500" />
                        <p className="text-sm">4.8</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-yellow-500 font-normal text-xs">
                        {product.category.name}
                      </p>
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
