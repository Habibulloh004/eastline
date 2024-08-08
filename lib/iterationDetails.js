import { Category, Product, TopCategory } from "./validation";

const navItems = [
  { id: 1, name: "Главная", path: "/" },
  { id: 2, name: "Каталог", path: "/" },
  { id: 3, name: "Услуги", path: "/services" },
  { id: 4, name: "О нас", path: "/about-us" },
  { id: 5, name: "Контакты", path: "/contacts" },
  //   { id: 3, name: "Партнёры", path: "/" },
];

const heroTitle = [
  { id: 3, name: "Услуги", path: "/services" },
  { id: 4, name: "О нас", path: "/about-us" },
  { id: 5, name: "Контакты", path: "/contacts" },
  //   { id: 3, name: "Партнёры", path: "/" },
];

const crudPage = [
  { id: 1, title: "Создать верхнюю категорию", path: "/createTopCategory" },
  { id: 2, title: "Обновить верхнюю категорию", path: "/changeTopCategory" },
  { id: 3, title: "Создать категорию", path: "/createCategory" },
  { id: 4, title: "Обновить категорию", path: "/changeCategory" },
  { id: 5, title: "Создать товар", path: "/createProduct" },
  { id: 6, title: "Обновить товар", path: "/changeProduct" },
];

const postFields = [
  {
    id: 1,
    name: "Создать верхнюю категорию",
    path: "/createTopCategory",
    items: ["INPUT"],
    validation: TopCategory
  },
  {
    id: 2,
    name: "Создать категорию",
    path: "/createCategory",
    items: ["INPUT", "SELECT"],
    validation: Category
  },
  {
    id: 3,
    name: "Создать товар",
    path: "/createProduct",
    items: ["INPUT", "TEXTAREA", "INPUT", "INPUT", "INPUT", "IMAGE", "SELECT"],
    validation: Product
  }
];

export { navItems, heroTitle, crudPage, postFields };
