import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel.js";
import type { Category } from "@/types/category.js";

type Props = {
  categories: Category[];
};

export function CategoryCarousel({ categories }: Props) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {categories.map((category, index) => (
          <CarouselItem key={index} className="w-fit basis-1/4 sm:basis-1/5">
            <a href="#" className="w-fit">
              <div className="flex flex-col items-center shrink-0 gap-2 text-center">
                <div className="w-16 h-16 rounded-full flex shrink-0 overflow-hidden p-4 bg-black/10">
                  <img
                    src={category.image}
                    className="w-full h-full object-contain"
                    alt={category.name}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-light text-muted-foreground text-[14px]">
                    {category.name}
                  </h3>
                </div>
              </div>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
