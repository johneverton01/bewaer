import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/Header";
import { ListProducts } from "@/components/common/ListProducts";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import { QuantitySelector } from "./components/QuantitySelector";
import { VariantSelector } from "./components/VariantSelector";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function ProductVariantPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProduct = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  const imageUrlFormatted = productVariant.imageUrl.replace(/^{"|"}$/g, "");
  const priceFormatted = formatCentsToBRL(productVariant.priceInCents);
  return (
    <>
      <Header />
      <div className="mb-6 flex flex-col space-y-6 px-4 md:grid md:grid-cols-2 md:gap-9">
        <Image
          src={imageUrlFormatted}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl"
        />
        <div className="flex flex-col md:h-[780px] gap-9">
          <div className="flex h-full flex-col gap-6 md:flex-col-reverse">

            <div className="flex-1">
              <VariantSelector
                variants={productVariant.product.variants}
                selectedVariantSlug={productVariant.slug}
              />
            </div>

            <div className="flex flex-col gap-9">
              <div>
                <h3 className="text-lg font-semibold">
                  {productVariant.product.name}
                </h3>
                <div className="text-muted-foreground text-sm">
                  {productVariant.name}
                </div>
              </div>

              <div>
                <span className="text-lg font-semibold">{priceFormatted}</span>
              </div>
            </div>
          </div>

           <div>
                <div>
                  <QuantitySelector />
                </div>
                <div className=":md:mt-0 mt-9 flex flex-col gap-4">
                  <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                    <Button
                      className="rounded-full"
                      variant="outline"
                      size="lg"
                    >
                      Adicionar ao carrinho
                    </Button>
                    <Button className="rounded-full" size="lg">
                      Comprar agora
                    </Button>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      {productVariant.product.description}
                    </p>
                  </div>
                </div>
              </div>
        </div>
      </div>
      <ListProducts title="Você também pode gostar" products={likelyProduct} />
    </>
  );
}
