import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function decoded(text) {
  return decodeURIComponent(text);
}

export function truncateText(text, maxLength = 50) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export const getLastProducts = (products) => {
  return products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
};

export const f = new Intl.NumberFormat("en-EN").format;
