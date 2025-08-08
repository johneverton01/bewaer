"use client";
import { LogInIcon, LogOut, Menu } from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

export function MobileMenu() {
  const { data: session } = authClient.useSession();
  return (
     <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="rounded-xl w-full max-w-[344px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-4">
              {session?.user && (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <SheetFooter>
              {session?.user ? (
                <div className="flex">
                <Button
                      className="text-muted-foreground text-sm flex items-center gap-3"
                      variant="ghost"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOut size={20} />
                      Sair da conta
                    </Button>

                </div>
              ) : (
                    <Link 
                      href="/authentication"
                      className="flex items-center gap-3 text-muted-foreground text-sm"
                    >
                      <LogInIcon size={20} />
                      <h2 className="text-sm flex items-center">Olá. Faça seu login!</h2>
                    </Link>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
  );
}
