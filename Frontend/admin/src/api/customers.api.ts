import { api } from "@/api/axios";

export interface Customer {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  orderCount: number;
}

export interface CustomerPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CustomersResponse {
  message: string;
  data: {
    customers: Customer[];
    pagination: CustomerPagination;
  };
}

export async function getCustomers(
  page = 1,
  limit = 10,
  search?: string
): Promise<CustomersResponse> {
  const response = await api.get<CustomersResponse>(
    "/customers",
    {
      params: {
        page,
        limit,
        ...(search
          ? { search }
          : {}),
      },
    }
  );

  return response;
}