"use client";

import { AboutBanner, productImage } from "@/public/img";
import Image from "next/image";
import React, { useState } from "react";

const info = ` Матрица: 1/2.7" Progressive Scan CMOS; Разрешение: 1920x1080;
            Чувствительность: 0.028 Лк (AGC вкл); Фокусное расстояние: 2.8 мм;
            Тип подсветки: ИК; Дальность подсветки: 10 м; Видео компрессия:
            H.265+, H.264+; Подавление шума: 3D DNR; Локальное хранение: microSD
            до 256 Гб; Ethernet:1 RJ45 10M/100M; PoE: 802.3af, class 3; Диапазон
            рабочих температур: -10°C - +40°C; Габариты: 102.9×65.2×32.6 мм;
            Вес: 120 г. Модель DS-2CD2421G0-I 2.8 мм Производитель Hikvision Тип
            камеры Кубические, Домашние Особенности настольная Установка на
            улице Нет Матрица 2 Mp Progressive Scan CMOS Размер матрицы 1/2.7"
            Эффективных пикселей 1920x1080 ИК фильтр Да Чувствительность Цвет:
            0.028 Lux @ (F2.0, AGC вкл.) Подсветка Инфракрасная Дальность
            подсветки 10 м Количество светодиодов 1 шт. Тип объектива
            Фиксированный Объектив 2.8 мм Углы обзора горизонтальный: 107°;
            вертикальный: 57°; по-диагонали: 126° Диафрагма F2.0 Вращение при
            монтаже поворот: 0° ~ 360°, наклон: 0° ~ 90°, вращение: 0° ~ 360°
            Триггеры тревоги обнаружение движения, изменение сцены, отключение
            сети, конфликт IP-адресов, незаконный доступ, ошибка хранения
            Действие при тревоге загрузка на FTP/NAS/карту памяти, уведомление
            центра наблюдения, запись видео, захват видео, звуковое
            предупреждение Видео кодек H.265+, H.265, H.264+, H.264, MJPEG
            Скорость передачи 32 Кбит/с~8 Mбит/с Аудио сжатие G.711, G.722.1,
            G.726, PCM, MP2L2 Максимальное разрешение 1080P Количество пикселей
            1920x1080 Возможные разрешения 1080p (1920x1080), 720p (1280x720),
            WQVGA (640x360) Скорость записи Главный поток: 25/30 к/с (1920x1080,
            1280x720); Дополнительный поток: 25/30 к/с (640x360) Настройка
            изображения яркость, насыщенность, контрастность, резкость Режим
            день/ночь Есть Компенсация засветки BLC, HLC, D-WDR Регулировка
            усиления AGC Система шумоподавления 3D-DNR Баланс белого авто,
            ручная настройка Обнаружение движения Видеодетектор движения, ИК
            датчик движения Функции анти-мерцание, медленный затвор, зеркальное
            отображение Приватные зоны + Встроенный микрофон Да Встроенный
            динамик Да Подключение к сети RJ45 Слот для карты памяти Да Карта
            памяти microSD до 256 Гб Сетевое хранилище NAS (NFS,SMB/CIFS), ANR
            Сетевые протоколы TCP/IP, ICMP, DHCP, DNS, DDNS, RTP, RTSP, NTP,
            UPnP, SMTP, IGMP, IPv6, UDP, QoS, Bonjour Поддерживаемые протоколы
            ONVIF, ISAPI, SDK Одновременных подключений 6 Питание по POE Да
            Рабочая температура -10°C - +40°C Рабочая влажность до 95% Материал
            Пластик Размеры 102.8x65.2x32.6 мм Вес 120 г`;

const data = [
  {
    id: 1,
    title: "Описания",
  },
  {
    id: 2,
    title: "Характеристика",
  },
];

const ProductType = ({ productData }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleActiveTab = (id) => {
    setActiveTab(id);
  };

  const formattedInfo = info.split(";").map((item, index) => (
    <React.Fragment key={index}>
      {item.trim()}
      <br />
    </React.Fragment>
  ));

  return (
    <main className="flex flex-col gap-5 pt-5">
      <div className="flex gap-3">
        {data.map((item, idx) => (
          <div key={idx} onClick={() => handleActiveTab(item.id)}>
            <button
              className={
                activeTab === item.id
                  ? "font-bold text-black textNormal"
                  : "textNormal"
              }
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        {activeTab === 1 && (
          <aside className="space-y-4">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
              facere ipsam mollitia. Dolorem, ducimus culpa quod nemo,
              voluptatem alias iusto, omnis quaerat iste sunt excepturi esse
              amet quisquam similique sequi!Lorem Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Neque eligendi voluptate veritatis
              atque recusandae at aliquid in perspiciatis a, quaerat iusto, id
              optio quasi consequuntur? Ipsum, consectetur? Inventore, error
              dolore.
            </p>
            {/* <CustomImage
              url={`${productData[0].image[0]}`}
              title={`img`}
              className={"w-full h-[400px] caption-top"}
            /> */}
            <Image
              src={AboutBanner}
              alt="ddd"
              width={100}
              height={100}
              className="w-full h-[300px] rounded-md border"
            />
            <div className="space-y-3">
              <h1 className="font-bold textNormal">
                Основное назначение Hikvision DS-2CD2421G0-I
              </h1>
              <p>
                Камера Hikvision DS-2CD2421G0-I разработана для внутреннего
                мониторинга за домом, квартирой или офисом. С ее помощью можно
                контролировать и наблюдать за домашними питомцами, общаться с
                детьми, которые остаются одни дома и даже контролировать работу
                в офисе. Оптимальная температура для ее работы -10° C - +40° C.
                <br />
                <br />
                Для улучшения видео, видеокамера использует такие функции как
                цифровой широкий динамический диапазон, компенсация внешней
                засветки (фоновой и точечной), трехмерное шумоподавление.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Image
                  src={productImage}
                  alt="ddd"
                  width={100}
                  height={100}
                  className="w-full h-[300px] rounded-md border"
                />{" "}
                <Image
                  src={productImage}
                  alt="ddd"
                  width={100}
                  height={100}
                  className="w-full h-[300px] rounded-md border"
                />
              </div>
            </div>
          </aside>
        )}
        {activeTab === 2 && <p>{formattedInfo}</p>}
        {/* {activeTab === 1 && <p>{productData[0].description}</p>}
        {activeTab === 2 && <p>{productData[0].brand}</p>} */}
      </div>
    </main>
  );
};

export default ProductType;