import React from "react";
import Container from "./container";
import Image from "next/image";
import { Logo } from "@/public/img";
import { ChevronDown, Menu, Phone, Search } from "lucide-react";
import { navItems } from "@/lib/iterationDetails";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import HeroTitle from "./hero-title";

const Header = () => {
  return (
    <>
      <header className="textSmall">
        <Container className="flex-col w-full bg-primary items-start">
          <div className="flex items-center justify-between w-10/12 mx-auto text-secondary py-2 gap-1 md:gap-5">
            <p className="hidden lg:block">
              Более 10-ти лет опыта на рынке систем безопасности и мини АТС
            </p>
            <div className="flex flex-col sm:flex-row justify-end items-center gap-1 md:gap-5 lg:hidden">
              <p>info@elt.uz</p>
              <a href="tel:+998909337880" className="flex items-center">
                +998 90 933-78-80
              </a>
              <a href="tel:+998555108133" className="flex items-center">
                +998 55 510-81-33
              </a>
            </div>
            <p className="ml-auto w-[40%]">
              Режим работы: ПН, ВТ, СР, ЧТ, СБ, ВС | с 10:00 - 20:00 Выходной:
              ПТ
            </p>
          </div>
          <div className="w-full bg-secondary py-4 ">
            <Container>
              <Link href={"/"}>
                <Image src={Logo} alt="Logo" className="w-[12vw] min-w-24" />
              </Link>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск по сайту"
                  className="py-2 rounded-3xl border border-primary pl-3 w-[170px] sm:w-[200px] md:w-[250px]"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary rounded-full text-foreground h-[85%] aspect-square flex items-center justify-center">
                  <Search className="text-secondary w-3 md:w-5" />
                </span>
              </div>
            </Container>
          </div>
        </Container>
      </header>
      <nav className="text-secondary textSmall bg-primary w-full sticky top-0 z-[99999]">
        <Container>
          <ul className="flex items-center gap-2 md:gap-10">
            {navItems.map((item) => {
              if (item.id === 1) return null;
              return (
                <li
                  key={item.id}
                  className="h-10 flex items-center justify-center"
                >
                  {item.id === 2 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex gap-2 items-center py-2 px-1 md:px-3">
                        <Menu className="w-3 lg:w-5" />
                        {item.name}
                        <ChevronDown className="w-3 lg:w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href={`${item.path}`} className="py-2 px-3">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="hidden items-center gap-1 md:gap-5 lg:flex">
            <p>info@elt.uz</p>
            <a href="tel:+998909337880" className="flex items-center gap-2">
              <Phone size={16} />
              +998 90 933-78-80
            </a>
            <a href="tel:+998555108133" className="flex items-center gap-2">
              <Phone size={16} />
              +998 55 510-81-33
            </a>
          </div>
        </Container>
      </nav>
      <HeroTitle />
    </>
  );
};

export default Header;
