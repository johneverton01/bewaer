import { desc } from "drizzle-orm";
import Image from "next/image";

import { CategorySelector } from "@/components/common/CategorySelector";
import { Header } from "@/components/common/Header";
import { ListProducts } from "@/components/common/ListProducts";
import { db } from "@/db";
import { productTable } from "@/db/schema";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    with: {
      variants: true
    },
    orderBy: [desc(productTable.createdAt)],
  });

  const categories = await db.query.categoryTable.findMany();
  return (
    <div className="mx-auto w-full max-w-[1352px]">
      <Header />
      <div className="space-y-6">
        <div className="px-4">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ListProducts 
          title="Mais vendidos" 
          products={products} 
        />
        <div className="px-4">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-4">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ListProducts 
          title="Novos produtos" 
          products={newlyCreatedProducts} 
        />
      </div>
    </div>
  );
}
