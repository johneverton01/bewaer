"use client"

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function QuantitySelector() {
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex items-center border justify-between rounded-lg w-24">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          <Minus />
        </Button>
        <span className="text-lg font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleIncrement}
        >
          <Plus />
        </Button>

      </div>
      
    </div>
  )
}