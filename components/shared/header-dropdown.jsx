"use client";

import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function HeaderDropdown({ topCategory }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center py-2 px-1 md:px-3">
          <Menu className="w-3 lg:w-5" />
          Каталог
          <ChevronDown className="w-3 lg:w-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-xs">
        {topCategory?.map((topCategory) => (
          <DropdownMenuSub key={topCategory.id}>
            <DropdownMenuSubTrigger
              className="py-2 px-4 lg:text:sm"
              arrow={topCategory.categories.length}
            >
              {topCategory.name}
            </DropdownMenuSubTrigger>
            {/* Large screens: Show subcategories from the side */}
            <div className="hidden sm:block">
              {topCategory?.categories.length > 0 ? (
                <DropdownMenuSubContent side="right">
                  {topCategory.categories.map((category) => (
                    <DropdownMenuItem asChild key={category.id}>
                      <Link href={`/${topCategory.id}/${category.id}`}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              ) : null}
            </div>
            {/* Small screens: Show subcategories from the bottom */}
            <div className="block sm:hidden">
              {topCategory?.categories.length > 0 ? (
                <DropdownMenuSubContent side="bottom">
                  {topCategory.categories.map((category) => (
                    <DropdownMenuItem asChild key={category.id}>
                      <Link href={`/${topCategory.id}/${category.id}`}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              ) : null}
            </div>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
