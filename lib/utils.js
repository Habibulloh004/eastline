import { createClient } from "@supabase/supabase-js";
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

export const supabase = createClient(
  "https://bxdxvaioiunezestlkri.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZHh2YWlvaXVuZXplc3Rsa3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5MzU5MDEsImV4cCI6MjAzODUxMTkwMX0.VVkuv29ktY8PERuJGKMS7CcjvrkFbhz-gssBkOznuBk"
);