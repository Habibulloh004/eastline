import db from "@/db/db";

export async function GET() {
  const getTopCategroies = await db.topCategory.findMany();
  return Response.json({ data: getTopCategroies });
}

export async function POST(req) {
  const data = await req.json();
  const createTopCategory = await db.topCategory.create({
    data,
  });
  return Response.json({ data: createTopCategory });
}
