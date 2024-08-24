"use client";
import React, { useEffect } from "react";
import Container from "./container";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { truncateText } from "@/lib/utils";
import CustomImage from "./customImage";

const Banner = ({ products, categories, currency }) => {
  const findTopCategoryId = (id) => {
    const topCategoryId = categories.find((category) => category.id == id);
    return topCategoryId;
  };

  useEffect(() => {
    function getCurrency() {
      if (currency.length) {
        localStorage.setItem("sum", currency[0].sum);
      }
    }
    getCurrency();
  }, []);

  return (
    <Container>
      <section className="flex items-center w-full justify-center">
        <div className="bg-primary pt-8 pb-3 px-3 rounded-xl w-full md:hidden">
          <Carousel
            plugins={[
              emblaCarouselAutoplay({
                delay: 3000,
              }),
            ]}
            className="w-full text-secondary"
          >
            <CarouselContent>
              {products.map((item, i) => {
                if (!item) return null; // Skip if item is empty
                const topCategoryId = findTopCategoryId(item.categoryId);
                return (
                  <CarouselItem key={i} className="md:basis-1/2">
                    <div className="px-3 flex flex-col gap-y-1">
                      <div className="flex justify-between items-start">
                        <h1 className="font-medium textNormal4 leading-7">
                          {item.name}
                        </h1>
                        <Link
                          className="mt-1"
                          href={`/${topCategoryId.id}/${item.categoryId}/${item.id}`}
                        >
                          <Button className="bg-secondary text-foreground px-3 h-8 rounded-md font-medium text-xs">
                            Подробно
                          </Button>
                        </Link>
                      </div>
                      <p className="textSmall2 w-[50%] whitespace-normal break-words overflow-wrap">
                        {truncateText(item.feature, 50)}
                      </p>
                      <div className="relative">
                        <CustomImage
                          src={item.image[0]}
                          width={100}
                          height={100}
                          alt={`banner-img-${item.id}`}
                          className={`w-[70%] mx-auto aspect-square object-contain mb-5 ${
                            item.image[1] && "-translate-x-10"
                          }`}
                        />
                        {item.image[1] && (
                          <CustomImage
                            src={item.image[1]}
                            width={100}
                            height={100}
                            alt={`banner-img-${item.id}`}
                            className="w-[60%] aspect-square object-contain absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-[70%]"
                          />
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselCounter classNameCounter="bg-white" />
            {/* <CarouselPrevious /> */}
            {/* <CarouselNext /> */}
          </Carousel>
        </div>
        <div className="hidden md:block w-full text-secondary space-y-5">
          <section className="flex gap-5">
            {products[0] && (
              <div className="p-5 w-4/6 flex justify-between gap-y-1 bg-primary rounded-xl">
                <div className="relative w-full">
                  <CustomImage
                    src={products[0].image[0]}
                    width={100}
                    height={100}
                    alt={`banner-img-${products[0].id}`}
                    className={`w-[60%] mx-auto aspect-square object-contain mb-5 ${
                      products[0].image[1] && "-translate-x-10"
                    }`}
                  />
                  {products[0].image[1] && (
                    <CustomImage
                      src={products[0].image[1]}
                      width={100}
                      height={100}
                      alt={`banner-img-${products[0].id}`}
                      className="w-[50%] aspect-square object-contain absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-[70%]"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-5 justify-between items-end py-5 px-3">
                  <div className="space-y-5">
                    <h1 className="font-medium textBig2 text-right leading-7">
                      {products[0].name}
                    </h1>
                    <p className="textSmall3 text-right w-[70%] whitespace-normal break-words overflow-wrap ml-auto">
                      {truncateText(products[0].feature, 50)}
                    </p>
                  </div>
                  <Link
                    className="mt-1"
                    href={`/${findTopCategoryId(products[0].categoryId).id}/${
                      products[0].categoryId
                    }/${products[0].id}`}
                  >
                    <Button className="bg-secondary text-foreground rounded-md font-medium">
                      Подробно
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            {products[2] && (
              <div className="p-5 w-2/6 bg-primary rounded-xl flex flex-col gap-y-1">
                <div className="flex justify-between items-start">
                  <h1 className="font-medium textNormal4 text-right leading-7">
                    {products[2].name}
                  </h1>
                  <Link
                    className="mt-1"
                    href={`/${findTopCategoryId(products[2].categoryId).id}/${
                      products[2].categoryId
                    }/${products[2].id}`}
                  >
                    <Button className="bg-secondary text-foreground px-3 h-8 rounded-md font-medium text-xs">
                      Подробно
                    </Button>
                  </Link>
                </div>
                <p className="textSmall2 w-[70%] whitespace-normal break-words overflow-wrap">
                  {truncateText(products[2].feature, 50)}
                </p>
                <div className="relative">
                  <CustomImage
                    src={products[2].image[0]}
                    width={100}
                    height={100}
                    alt={`banner-img-${products[2].id}`}
                    className={`w-[70%] mx-auto aspect-square object-contain mb-5 ${
                      products[2].image[1] && "-translate-x-10"
                    }`}
                  />
                  {products[2].image[1] && (
                    <CustomImage
                      src={products[2].image[1]}
                      width={100}
                      height={100}
                      alt={`banner-img-${products[2].id}`}
                      className="w-[60%] aspect-square object-contain absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-[70%]"
                    />
                  )}
                </div>
              </div>
            )}
          </section>
          <section className="flex gap-5">
            {products[1] && (
              <div className="p-5 flex w-4/6 justify-between gap-y-1 bg-primary rounded-xl">
                <div className="relative w-full">
                  <CustomImage
                    src={products[1].image[0]}
                    width={100}
                    height={100}
                    alt={`banner-img-${products[1].id}`}
                    className={`w-[60%] mx-auto aspect-square object-contain mb-5 ${
                      products[1].image[1] && "-translate-x-10"
                    }`}
                  />
                  {products[1].image[1] && (
                    <CustomImage
                      src={products[1].image[1]}
                      width={100}
                      height={100}
                      alt={`banner-img-${products[1].id}`}
                      className="w-[50%] aspect-square object-contain absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-[70%]"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-5 justify-between items-end py-5 px-3">
                  <div className="space-y-5">
                    <h1 className="font-medium textBig2 text-right leading-7">
                      {products[1].name}
                    </h1>
                    <p className="textSmall3 text-right w-[70%] whitespace-normal break-words overflow-wrap ml-auto">
                      {truncateText(products[1].feature, 50)}
                    </p>
                  </div>
                  <Link
                    className="mt-1"
                    href={`/${findTopCategoryId(products[1].categoryId).id}/${
                      products[1].categoryId
                    }/${products[1].id}`}
                  >
                    <Button className="bg-secondary text-foreground rounded-md font-medium">
                      Подробно
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            {products[3] && (
              <div className="p-5 bg-primary w-2/6 rounded-xl flex flex-col gap-y-1">
                <div className="flex justify-between items-start">
                  <h1 className="font-medium textNormal4 leading-7">
                    {products[3].name}
                  </h1>
                  <Link
                    className="mt-1"
                    href={`/${findTopCategoryId(products[3].categoryId).id}/${
                      products[3].categoryId
                    }/${products[3].id}`}
                  >
                    <Button className="bg-secondary text-foreground px-3 h-8 rounded-md font-medium text-xs">
                      Подробно
                    </Button>
                  </Link>
                </div>
                <p className="textSmall2 w-[50%] whitespace-normal break-words overflow-wrap">
                  {truncateText(products[3].feature, 50)}
                </p>
                <div className="relative">
                  <CustomImage
                    src={products[3].image[0]}
                    width={100}
                    height={100}
                    alt={`banner-img-${products[3].id}`}
                    className={`w-[70%] mx-auto aspect-square object-contain mb-5 ${
                      products[3].image[1] && "-translate-x-10"
                    }`}
                  />
                  {products[3].image[1] && (
                    <CustomImage
                      src={products[3].image[1]}
                      width={100}
                      height={100}
                      alt={`banner-img-${products[3].id}`}
                      className="w-[60%] aspect-square object-contain absolute top-1/2 left-1/2 -translate-x-[15%] -translate-y-[70%]"
                    />
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </Container>
  );
};

export default Banner;
