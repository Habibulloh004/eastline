import db from "@/db/db";

export async function GET() {
  const getTopCategroies = await db.category.findMany();
  return Response.json({ data: getTopCategroies });
}

export async function POST(req) {
  const data = await req.json();
  console.log(data);
  const createCategory = await db.category.create({
    data: {
      name: data.name,
      topCategory: {
        connect: {
          id: Number(data.topCategoryId),
        },
      },
      image: data.image
    },
  });
  return Response.json({ data: createCategory });
}
