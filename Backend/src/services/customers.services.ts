import { prisma } from "../config/db.js";

export async function getCustomersService(
  page: number,
  limit: number,
  search?: string
) {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,

      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,

        _count: {
          select: {
            orders: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    customers: customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      createdAt: customer.createdAt,
      orderCount: customer._count.orders,
    })),

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    },
  };
}


export async function getCustomerByIdService(id: number) {
  const customer = await prisma.user.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,

      _count: {
        select: {
          orders: true,
        },
      },

      orders: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          total: true,
          status: true,
          shippingAddress: true,
          paymentMethod: true,
          cancelReason: true,
          cancelledAt: true,
          createdAt: true,

          items: {
            select: {
              id: true,
              qty: true,
              price: true,

              product: {
                select: {
                  id: true,
                  name: true,
                  sku: true,
                  images: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!customer) {
    return null;
  }

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    createdAt: customer.createdAt,

    totalOrders: customer._count.orders,

    orders: customer.orders,
  };
}


export async function updateCustomerStatusService(
  id: number,
  isActive: boolean
) {
  const customer = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!customer) {
    return null;
  }

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
    },
  });
}