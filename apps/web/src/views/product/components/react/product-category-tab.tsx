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
  categoryProducts: CategoryWithProductList[];
  storeSlug: string;
};

export function ProductCategoryTab({
  categories,
  categoryProducts,
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
                  <CarouselItem
                    key={category.id}
                    className="w-fit basis-1/4 sm:basis-1/5"
                  >
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

      <div>
        {categoryProducts.map((category) => (
          <section
            key={category.id}
            id={category.slug}
            className="py-4 rounded-lg"
          >
            <div className="flex flex-col gap-1.5 mb-2">
              <h1 className="text-[20px]">{category.name}</h1>
              <p className="text-muted-foreground text-[12px]">
                {category.products.length} Menus Available
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-wrap rounded-xl border border-background p-3 bg-white hover:bg-primary/20 hover:border hover:border-primary transition-all duration-300"
                >
                  <div className="basis-4/12 lg:basis-3/12">
                    {product.image ? (
                      <img
                        src={product.image}
                        className="w-full object-cover rounded-xl aspect-square sm:aspect-auto"
                        alt="icon"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-accent rounded-xl">
                        <Soup size={52} className="stroke-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-4 ps-4 basis-8/12 lg:basis-9/12">
                    <a
                      href={
                        storeSlug
                          ? `/${storeSlug}/products/${product.slug}`
                          : `/products/${product.slug}`
                      }
                    >
                      <div className="flex flex-col gap-1 w-full">
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
                        <h3 className="text-accent-foreground font-medium text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground font-medium text-[10px] line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </a>
                    <div className="flex items-center justify-between">
                      <p className="text-destructive font-semibold text-sm">
                        {formatCurrency(product.price)}
                      </p>
                      <Button
                        type="button"
                        className="flex items-center justify-center rounded-full"
                        aria-label="Add to cart"
                        variant="primary"
                        size="sm"
                      >
                        <Plus className="size-4" />
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
