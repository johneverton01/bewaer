import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

type productType = typeof productTable.$inferSelect & {
  variants: (typeof productVariantTable.$inferSelect)[];
};

interface ProductItemProps {
  product: productType;
  textContainerClassName?: string;
}

export function ProductItem({ product, textContainerClassName }: ProductItemProps) {
  const firstVariant = product.variants[0].imageUrl
  const priceFormatted = formatCentsToBRL(product.variants[0].priceInCents);
  const imageUrl = firstVariant.replace(/^{"|"}$/g, '')
  return (
    <div>
      <Link href="/" className="flex flex-col gap-4">
        <Image
          src={imageUrl}
          alt={product.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl"
        />
        <div className={cn(
          "flex flex-col gap-1 max-w-[200px]",
          textContainerClassName
        )
        }>
          <h3 className="truncate text-sm font-medium">{product.name}</h3>
          <p className="text-muted-foreground text-xs font-medium line-clamp-2 w-[200px] h-full">
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
