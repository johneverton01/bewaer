import { ChevronLeft, ChevronRight } from "lucide-react";

import { productTable, productVariantTable } from "@/db/schema";

import { Button } from "../ui/button";
import { ProductItem } from "./ProductItem";

type productsType = (typeof productTable.$inferSelect & {
  variants: (typeof productVariantTable.$inferSelect)[];
})[];

interface ListProductsProps {
  title: string;
  products: productsType;
}

export async function ListProducts({ title, products }: ListProductsProps) {
  return (
    <section className="flex flex-col gap-6 md:gap-9">
      <header className="flex items-center justify-between px-4">
        <h2 className="font-semibold whitespace-nowrap md:text-2xl">{title}</h2>
        <div className="hidden items-center gap-2.5 md:flex">
          <span className="text-md font-semibold">Ver todos</span>
          <div>
            <Button variant="ghost" className="px-0">
              <ChevronLeft />
            </Button>
            <Button variant="ghost" className="px-0">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex w-full gap-3 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden px-4 h-[320px]">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
