import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { Cart } from "./Cart";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">
        <Image src="/bewaer.svg" alt="Bewaer" width={100} height={26.14} />
      </Link>
      <div className="flex items-center gap-3">
        <Button className="hidden md:flex" variant="ghost" size="icon">
          <Search />
        </Button>
        <Cart />
       <MobileMenu />
      </div>
    </header>
  );
}
