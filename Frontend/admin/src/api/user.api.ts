import { api } from "@/api/axios";

export interface Customer {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface CustomersResponse {
  message: string;
  data: Customer[];
}

export async function getCustomers(): Promise<Customer[]> {
  const response = await api.get<CustomersResponse>(
    "/users"
  );

  return response.data;
}