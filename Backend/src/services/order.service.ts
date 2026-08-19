import {prisma} from "../config/db.js"
import type { CreateOrderInput, GetOrdersQuery } from "../zod/orderZod.js"

export async function createOrderService(userId:number,data:CreateOrderInput){
    const productIds = data.items.map(
        (item) => item.productId
    );

    const products = await prisma.product.findMany({
        where:{
            id:{
                in:productIds
            },
            isArchived:false,
        }
    });

     if (products.length !== productIds.length) {
    throw new Error(
      "One or more products are unavailable."
    );
  }

   const productMap = new Map(
    products.map((product) => [
      product.id,
      product,
    ])
  );

  let total = 0;

  const orderItems = data.items.map((item) => {
    const product = productMap.get(
      item.productId
    );


    if (!product) {
      throw new Error(
        `Product ${item.productId} not found.`
      );
    }

    if (product.stock < item.qty) {
      throw new Error(
        `Insufficient stock for product "${product.name}".`
      );
    }

    const itemTotal =
      Number(product.price) * item.qty;

    total += itemTotal;

    return {
      productId: product.id,
      qty: item.qty,
      price: product.price,
    };
  });

   const order = await prisma.$transaction(
    async (tx) => {
      const createdOrder =
        await tx.order.create({
          data: {
            userId,
            total,
            shippingAddress:
              data.shippingAddress,
            paymentMethod:
              data.paymentMethod,

            items: {
              create: orderItems,
            },
          },

          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });

      for (const item of data.items) {
        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.qty,
            },
          },
        });
            }

      return createdOrder;
    }
  );

  return order;
}


export async function getOrdersService(
  authId: number,
  AuthType: "CUSTOMER" | "ADMIN",
  query: GetOrdersQuery
) {
  const {
    page,
    limit,
    status,
    userId,
  } = query;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (AuthType === "CUSTOMER") {
    where.userId = authId;
  }


  if (AuthType === "ADMIN" && userId) {
    where.userId = userId;
  }


  if (status) {
    where.status = status;
  }

  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
              },
            },
          },
        },

        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),

    prisma.order.count({
      where,
    }),
  ]);

  return {
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}