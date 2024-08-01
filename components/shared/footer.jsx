import React from "react";
import Container from "./container";
import { navItems } from "@/lib/iterationDetails";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <Container>
        <ul className="">
          <li>Компания</li>
          {navItems.map((item) => {
            if (item.id === 1) return null;
            return (
              <li key={item.id}>
                <Link href={`${item.path}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
