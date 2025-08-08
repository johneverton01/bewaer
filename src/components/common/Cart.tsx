import { ShoppingBag } from "lucide-react";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingBag />
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-xl w-full max-w-[344px]">
        <SheetHeader>
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} />
            <h2 className="text-lg font-semibold">Sacola</h2>
          </div>
        </SheetHeader>
        <SheetFooter>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-sm">Subtotal</span>
              <span className="text-sm text-muted-foreground font-medium">
                {formatCentsToBRL(123900)}
              </span>
            </div>
          <div className="flex flex-col gap-4 border-t pt-6">
            <Button type="submit" className="rounded-full" size="lg">
              Finalizar a compra
            </Button>
            <SheetClose asChild>
              <Button
                className="text-muted-foreground text-sm underline"
                variant="link"
                size="lg"
              >
                Continuar comprando
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
