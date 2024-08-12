import { ChevronDown, Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
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
        {topCategory.map((topCategory, idx) => (
          <DropdownMenuSub key={topCategory.id}>
            <DropdownMenuSubTrigger
              className="py-2 px-4 lg:text:sm"
              arrow={topCategory.categories.length}
            >
              {topCategory.name}
            </DropdownMenuSubTrigger>
            {topCategory.categories.length ? (
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {topCategory.categories.map((category, i) => (
                    <DropdownMenuItem asChild key={category.id}>
                      <Link href={`/${topCategory.name}/${category.name}`}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            ) : null}
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
