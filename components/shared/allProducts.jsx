/* eslint-disable react/display-name */
"use client";
import React, { memo, useCallback, useState } from "react";
import Container from "./container";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { f, getLastProducts } from "@/lib/utils";
import Image from "next/image";

const AllProducts = ({ products, categories }) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [renderedProducts, setRenderedProducts] = useState(products);

  const changeProducts = useCallback(
    (idx, item) => {
      setCurrentCategory(idx);
      setRenderedProducts(
        item == "new" ? products : getLastProducts(item.products)
      );
    },
    [products]
  );

  return (
    <Container className="pt-5 w-[95%] flex-col lg:w-10/12 lg:mx-auto justify-end items-start md:justify-center mx-0 ml-auto">
      <p className="textNormal5 font-semibold mb-7">
        <span className="text-primary">Новинки</span> и товары
      </p>
      <Carousel className="w-full text-foreground" paginate={"false"}>
        <CarouselContent>
          <CarouselItem className="basis-[30%] md:basis-[15%] lg:basis-[10%] mr-5">
            <Button
              variant={`${currentCategory == 0 ? "" : "secondary"}`}
              onClick={() => changeProducts(0, "new")}
              className="textSmall3 font-semibold"
            >
              Новинки
            </Button>
          </CarouselItem>
          {categories.map((item, i) => {
            return (
              <CarouselItem
                key={i}
                className="basis-[30%] md:basis-[15%] lg:basis-[10%] mr-5"
              >
                <Button
                  variant={`${currentCategory == i + 1 ? "" : "secondary"}`}
                  onClick={() => changeProducts(i + 1, item)}
                  className="textSmall3 font-semibold"
                >
                  {item.name}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <section className="py-5 w-full flex justify-between gap-5 items-start">
        <div className="lg:grid w-1/2 grid-cols-1 gap-5 hidden">
          {renderedProducts.length &&
            renderedProducts.slice(2).map((item, i) => (
              <Cards variant={"first"} props={item} key={i} />
            ))}
        </div>
        <div className="lg:w-1/2">
          <Carousel
            className="lg:hidden w-full text-foreground overflow-x-clip"
            paginate={"false"}
          >
            <CarouselContent>
              {renderedProducts.map((item, i) => {
                return (
                  <CarouselItem
                    key={i}
                    className="basis-[65%] sm:basis-[50%] md:basis-[40%]"
                  >
                    <Cards variant={"second"} props={item} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <div className="hidden w-full lg:grid grid-cols-2 gap-5">
            {renderedProducts.length &&
              renderedProducts.map((item, i) => (
                <Cards variant={"second"} props={item} key={i} />
              ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

const Cards = memo(({ props, variant }) => {
  const { name, image, price } = props;
  return (
    <>
      {variant == "second" ? (
        <article className="border rounded-xl flex flex-col items-center justify-center py-5 gap-4 md:h-[380px]">
          <p>{name}</p>
          <span className="text-xs bg-black text-white rounded-md px-2 py-1 translate-y-5">
            NEW
          </span>
          <Image
            src={`${image[0]}`}
            className="w-[70%] md:w-[50%] lg:w-[60%] aspect-square"
            width={100}
            height={100}
            alt={`${image[0]}`}
          />
          <p>{f(price)} сум</p>
        </article>
      ) : (
        <article className="border w-full rounded-xl flex items-center justify-center p-5 gap-5 textNormal md:h-[380px]">
          <Image
            src={`${image[0]}`}
            className="md:w-[50%] aspect-square"
            width={100}
            height={100}
            alt={`${image[0]}`}
          />
          <div className="flex flex-col gap-5 items-start justify-between h-[80%]">
            <p>{name}</p>
            <span className="text-xs bg-black text-white rounded-md px-2 py-1 ">
              NEW
            </span>
            <p>{f(price)} сум</p>
          </div>
        </article>
      )}
    </>
  );
});

export default AllProducts;
