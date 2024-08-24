import db from "@/db/db";

export async function GET(req) {
  const id = await req.nextUrl.searchParams.get("id");
  if (id) {
    const getProducts = await db.product.findMany({
      where: { id: Number(id) },
    });
    return Response.json({ data: getProducts });
  } else {
    const getProducts = await db.product.findMany();
    return Response.json({ data: getProducts });
  }
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
    console.log(req, "product");
    const id = await req.nextUrl.searchParams.get("id");
    const deleteTopCategory = await db.product.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({ success: true, data: "deleteProduct" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  const data = await req.json();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const updateProduct = await db.product.update({
      where: { id: Number(id) },
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

    return new Response(
      JSON.stringify({ success: true, data: updateProduct }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
