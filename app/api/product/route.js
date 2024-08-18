import db from "@/db/db";

export async function GET() {
  const getProducts = await db.product.findMany();
  return Response.json({ data: getProducts });
}

export async function POST(req) {
  const data = await req.json();

  const createProduct = await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      feature: data.feature,
      price: data.price,
      brand: data.brand,
      image: data.images,
      category: {
        connect: {
          id: Number(data.categoryId),
        },
      },
    },
  });

  return Response.json({ data: createProduct });
}

export async function DELETE(req) {
  try {
    console.log(req);
    // const id = await req.nextUrl.searchParams.get("id");
    // const deleteTopCategory = await db.topCategory.delete({
    //   where: { id: Number(id) },
    // });
    // console.log(deleteTopCategory);
    // console.log(id);

    return new Response(
      JSON.stringify({ success: true, data: "deleteTopCategory" }),
      { status: 200 }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
