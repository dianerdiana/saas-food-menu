import { Category } from "@/types/category.js";
import { Product } from "@/types/product.js";
import { Button } from "@workspace/ui/components/button.js";
import { Plus } from "lucide-react";

type ProductRecommendationProps = {
  products: (Product & { category: Category })[];
};

export function ProductRecommendation({
  products,
}: ProductRecommendationProps) {
  return (
    <div className="flex flex-col gap-4 mt-2.5">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-wrap rounded-xl border border-background p-3 bg-white hover:bg-hover-warning hover:border hover:border-yellow-500 transition-all duration-300"
        >
          <div className="basis-3/12">
            <img
              src={product.image}
              className="w-full object-cover rounded-xl"
              alt="icon"
            />
          </div>
          <div className="flex flex-col gap-4 ps-4 basis-9/12">
            <a href="details.html">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-yellow-500 font-medium text-xs">
                  {product.category.name}
                </p>
                <h3 className="text-accent-foreground font-medium text-sm">
                  {product.name}
                </h3>
                <p className="text-muted-foreground font-medium text-[10px]">
                  {product.description}
                </p>
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
                variant="warning"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
