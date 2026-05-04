"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const legalClass =
  "text-muted-foreground hover:text-foreground block rounded-lg px-2 py-2 text-sm font-medium outline-none ring-ring hover:bg-muted focus-visible:ring-3";

export function FooterLegalNav() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex flex-col gap-0">
        <NavigationMenuItem value="policies-menu">
          <NavigationMenuTrigger
            aria-label="Open legal menu"
            className="border-border text-muted-foreground hover:text-foreground data-open:bg-muted/60 h-auto w-fit border bg-transparent px-3 py-1.5 text-xs font-semibold tracking-[0.06em] uppercase"
          >
            Legal menu
          </NavigationMenuTrigger>
          <NavigationMenuContent className="mt-3">
            <div className="ring-border rounded-xl border px-6 py-4 shadow-sm backdrop-blur-sm">
              <ul className="grid min-w-[200px] gap-1">
                <li>
                  <Link prefetch={false} className={cn(legalClass)} href="/privacy">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} className={cn(legalClass)} href="/refund">
                    Refunds
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} className={cn(legalClass)} href="/terms">
                    Terms of use
                  </Link>
                </li>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
