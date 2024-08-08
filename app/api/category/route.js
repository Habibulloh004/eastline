import db from "@/db/db";

export async function GET() {
  const getTopCategroies = await db.category.findMany();
  return Response.json({ data: getTopCategroies });
}

export async function POST(req) {
  const data = await req.json();
  const createCategory = await db.category.create({
    data,
  });
  return Response.json({ data: createCategory });
}
