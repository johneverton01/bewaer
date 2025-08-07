
import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

type CategoryType = (typeof categoryTable.$inferSelect)[];
interface CategorySelectorProps {
  categories: CategoryType;
}
export function CategorySelector({ categories }: CategorySelectorProps) {
  return (
    <div className="rounded-3xl bg-[#f4efff] p-6 flex md:hidden">
        <div className="grid grid-cols-2 gap-4 ">
          {categories.map((category) => (
            <Button 
              key={category.id} 
              variant="ghost" 
              className="rounded-full bg-white"
            >
              <Link href={`/category/${category.slug}`}>
                <span className="text-xs font-semibold">{category.name}</span>
              </Link>
            </Button>
          ))}
        </div>
    </div>
  )
}