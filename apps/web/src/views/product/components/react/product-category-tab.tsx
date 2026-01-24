import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

import type {
  Category,
  CategoryWithProductList,
} from "@/views/category/types/category";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";

import { Button } from "@workspace/ui/components/button";
import { formatCurrency } from "@/utils/format-currency";
import { Plus, Soup } from "lucide-react";

type ProductCategoryTabProps = {
  categories: Category[];
  storeSlug: string;
};

export function ProductCategoryTab({
  categories,
  storeSlug,
}: ProductCategoryTabProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset jika Anda memiliki header fixed (misal 80px)
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 py-1 px-2 bg-primary/10">
        <Tabs defaultValue={categories[0]?.slug} className="w-full  ">
          <TabsList className="w-full rounded-none bg-transparent">
            <Carousel className="w-full">
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="w-fit max-w-fit">
                    <TabsTrigger
                      key={category.id}
                      value={category.slug}
                      className="px-6 rounded-sm cursor-pointer bg-white data-[state=active]:bg-primary data-[state=active]:text-white"
                      onClick={() => scrollToSection(category.slug)}
                    >
                      {category.name}
                    </TabsTrigger>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
