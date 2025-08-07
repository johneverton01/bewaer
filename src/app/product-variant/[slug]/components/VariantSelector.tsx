import Image from "next/image"
import Link from "next/link"

import { productVariantTable } from "@/db/schema"
import { formatUrl } from "@/helpers/imageUrl"

type VariantType = typeof productVariantTable.$inferSelect[]

interface VariantSelectorProps {
  variants: VariantType
  selectedVariantSlug?: string
}

export function VariantSelector({ variants, selectedVariantSlug }: VariantSelectorProps) {


  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
          className={selectedVariantSlug === variant.slug ? "ring-2 ring-primary rounded-xl" : ""}
        >
          <Image
            src={formatUrl(variant.imageUrl)}
            alt={variant.name}
            width={68}
            height={69}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  )
}