import { api } from "@/api/axios";
import { z } from "zod";

export const customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string(),
});

export const usersResponseSchema =
  z.object({
    message: z.string(),
    data: z.array(customerSchema),
  });

export type Customer =
  z.infer<typeof customerSchema>;

export type CustomersResponse =
  z.infer<typeof usersResponseSchema>;

export async function getUsers(
  email?: string
): Promise<CustomersResponse> {
  let response;

  if (email) {
    response = await api.get<unknown>(
      "/users",
      {
        params: {
          email,
        },
      }
    );
  } else {
    response =
      await api.get<unknown>("/users");
  }

  return usersResponseSchema.parse(response);
}