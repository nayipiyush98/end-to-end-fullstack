import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUserStore } from "@/store/user.store";
import { useOrderStore } from "@/store/order.store";
import type { Customer } from "@/api/user.api";

interface OrderItem {
  productId: number;
  qty: number;
}

export function CreateOrderPage() {
  const navigate = useNavigate();


const [customerEmail, setCustomerEmail] =
  useState("");

const [selectedCustomer, setSelectedCustomer] =
  useState<Customer | null>(null);

const [customerDialogOpen, setCustomerDialogOpen] =
  useState(false);

const isSearchingUsers = useUserStore(
  (state) => state.isLoading
);

const searchUsers = useUserStore(
  (state) => state.searchUsers
);

const clearUsers = useUserStore(
  (state) => state.clearUsers
);

  const users = useUserStore(
    (state) => state.users
  );

  const createAdminOrder = useOrderStore(
    (state) => state.createAdminOrder
  );

  const orderLoading = useOrderStore(
    (state) => state.isLoading
  );

  const orderError = useOrderStore(
    (state) => state.error
  );

  const [userId, setUserId] = useState("");

  const [items, setItems] = useState<OrderItem[]>([]);

  const [shippingAddress, setShippingAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

 useEffect(() => {
  if (selectedCustomer) {
    return;
  }

  const email = customerEmail.trim();

  if (email.length < 2) {
    clearUsers();
    return;
  }

  const timer = setTimeout(() => {
    searchUsers(email);
  }, 500);

  return () => {
    clearTimeout(timer);
  };
}, [
  customerEmail,
  selectedCustomer,
  searchUsers,
  clearUsers,
]);

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        productId: 0,
        qty: 1,
      },
    ]);
  };

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: number
  ) => {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeItem = (index: number) => {
    setItems((current) =>
      current.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  const canSubmit = useMemo(() => {
    return (
      Number(userId) > 0 &&
      items.length > 0 &&
      items.every(
        (item) =>
          item.productId > 0 &&
          item.qty > 0
      ) &&
      shippingAddress.trim().length >= 5 &&
      paymentMethod.trim().length > 0
    );
  }, [
    userId,
    items,
    shippingAddress,
    paymentMethod,
  ]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    try {
      await createAdminOrder({
        userId: Number(userId),
        items,
        shippingAddress:
          shippingAddress.trim(),
        paymentMethod,
      });

      navigate("/orders");
    } catch (error) {
      console.error(
        "CREATE ADMIN ORDER ERROR:",
        error
      );
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Create Order
        </h1>

        <p className="text-muted-foreground">
          Create an order for a customer.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
        </CardHeader>

<CardContent>
  {selectedCustomer ? (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div>
        <p className="text-sm font-medium">
          {selectedCustomer.email}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setSelectedCustomer(null);
          setCustomerEmail("");
          clearUsers();
        }}
      >
        Change
      </Button>
    </div>
  ) : (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        clearUsers();
        setCustomerEmail("");
        setCustomerDialogOpen(true);
      }}
      className="w-full justify-start"
    >
      Select Customer
    </Button>
  )}
</CardContent>
      </Card>
      <Dialog
  open={customerDialogOpen}
  onOpenChange={(open) => {
    setCustomerDialogOpen(open);

    if (!open) {
      clearUsers();
      setCustomerEmail("");
    }
  }}
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Select Customer</DialogTitle>

      <DialogDescription>
        Search for a customer by email and select them.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
      <Input
        value={customerEmail}
        onChange={(event) => {
          setCustomerEmail(event.target.value);
        }}
        placeholder="Search customer by email..."
        autoFocus
      />

      {isSearchingUsers && (
        <p className="text-sm text-muted-foreground">
          Searching customers...
        </p>
      )}

      {!isSearchingUsers &&
        customerEmail.trim().length >= 2 &&
        users.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No customers found.
          </p>
        )}

      {users.length > 0 && (
        <div className="max-h-64 overflow-y-auto rounded-md border">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              className="flex w-full items-center justify-between border-b px-3 py-3 text-left last:border-b-0 hover:bg-muted"
              onClick={() => {
                setSelectedCustomer(user);
                setCustomerEmail(user.email);
                setUserId(String(user.id));

                clearUsers();
                setCustomerDialogOpen(false);
              }}
            >
              <div>
                <p className="text-sm font-medium">
                  {user.email}
                </p>

                <p className="text-xs text-muted-foreground">
                  Customer ID: {user.id}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  </DialogContent>
</Dialog>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order Items</CardTitle>

          <Button
            type="button"
            variant="outline"
            onClick={addItem}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </CardHeader>

        <CardContent>
          {items.length === 0 ? (
            <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
              No products added.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <Input
                    type="number"
                    min={1}
                    placeholder="Product ID"
                    value={
                      item.productId || ""
                    }
                    onChange={(event) =>
                      updateItem(
                        index,
                        "productId",
                        Number(
                          event.target.value
                        )
                      )
                    }
                  />

                  <Input
                    type="number"
                    min={1}
                    placeholder="Quantity"
                    value={item.qty}
                    onChange={(event) =>
                      updateItem(
                        index,
                        "qty",
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-32"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      removeItem(index)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping & Payment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Shipping Address
            </label>

            <Input
              value={shippingAddress}
              onChange={(event) =>
                setShippingAddress(
                  event.target.value
                )
              }
              placeholder="Ahmedabad, Gujarat, India"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="COD">
                  COD
                </SelectItem>

                <SelectItem value="ONLINE">
                  Online
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {orderError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {orderError}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={orderLoading}
          onClick={() => navigate("/orders")}
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled={
            !canSubmit || orderLoading
          }
          onClick={handleSubmit}
        >
          {orderLoading
            ? "Creating..."
            : "Create Order"}
        </Button>
      </div>
    </div>
  );
}

