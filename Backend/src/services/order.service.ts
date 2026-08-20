import { NEVER } from "zod";
import { prisma } from "../config/db.js";
import type { CancelOrderInput, CreateOrderInput, GetOrdersQuery, UpdateOrderStatusInput } from "../zod/orderZod.js";

export async function createOrderService(
  userId: number,
  data: CreateOrderInput,
) {
  const productIds = data.items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
      isArchived: false,
    },
  });

  if (products.length !== productIds.length) {
    throw new Error("One or more products are unavailable.");
  }

  const productMap = new Map(products.map((product) => [product.id, product]));

  let total = 0;

  const orderItems = data.items.map((item) => {
    const product = productMap.get(item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} not found.`);
    }

    if (product.stock < item.qty) {
      throw new Error(`Insufficient stock for product "${product.name}".`);
    }

    const itemTotal = Number(product.price) * item.qty;

    total += itemTotal;

    return {
      productId: product.id,
      qty: item.qty,
      price: product.price,
    };
  });

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        total,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,

        items: {
          create: orderItems,
        },

        statusHistory: {
          create: {
            status: "PENDING",
          },
        },
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      statusHistory: {
      orderBy: {
        createdAt: "asc",
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
  });

  return order;
}

export async function getOrdersService(
  authId: number,
  AuthType: "CUSTOMER" | "ADMIN",
  query: GetOrdersQuery,
) {
  const { page, limit, status, userId } = query;

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


export async function getOrderByIdService(
  orderId: number,
  authId: number,
  authType: "ADMIN" | "CUSTOMER"
) {
  const where: {
    id: number;
    userId?: number;
  } = {
    id: orderId,
  };

  // Customer can only access their own order
  if (authType === "CUSTOMER") {
    where.userId = authId;
  }

  const order = await prisma.order.findFirst({
    where,

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
              price: true,
              images: true,
            },
          },
        },
      },

      statusHistory: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
}

export async function updateOrderStatusService(
  orderId: number,
  data: UpdateOrderStatusInput
) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === data.status) {
    throw new Error(
      `Order is already ${data.status}`
    );
  }

  const updatedOrder = await prisma.$transaction(
    async (tx) => {
      const updated = await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: data.status,
        },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId: orderId,
          status: data.status,
        },
      });

      return updated;
    }
  );

  return updatedOrder;
}

export async function cancelOrderService(
  orderId:number,
  authId:number,
  authType:"ADMIN" | "CUSTOMER",
  data:CancelOrderInput) {
    const order = await prisma.order.findUnique({
      where:{
        id:orderId
      }
    })

    if(!order) {
      throw new Error("order not found")
    }

    if(authType === "CUSTOMER" && order.userId !== authId){
      throw new Error("order not found")
    }

    if(order.status === "CANCELLED"){
      throw new Error("order is already cancelled")
    }

    if(authType === "CUSTOMER" && order.status !== "PENDING"){
      throw new Error("Customer can only cancel an order before it is shipped")
    }

    const cancelOrder = await prisma.$transaction(
      async(tx) => {
        const updateOrder = await tx.order.update({
          where:{
            id:orderId
          },
          data:{
            status:"CANCELLED",
            cancelReason:data.reason,
            cancelledAt:new Date()
          }
        });
        await tx.orderStatusHistory.create({
          data:{
            orderId,
            status:"CANCELLED"
          }
        })
        return updateOrder
      }
    )
    return cancelOrder
}