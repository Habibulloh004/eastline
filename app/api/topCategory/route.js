import db from "@/db/db";

export async function DELETE(req) {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    const deleteTopCategory = await db.topCategory.delete({
      where: { id: Number(id) },
    });
    console.log(deleteTopCategory);
    console.log(id);

    return new Response(
      JSON.stringify({ success: true, data: deleteTopCategory }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  const getTopCategroies = await db.topCategory.findMany({
    include: {
      categories: true,
    },
  });
  return Response.json({ data: getTopCategroies });
}

export async function POST(req) {
  const data = await req.json();
  const createTopCategory = await db.topCategory.create({
    data,
  });
  console.log("error", createTopCategory);
  return Response.json({ data: createTopCategory });
}
