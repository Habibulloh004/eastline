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
            id: data.categoryId,
          },
        },
      },
    });
  
    return Response.json({ data: createProduct });
  }
  
