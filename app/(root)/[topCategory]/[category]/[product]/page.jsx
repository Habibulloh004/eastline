import db from "@/db/db";
import { Button } from "@/components/ui/button";
import { f, getRandomItems, truncateText } from "@/lib/utils";
import ProductCarousel from "@/components/pages/product/products-carusel";
import { cardsLogoData } from "@/lib/iterationDetails";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import BannerProducts from "@/components/pages/product/banner-category";

const currency = await db.currency.findMany();
const products1 = await db.product.findMany();

const randomProducts = getRandomItems(products1);

const Product = async ({ params }) => {
  const { product } = params;

  const getCurrencySum = (dollar) => {
    if (currency.length) {
      const sum = currency[0].sum;
      return Number(sum) * Number(dollar);
    }
  };

  async function getProduct() {
    const products = await db.product.findMany({
      where: {
        id: Number(product),
      },
    });
    const category = await db.category.findMany({
      where: {
        id: Number(products[0].categoryId),
      },
    });
    return { products, category };
  }

  const productData = (await getProduct()).products;
  const categoryData = (await getProduct()).category;

  const { name, price, brand, description, feature } = productData[0];

  return (
    <main className="min-h-[50%] py-10 flex flex-col gap-4">
      <section className="w-[95%] lg:w-10/12 mx-auto lg:grid lg:grid-cols-9 gap-x-8 flex flex-col ">
        <div className="col-span-4 max-lg:hidden">
          <ProductCarousel item={productData[0]} />
        </div>
        <div className="col-span-3 space-y-3">
          <h1 className="font-bold textNormal4">{name}</h1>
          <p className="font-bold textNormal3">
            {f(getCurrencySum(price))} сум
          </p>
          <div className="lg:hidden col-span-4">
            <ProductCarousel item={productData[0]} />
          </div>
          <ul className="list-disc space-y-2 max-lg:hidden">
            <li className="ml-4 textSmall">{description}</li>{" "}
            {/* <li className="ml-4 textSmall">
              В основе камеры - светочувствительная матрица 1/2.7&quot;
              Progressive Scan CMOS, обеспечивающая запись с максимальным
              разрешением 1920x1080 пикселей. Камера имеет встроенный объектива
              с фиксированным фокусом 2.8 мм. Угол обзора камеры по горизонтали
              - 107°, а по вертикали 57°, по диагонали 126°.
            </li> */}
          </ul>
          <div className="flex gap-4">
            <p className="textSmall bg-primary rounded-md px-2 py-1 text-white">
              Доставка
            </p>
            <p className="textSmall bg-primary rounded-md px-2 py-1 text-white">
              Установка
            </p>
          </div>
          <ul className="textSmall2">
            <li>
              <strong>Код товара: </strong>HIKDS-2CD24
            </li>
            <li>
              <strong>Категория: </strong>
              {categoryData[0].name}
            </li>
            <li>
              <strong>Бренд: </strong>
              {brand}
            </li>
          </ul>
          <ul className="list-disc space-y-2 lg:hidden">
            <li className="ml-4 textSmall">{description}</li>{" "}
            {/* <li className="ml-4 textSmall">
              В основе камеры - светочувствительная матрица 1/2.7&quot;
              Progressive Scan CMOS, обеспечивающая запись с максимальным
              разрешением 1920x1080 пикселей. Камера имеет встроенный объектива
              с фиксированным фокусом 2.8 мм. Угол обзора камеры по горизонтали
              - 107°, а по вертикали 57°, по диагонали 126°.
            </li> */}
          </ul>
          <ul className="text-xl flex gap-3 max-lg:hidden">
            <li className="bg-border p-2 rounded-full items-block">
              <FaInstagram />
            </li>
            <li className="bg-border p-2 rounded-full items-block">
              <FaFacebookF />
            </li>
            <li className="bg-border p-2 rounded-full items-block">
              <FaYoutube />
            </li>
          </ul>
        </div>
        <div className="col-span-2 space-y-3">
          <div className="max-lg:hidden bg-secondary p-4 rounded-md space-y-3">
            <h1 className="font-bold textSmall2">Характеристика</h1>
            <p className="font-medium textSmall">{feature}</p>
            <hr className="border" />
            <p className="font-medium textSmall">
              Возможность оплаты с помощью
            </p>
            <div className="">
              {cardsLogoData.map((item, idx) => (
                <Image
                  key={idx}
                  width={100}
                  height={100}
                  className="w-14 inline-flex"
                  src={item}
                  alt="img"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col max-lg:justify-start max-lg:items-start gap-2 bg-secondary rounded-md p-4">
            <p className="textSmall cursor-pointer bg-black text-center inline-block text-secondary py-1 px-2 rounded-md">Больше инфо. при вызове</p>
            <a
              className="font-bold textSmall3"
              href="tel:(90) 933-78-80"
            >
              (90) 933-78-80
            </a>
            <a
              className="font-bold textSmall3"
              href="tel:(55) 510-81-33"
            >
              (55) 510-81-33
            </a>
          </div>
          <p className="underline font-medium textSmall">
            Доставляется с Ташкента
          </p>
        </div>
      </section>
      {/* <section className="w-[95%] lg:w-10/12 mx-auto">
        <ProductType productData={productData} />
      </section> */}
      <section className="w-[95%] lg:w-10/12 mx-auto space-y-4">
        <h1 className="text-primary textNormal3 font-bold">Другие товары</h1>
        <BannerProducts randomProducts={randomProducts} currency={currency} />
      </section>
    </main>
  );
};

export default Product;
