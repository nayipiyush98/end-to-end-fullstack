import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Search } from "lucide-react";
import { SERVER_URL } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Product } from "@/api/product.api";

import { useUserStore } from "@/store/user.store";
import { useOrderStore } from "@/store/order.store";
import type { Customer } from "@/api/user.api";
import { useProductStore } from "@/store/product.store";

interface OrderItem {
  productId: number;
  qty: number;
  product: Product | null;
}

export function CreateOrderPage() {
  const navigate = useNavigate();

  const [customerEmail, setCustomerEmail] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);

  const isSearchingUsers = useUserStore((state) => state.isLoading);

  const searchUsers = useUserStore((state) => state.searchUsers);

  const clearUsers = useUserStore((state) => state.clearUsers);

  const users = useUserStore((state) => state.users);

  const createAdminOrder = useOrderStore((state) => state.createAdminOrder);

  const orderLoading = useOrderStore((state) => state.isLoading);

  const orderError = useOrderStore((state) => state.error);

  const [userId, setUserId] = useState("");

  const [items, setItems] = useState<OrderItem[]>([]);

  const [productDialogOpen, setProductDialogOpen] = useState(false);

  const [productSearch, setProductSearch] = useState("");

  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const [shippingAddress, setShippingAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const searchProducts = useProductStore((state) => state.searchProducts);

  const clearSearchProducts = useProductStore(
    (state) => state.clearSearchProducts,
  );

  const searchResults = useProductStore((state) => state.searchResults);

  const isSearchingProducts = useProductStore((state) => state.isLoading);

  useEffect(() => {
    if (!productDialogOpen) {
      return;
    }

    const search = productSearch.trim();

    if (search.length < 2) {
      clearSearchProducts();
      return;
    }

    const timer = setTimeout(() => {
      searchProducts(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [productSearch, productDialogOpen, searchProducts, clearSearchProducts]);

  const products = useProductStore((state) => state.products);

  const clearProducts = useProductStore((state) => state.clearProducts);

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
  }, [customerEmail, selectedCustomer, searchUsers, clearUsers]);

  const handleSelectProduct = (product: Product) => {
    if (activeItemIndex === null) {
      return;
    }

    setItems((current) =>
      current.map((item, index) =>
        index === activeItemIndex
          ? {
              ...item,
              productId: product.id,
              product,
            }
          : item,
      ),
    );

    setProductDialogOpen(false);
    setProductSearch("");
    setActiveItemIndex(null);
    clearProducts();
  };

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        productId: 0,
        qty: 1,
        product: null,
      },
    ]);
  };

  const updateItem = (index: number, field: keyof OrderItem, value: number) => {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const selectProduct = (index: number, product: Product) => {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              productId: product.id,
              product,
            }
          : item,
      ),
    );

    setProductDialogOpen(false);
    setProductSearch("");
    clearSearchProducts();
    setActiveItemIndex(null);
  };

  const removeItem = (index: number) => {
    setItems((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const canSubmit = useMemo(() => {
    return (
      Number(userId) > 0 &&
      items.length > 0 &&
      items.every((item) => item.productId > 0 && item.qty > 0) &&
      shippingAddress.trim().length >= 5 &&
      paymentMethod.trim().length > 0
    );
  }, [userId, items, shippingAddress, paymentMethod]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    try {
      await createAdminOrder({
        userId: Number(userId),
        items,
        shippingAddress: shippingAddress.trim(),
        paymentMethod,
      });

     navigate("/admin/orders");
    } catch (error) {
      console.error("CREATE ADMIN ORDER ERROR:", error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Order</h1>

        <p className="text-muted-foreground">Create an order for a customer.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
        </CardHeader>

        <CardContent>
          {selectedCustomer ? (
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">{selectedCustomer.email}</p>
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
                      <p className="text-sm font-medium">{user.email}</p>

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

          <Button type="button" variant="outline" onClick={addItem}>
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
    className="rounded-xl border p-4"
  >
    {item.product ? (
      <div className="flex items-center gap-5">
        {/* Product Image */}
        {item.product.images?.[0] ? (
          <img
            src={`${SERVER_URL}${item.product.images[0]}`}
            alt={item.product.name}
            className="h-16 w-16 shrink-0 rounded-lg border object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border bg-muted text-xs text-muted-foreground">
            No image
          </div>
        )}

        {/* Product Details */}
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold">
            {item.product.name}
          </p>

          <div className="mt-2 flex items-center gap-4">
            <span className="text-sm font-medium">
              ₹{item.product.price}
            </span>

            <span className="text-sm text-muted-foreground">
              Stock: {item.product.stock}
            </span>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Quantity
          </span>

          <Input
            type="number"
            min={1}
            max={item.product.stock}
            value={item.qty}
            onChange={(event) =>
              updateItem(
                index,
                "qty",
                Number(event.target.value)
              )
            }
            className="w-20"
          />
        </div>

        {/* Delete */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => removeItem(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ) : (
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">
            Product not selected
          </p>

          <p className="text-sm text-muted-foreground">
            Search and select a product
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setActiveItemIndex(index);
            setProductSearch("");
            clearSearchProducts();
            setProductDialogOpen(true);
          }}
        >
          Select Product
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => removeItem(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )}
  </div>
))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={productDialogOpen}
        onOpenChange={(open) => {
          if (!isSearchingProducts) {
            setProductDialogOpen(open);

            if (!open) {
              setProductSearch("");
              setActiveItemIndex(null);
              clearProducts();
            }
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Select Product</DialogTitle>

            <DialogDescription>
              Search for a product by name or SKU.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={productSearch}
                onChange={(event) => setProductSearch(event.target.value)}
                placeholder="Search product..."
                className="pl-9"
                autoFocus
              />
            </div>

            {isSearchingProducts && (
              <p className="text-sm text-muted-foreground">
                Searching products...
              </p>
            )}

            {!isSearchingProducts &&
              productSearch.trim().length >= 2 &&
              products.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No products found.
                </p>
              )}

            <div className="max-h-80 space-y-2 overflow-y-auto">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelectProduct(product)}
                  className="flex w-full items-center gap-3 rounded-md border p-3 text-left transition hover:bg-muted"
                >
                  {product.images?.[0] ? (
                    <img
                      src={`${SERVER_URL}${product.images[0]}`}
                      alt={product.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xs">
                      No image
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>

                    <p className="text-xs text-muted-foreground">
                      SKU: {product.sku}
                    </p>

                    <p className="text-sm">₹{product.price}</p>
                  </div>

                  <div className="text-right text-xs">
                    <p
                      className={
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      Stock: {product.stock}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
              onChange={(event) => setShippingAddress(event.target.value)}
              placeholder="Ahmedabad, Gujarat, India"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="COD">COD</SelectItem>

                <SelectItem value="ONLINE">Online</SelectItem>
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
         onClick={() => navigate("/admin/orders")}
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled={!canSubmit || orderLoading}
          onClick={handleSubmit}
        >
          {orderLoading ? "Creating..." : "Create Order"}
        </Button>
      </div>
    </div>
  );
}
