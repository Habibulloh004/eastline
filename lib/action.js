"use server";

import db from "@/db/db";

export async function createReview(formData) {
  console.log("Received form data:", formData);
  const data = {
    name: formData.get("name"),
    phone: "+999999",
    email: formData.get("email"),
    message: formData.get("message"),
  };
  const response = await db.reviews.create({
    data,
  });
  console.log(response);
}
