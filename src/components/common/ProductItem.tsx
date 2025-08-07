import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

type productType = typeof productTable.$inferSelect & {
  variants: (typeof productVariantTable.$inferSelect)[];
};

interface ProductItemProps {
  product: productType;
}

export function ProductItem({ product }: ProductItemProps) {
  const firstVariant = product.variants[0].imageUrl
  const priceFormatted = formatCentsToBRL(product.variants[0].priceInCents);
  const imageUrl = firstVariant.replace(/^{"|"}$/g, '')
  return (
    <div className="w-[200px]">
      <Link href="/" className="flex flex-col gap-4">
        <Image
          src={imageUrl}
          alt={product.name}
          width={200}
          height={260}
          className="rounded-3xl"
        />
        <div className="flex flex-col gap-1">
          <h3 className="truncate text-sm font-medium">{product.name}</h3>
          <p className="text-muted-foreground text-xs font-medium line-clamp-2 w-[200px]">
            {product.description}
          </p>
          <span className="text-sm font-bold mt-6">
            {priceFormatted}
          </span>
        </div>
      </Link>
    </div>
  );
}
