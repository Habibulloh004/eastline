import React from "react";
import Container from "./container";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";

const AllCategories = ({ categories }) => {
  const findTopCategoryId = (id) => {
    const topCategoryId = categories.find((category) => category.id == id);
    return topCategoryId;
  };
  return (
    <Container className="pt-5 w-[95%] flex-col lg:w-10/12 lg:mx-auto justify-end items-start md:justify-center mx-0 ml-auto">
      <p className="textNormal4 font-semibold">Каталог товаров</p>
      <Carousel className="w-full text-foreground" paginate={"false"}>
        <CarouselContent>
          {categories.map((item, i) => {
            const topCategory = findTopCategoryId(item.topCategoryId);
            return (
              <CarouselItem
                key={i}
                className="basis-[35%] md:basis-[25%] lg:basis-[20%] mr-5"
              >
                <Link href={`/${topCategory.id}/${item.id}`} className="px-3 flex flex-col items-center gap-y-1">
                  <Image
                    src={`${item.image}`}
                    width={100}
                    height={100}
                    alt={`banner-img-${item.id}`}
                    className="w-full mx-auto aspect-square object-contain"
                  />
                  <p className="textSmall3 font-semibold">{item.name}</p>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};

export default AllCategories;
