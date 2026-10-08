import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Product, OrderItem } from "../backend/Products";
import {
  getOrders,
  updateOrderStatus as updateOrderStatusInFirestore,
} from "../services/ordersService";
import {
  saveProduct as saveProductToFirestore,
  deleteProduct as deleteProductFromFirestore,
} from "../services/productsService";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./adminPage.css";

type AdminPageProps = {
  orders: OrderItem[];
  setOrders: Dispatch<SetStateAction<OrderItem[]>>;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

type ProductColor = {
  name: string;
  value: string;
  images: string[];
};

type ColorForm = {
  name: string;
  value: string;
  existingImages: string[];
  files: File[];
};

type ProductForm = {
  name: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
  description: string;
  sizes: string[];
  colors: ColorForm[];
};

type ChartPoint = {
  label: string;
  value: number;
};

type StatusChartItem = {
  label: string;
  value: number;
  className: string;
};

type TopProduct = {
  name: string;
  quantity: number;
  revenue: number;
  image: string;
};

type CategoryData = {
  name: string;
  value: number;
};

const categories = [
  "T-Shirts",
  "Shirts",
  "Hoodies",
  "Sweatshirts",
  "Jackets",
  "Pants",
  "Trousers",
  "Jeans",
  "Shorts",
  "Sets",
  "Accessories",
];

const availableSizes = ["S", "M", "L", "XL", "XXL"];

const createEmptyForm = (): ProductForm => ({
  name: "",
  price: 0,
  category: "T-Shirts",
  stock: 0,
  sold: 0,
  description: "New WIKI product.",
  sizes: [...availableSizes],
  colors: [
    {
      name: "Black",
      value: "#111111",
      existingImages: [],
      files: [],
    },
  ],
});

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error(`Failed to read ${file.name}`));
      }
    };

    reader.onerror = () => {
      reject(new Error(`Failed to read ${file.name}`));
    };
  });
}

function parseOrderDate(value: unknown): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    const date = (value as { toDate: () => Date }).toDate();

    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

function formatMoney(value: number) {
  return `${Math.round(value).toLocaleString("en-US")} DH`;
}

export function AdminPage({
  orders,
  setOrders,
  products,
  setProducts,
}: AdminPageProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [form, setForm] = useState<ProductForm>(createEmptyForm());

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  const [isSavingProduct, setIsSavingProduct] = useState(false);

  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null,
  );

  const [updatingProductId, setUpdatingProductId] = useState<number | null>(
    null,
  );

  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [activeSection, setActiveSection] = useState<
    "dashboard" | "analytics" | "products" | "orders" | "customers"
  >("dashboard");

  const [imagePreviewUrls, setImagePreviewUrls] = useState<
    Record<string, string[]>
  >({});

  const messageTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();

        setOrders(data);
      } catch {
        showMessage("Failed to load orders from Firebase.", "error");
      }
    }

    void loadOrders();
  }, [setOrders]);

  useEffect(() => {
    const nextUrls: Record<string, string[]> = {};

    form.colors.forEach((color, colorIndex) => {
      nextUrls[colorIndex] = color.files.map((file) =>
        URL.createObjectURL(file),
      );
    });

    setImagePreviewUrls(nextUrls);

    return () => {
      Object.values(nextUrls)
        .flat()
        .forEach((url) => URL.revokeObjectURL(url));
    };
  }, [form.colors]);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current !== null) {
        window.clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const showMessage = (text: string, type: "success" | "error") => {
    if (messageTimeoutRef.current !== null) {
      window.clearTimeout(messageTimeoutRef.current);
    }

    setMessage(text);
    setMessageType(type);

    messageTimeoutRef.current = window.setTimeout(() => {
      setMessage("");
      messageTimeoutRef.current = null;
    }, 4000);
  };

  const clearMessage = () => {
    if (messageTimeoutRef.current !== null) {
      window.clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }

    setMessage("");
  };

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await signOut(auth);
    } catch {
      showMessage("Logout failed. Please try again.", "error");
      setIsLoggingOut(false);
    }
  }

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + (Number.isFinite(product.stock) ? product.stock : 0),
    0,
  );

  const totalSold = products.reduce(
    (total, product) =>
      total + (Number.isFinite(product.sold) ? product.sold : 0),
    0,
  );

  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) =>
        total + (Number.isFinite(order.total) ? order.total : 0),
      0,
    );

  const customers = useMemo(() => {
    const customerMap = new Map<
      string,
      {
        name: string;
        phone: string;
        email: string;
        address: string;
        city: string;
        orders: number;
        spent: number;
      }
    >();

    orders.forEach((order) => {
      const phone = order.customer?.phone?.trim() ?? "";
      const email = order.customer?.email?.trim().toLowerCase() ?? "";

      const key = phone || email;

      if (!key) return;

      const existing = customerMap.get(key);

      if (existing) {
        existing.orders += 1;

        if (order.status !== "Cancelled") {
          existing.spent += Number.isFinite(order.total) ? order.total : 0;
        }
      } else {
        customerMap.set(key, {
          name: order.customer?.name ?? "Unknown customer",
          phone,
          email,
          address: order.customer?.address ?? "",
          city: order.customer?.city ?? "",
          orders: 1,
          spent:
            order.status === "Cancelled"
              ? 0
              : Number.isFinite(order.total)
                ? order.total
                : 0,
        });
      }
    });

    return Array.from(customerMap.values());
  }, [orders]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const lowStockProducts = useMemo(
    () => products.filter((product) => product.stock <= 5),
    [products],
  );

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === "Pending"),
    [orders],
  );

  const processingOrders = useMemo(
    () => orders.filter((order) => order.status === "Processing"),
    [orders],
  );

  const deliveredOrders = useMemo(
    () => orders.filter((order) => order.status === "Delivered"),
    [orders],
  );

  /*
   * Analytics data is calculated from real orders and products.
   */
  const analyticsCharts = useMemo(() => {
    const now = new Date();

    const months: {
      key: string;
      label: string;
    }[] = [];

    for (let index = 5; index >= 0; index -= 1) {
      const date = new Date(now.getFullYear(), now.getMonth() - index, 1);

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`;

      const label = date.toLocaleDateString("en-US", {
        month: "short",
      });

      months.push({
        key,
        label,
      });
    }

    const revenueMap = new Map<string, number>();
    const ordersMap = new Map<string, number>();

    months.forEach((month) => {
      revenueMap.set(month.key, 0);
      ordersMap.set(month.key, 0);
    });

    orders.forEach((order) => {
      const date = parseOrderDate(order.createdAt);

      if (!date) return;

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`;

      if (!ordersMap.has(key)) return;

      ordersMap.set(key, (ordersMap.get(key) ?? 0) + 1);

      if (order.status !== "Cancelled") {
        const orderTotal = Number(order.total) || 0;

        revenueMap.set(key, (revenueMap.get(key) ?? 0) + orderTotal);
      }
    });

    const revenueData: ChartPoint[] = months.map((month) => ({
      label: month.label,
      value: revenueMap.get(month.key) ?? 0,
    }));

    const ordersData: ChartPoint[] = months.map((month) => ({
      label: month.label,
      value: ordersMap.get(month.key) ?? 0,
    }));

    const statusData: StatusChartItem[] = [
      {
        label: "Pending",
        value: orders.filter((order) => order.status === "Pending").length,
        className: "pending",
      },
      {
        label: "Processing",
        value: orders.filter((order) => order.status === "Processing").length,
        className: "processing",
      },
      {
        label: "Shipped",
        value: orders.filter((order) => order.status === "Shipped").length,
        className: "shipped",
      },
      {
        label: "Delivered",
        value: orders.filter((order) => order.status === "Delivered").length,
        className: "delivered",
      },
      {
        label: "Cancelled",
        value: orders.filter((order) => order.status === "Cancelled").length,
        className: "cancelled",
      },
    ];

    const validOrders = orders.filter((order) => order.status !== "Cancelled");

    const productMap = new Map<string, TopProduct>();

    validOrders.forEach((order) => {
      order.items.forEach((item) => {
        const existing = productMap.get(item.name);

        const quantity = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;

        if (existing) {
          existing.quantity += quantity;
          existing.revenue += price * quantity;

          if (!existing.image && item.selectImage) {
            existing.image = item.selectImage;
          }
        } else {
          productMap.set(item.name, {
            name: item.name,
            quantity,
            revenue: price * quantity,
            image: item.selectImage || "",
          });
        }
      });
    });

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    const categoryMap = new Map<string, number>();

    validOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find(
          (productItem) => productItem.name === item.name,
        );

        if (!product) return;

        categoryMap.set(
          product.category,
          (categoryMap.get(product.category) ?? 0) +
            (Number(item.quantity) || 0),
        );
      });
    });

    const categoryData: CategoryData[] = Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    const analyticsRevenue = validOrders.reduce(
      (sum, order) => sum + (Number.isFinite(order.total) ? order.total : 0),
      0,
    );

    const averageOrderValue =
      validOrders.length > 0 ? analyticsRevenue / validOrders.length : 0;

    const totalItemsSold = validOrders.reduce(
      (sum, order) =>
        sum +
        order.items.reduce(
          (itemTotal, item) => itemTotal + (Number(item.quantity) || 0),
          0,
        ),
      0,
    );

    return {
      revenueData,
      ordersData,
      statusData,
      topProducts,
      categoryData,
      totalRevenue: analyticsRevenue,
      averageOrderValue,
      totalItemsSold,
      validOrdersCount: validOrders.length,
    };
  }, [orders, products]);

  const resetForm = () => {
    setForm(createEmptyForm());
    setEditingProductId(null);
  };

  const openAddProduct = () => {
    clearMessage();
    setEditingProductId(null);
    setForm(createEmptyForm());
    setIsProductModalOpen(true);
  };

  const openEditProduct = (product: Product) => {
    clearMessage();

    setEditingProductId(product.id);

    setForm({
      name: product.name ?? "",
      price: Number.isFinite(product.price) ? product.price : 0,
      category: product.category ?? "T-Shirts",
      stock: Number.isFinite(product.stock) ? product.stock : 0,
      sold: Number.isFinite(product.sold) ? product.sold : 0,
      description: product.description ?? "",
      sizes: Array.isArray(product.sizes) ? [...product.sizes] : [],
      colors:
        Array.isArray(product.colors) && product.colors.length > 0
          ? product.colors.map((color) => ({
              name: color.name ?? "",
              value: color.value ?? "#111111",
              existingImages: Array.isArray(color.images)
                ? [...color.images]
                : [],
              files: [],
            }))
          : [
              {
                name: "Black",
                value: "#111111",
                existingImages: [],
                files: [],
              },
            ],
    });

    setIsProductModalOpen(true);
  };

  const updateColorName = (colorIndex: number, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      colors: currentForm.colors.map((color, index) =>
        index === colorIndex
          ? {
              ...color,
              name: value,
            }
          : color,
      ),
    }));
  };

  const updateColorValue = (colorIndex: number, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      colors: currentForm.colors.map((color, index) =>
        index === colorIndex
          ? {
              ...color,
              value,
            }
          : color,
      ),
    }));
  };

  const addColor = () => {
    setForm((currentForm) => ({
      ...currentForm,
      colors: [
        ...currentForm.colors,
        {
          name: "",
          value: "#000000",
          existingImages: [],
          files: [],
        },
      ],
    }));
  };

  const removeColor = (colorIndex: number) => {
    if (form.colors.length === 1) {
      showMessage("A product must have at least one color.", "error");
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      colors: currentForm.colors.filter((_, index) => index !== colorIndex),
    }));
  };

  const handleColorImagesChange = (
    colorIndex: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files) return;

    const selectedFiles = Array.from(files);

    setForm((currentForm) => ({
      ...currentForm,
      colors: currentForm.colors.map((color, index) =>
        index === colorIndex
          ? {
              ...color,
              files: [...color.files, ...selectedFiles],
            }
          : color,
      ),
    }));

    event.target.value = "";
  };

  const removeExistingImage = (colorIndex: number, imageIndex: number) => {
    setForm((currentForm) => ({
      ...currentForm,
      colors: currentForm.colors.map((color, index) =>
        index === colorIndex
          ? {
              ...color,
              existingImages: color.existingImages.filter(
                (_, existingIndex) => existingIndex !== imageIndex,
              ),
            }
          : color,
      ),
    }));
  };

  const removeNewImage = (colorIndex: number, imageIndex: number) => {
    setForm((currentForm) => ({
      ...currentForm,
      colors: currentForm.colors.map((color, index) =>
        index === colorIndex
          ? {
              ...color,
              files: color.files.filter(
                (_, fileIndex) => fileIndex !== imageIndex,
              ),
            }
          : color,
      ),
    }));
  };

  const closeProductModal = () => {
    if (isSavingProduct) return;

    setIsProductModalOpen(false);
    resetForm();
  };

  const validateProductForm = () => {
    if (!form.name.trim()) {
      showMessage("Please enter a product name.", "error");
      return false;
    }

    if (
      !Number.isFinite(form.price) ||
      !Number.isFinite(form.stock) ||
      !Number.isFinite(form.sold) ||
      form.price < 0 ||
      form.stock < 0 ||
      form.sold < 0
    ) {
      showMessage("Please enter valid product numbers.", "error");
      return false;
    }

    if (form.sizes.length === 0) {
      showMessage("Please select at least one size.", "error");
      return false;
    }

    if (form.colors.length === 0) {
      showMessage("Please add at least one color.", "error");
      return false;
    }

    const colorNames = new Set<string>();

    for (const color of form.colors) {
      const normalizedName = color.name.trim().toLowerCase();

      if (!normalizedName) {
        showMessage("Every color must have a name.", "error");
        return false;
      }

      if (colorNames.has(normalizedName)) {
        showMessage(`Color "${color.name.trim()}" is duplicated.`, "error");
        return false;
      }

      colorNames.add(normalizedName);

      const imageCount = color.existingImages.length + color.files.length;

      if (imageCount < 3) {
        showMessage(
          `Color ${color.name.trim()} needs at least 3 images.`,
          "error",
        );
        return false;
      }

      if (imageCount > 4) {
        showMessage(
          `Color ${color.name.trim()} can have a maximum of 4 images.`,
          "error",
        );
        return false;
      }
    }

    return true;
  };

  const saveProduct = async () => {
    if (isSavingProduct) return;

    if (!validateProductForm()) return;

    setIsSavingProduct(true);

    try {
      const convertedColors: ProductColor[] = await Promise.all(
        form.colors.map(async (color) => {
          const newImages = await Promise.all(
            color.files.map((file) => fileToBase64(file)),
          );

          return {
            name: color.name.trim(),
            value: color.value,
            images: [...color.existingImages, ...newImages],
          };
        }),
      );

      if (editingProductId !== null) {
        const updatedProduct: Product = {
          id: editingProductId,
          name: form.name.trim(),
          price: form.price,
          category: form.category,
          stock: form.stock,
          sold: form.sold,
          description: form.description.trim(),
          sizes: [...form.sizes],
          colors: convertedColors,
        };

        await saveProductToFirestore(updatedProduct);

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProductId ? updatedProduct : product,
          ),
        );

        showMessage("Product updated successfully.", "success");
      } else {
        const highestId = products.reduce(
          (highest, product) => Math.max(highest, product.id),
          0,
        );

        const newProduct: Product = {
          id: highestId + 1,
          name: form.name.trim(),
          price: form.price,
          category: form.category,
          stock: form.stock,
          sold: form.sold,
          sizes: [...form.sizes],
          description: form.description.trim(),
          colors: convertedColors,
        };

        await saveProductToFirestore(newProduct);

        setProducts((currentProducts) => [...currentProducts, newProduct]);

        showMessage("Product created successfully.", "success");
      }

      setIsProductModalOpen(false);
      resetForm();
    } catch {
      showMessage(
        "Error saving product. Please check Firebase and try again.",
        "error",
      );
    } finally {
      setIsSavingProduct(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (deletingProductId !== null) return;

    const product = products.find((item) => item.id === id);

    if (!product) return;

    setDeletingProductId(id);

    try {
      await deleteProductFromFirestore(id);

      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== id),
      );

      showMessage("Product deleted successfully.", "success");
    } catch {
      showMessage("Failed to delete product from Firebase.", "error");
    } finally {
      setDeletingProductId(null);
    }
  };

  const updateProductNumbers = async (
    id: number,
    field: "stock" | "sold",
    amount: number,
  ) => {
    if (updatingProductId !== null) return;

    const product = products.find((item) => item.id === id);

    if (!product) return;

    const currentValue = Number.isFinite(product[field]) ? product[field] : 0;

    const nextValue = Math.max(0, currentValue + amount);

    if (nextValue === currentValue) return;

    const updatedProduct: Product = {
      ...product,
      [field]: nextValue,
    };

    setUpdatingProductId(id);

    try {
      await saveProductToFirestore(updatedProduct);

      setProducts((currentProducts) =>
        currentProducts.map((currentProduct) =>
          currentProduct.id === id ? updatedProduct : currentProduct,
        ),
      );

      showMessage(
        `${field === "stock" ? "Stock" : "Sold"} updated successfully.`,
        "success",
      );
    } catch {
      showMessage(`Failed to update ${field}. Please try again.`, "error");
    } finally {
      setUpdatingProductId(null);
    }
  };

  const updateStock = (id: number, amount: number) => {
    void updateProductNumbers(id, "stock", amount);
  };

  const updateSold = (id: number, amount: number) => {
    void updateProductNumbers(id, "sold", amount);
  };

  const updateOrderStatus = async (
    orderId: string,
    status: OrderItem["status"],
  ) => {
    if (updatingOrderId !== null) return;

    const currentOrder = orders.find((order) => order.id === orderId);

    if (!currentOrder || currentOrder.status === status) {
      return;
    }

    setUpdatingOrderId(orderId);

    try {
      await updateOrderStatusInFirestore(orderId, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order,
        ),
      );

      showMessage("Order status updated successfully.", "success");
    } catch {
      showMessage("Failed to update order status in Firebase.", "error");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusClass = (status: OrderItem["status"] | undefined) => {
    return status?.toLowerCase() ?? "pending";
  };

  function RevenueChart({ data }: { data: ChartPoint[] }) {
    const width = 900;
    const height = 320;

    const paddingLeft = 60;
    const paddingRight = 25;
    const paddingTop = 25;
    const paddingBottom = 55;

    const chartWidth = width - paddingLeft - paddingRight;

    const chartHeight = height - paddingTop - paddingBottom;

    const maxValue = Math.max(...data.map((item) => item.value), 1);

    const points = data.map((item, index) => {
      const x =
        data.length === 1
          ? width / 2
          : paddingLeft + (index * chartWidth) / (data.length - 1);

      const y =
        paddingTop + chartHeight - (item.value / maxValue) * chartHeight;

      return {
        ...item,
        x,
        y,
      };
    });

    const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");

    const areaPoints = [
      `${points[0]?.x ?? paddingLeft},${paddingTop + chartHeight}`,
      ...points.map((point) => `${point.x},${point.y}`),
      `${points[points.length - 1]?.x ?? width},${paddingTop + chartHeight}`,
    ].join(" ");

    return (
      <div className="analytics-chart">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="analytics-svg"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4].map((line) => {
            const y = paddingTop + (chartHeight / 4) * line;

            return (
              <line
                key={line}
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                className="chart-grid-line"
              />
            );
          })}

          <polygon points={areaPoints} className="revenue-area" />

          <polyline points={linePoints} className="revenue-line" />

          {points.map((point) => (
            <g key={`${point.label}-${point.value}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                className="revenue-point"
              />

              <circle
                cx={point.x}
                cy={point.y}
                r="10"
                className="revenue-point-hover"
              />

              <text
                x={point.x}
                y={height - 20}
                textAnchor="middle"
                className="chart-label"
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  function OrdersChart({ data }: { data: ChartPoint[] }) {
    const width = 900;
    const height = 320;

    const paddingLeft = 45;
    const paddingRight = 25;
    const paddingTop = 25;
    const paddingBottom = 55;

    const chartWidth = width - paddingLeft - paddingRight;

    const chartHeight = height - paddingTop - paddingBottom;

    const maxValue = Math.max(...data.map((item) => item.value), 1);

    const barWidth = (chartWidth / data.length) * 0.55;

    return (
      <div className="analytics-chart">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="analytics-svg"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4].map((line) => {
            const y = paddingTop + (chartHeight / 4) * line;

            return (
              <line
                key={line}
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                className="chart-grid-line"
              />
            );
          })}

          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;

            const x =
              paddingLeft +
              index * (chartWidth / data.length) +
              (chartWidth / data.length - barWidth) / 2;

            const y = paddingTop + chartHeight - barHeight;

            return (
              <g key={`${item.label}-${item.value}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="5"
                  className="orders-bar"
                />

                <text
                  x={x + barWidth / 2}
                  y={y - 10}
                  textAnchor="middle"
                  className="bar-value"
                >
                  {item.value}
                </text>

                <text
                  x={x + barWidth / 2}
                  y={height - 20}
                  textAnchor="middle"
                  className="chart-label"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  function OrderStatusChart({ data }: { data: StatusChartItem[] }) {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const radius = 72;

    const circumference = 2 * Math.PI * radius;

    let accumulated = 0;

    return (
      <div className="status-chart-wrapper">
        <div className="status-donut">
          <svg viewBox="0 0 200 200" className="status-donut-svg">
            <circle cx="100" cy="100" r={radius} className="donut-background" />

            {data.map((item) => {
              const percentage = total > 0 ? item.value / total : 0;

              const dash = percentage * circumference;

              const offset = -accumulated * circumference;

              accumulated += percentage;

              return (
                <circle
                  key={item.label}
                  cx="100"
                  cy="100"
                  r={radius}
                  className={`donut-segment ${item.className}`}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={offset}
                />
              );
            })}

            <text x="100" y="94" textAnchor="middle" className="donut-total">
              {total}
            </text>

            <text x="100" y="116" textAnchor="middle" className="donut-caption">
              Orders
            </text>
          </svg>
        </div>

        <div className="status-legend">
          {data.map((item) => {
            const percentage =
              total > 0 ? Math.round((item.value / total) * 100) : 0;

            return (
              <div className="status-legend-item" key={item.label}>
                <div className="status-legend-left">
                  <span className={`status-dot ${item.className}`} />

                  <span>{item.label}</span>
                </div>

                <div className="status-legend-right">
                  <strong>{item.value}</strong>

                  <small>{percentage}%</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function TopProductsChart({
    products: topProducts,
  }: {
    products: TopProduct[];
  }) {
    const maxQuantity = Math.max(
      ...topProducts.map((product) => product.quantity),
      1,
    );

    return (
      <div className="top-products-chart">
        {topProducts.length === 0 ? (
          <div className="analytics-empty">No sales data available yet.</div>
        ) : (
          topProducts.map((product, index) => {
            const percentage = (product.quantity / maxQuantity) * 100;

            return (
              <div className="top-product-row" key={product.name}>
                <div className="top-product-rank">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="top-product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <span>W</span>
                  )}
                </div>

                <div className="top-product-info">
                  <div className="top-product-heading">
                    <strong>{product.name}</strong>

                    <span>{product.quantity} sold</span>
                  </div>

                  <div className="product-progress">
                    <span
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="top-product-revenue">
                  {formatMoney(product.revenue)}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  function CategorySalesChart({ data }: { data: CategoryData[] }) {
    const maxValue = Math.max(...data.map((item) => item.value), 1);

    return (
      <div className="category-chart">
        {data.length === 0 ? (
          <div className="analytics-empty">
            No category sales available yet.
          </div>
        ) : (
          data.map((item) => {
            const percentage = (item.value / maxValue) * 100;

            return (
              <div className="category-row" key={item.name}>
                <div className="category-row-header">
                  <span>{item.name}</span>

                  <strong>{item.value} items</strong>
                </div>

                <div className="category-progress">
                  <span
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <div className="admin-page">
      {message && (
        <div className={`admin-message ${messageType}`}>
          <span>{messageType === "success" ? "✓" : "!"}</span>

          <p>{message}</p>

          <button type="button" onClick={clearMessage}>
            ×
          </button>
        </div>
      )}

      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>WIKI</span>
          <small>ADMIN</small>
        </div>

        <nav className="admin-nav">
          <button
            type="button"
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            type="button"
            className={activeSection === "analytics" ? "active" : ""}
            onClick={() => setActiveSection("analytics")}
          >
            <span>◈</span>
            Analytics
          </button>

          <button
            type="button"
            className={activeSection === "products" ? "active" : ""}
            onClick={() => setActiveSection("products")}
          >
            <span>□</span>
            Products
          </button>

          <button
            type="button"
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => setActiveSection("orders")}
          >
            <span>◫</span>
            Orders
          </button>

          <button
            type="button"
            className={activeSection === "customers" ? "active" : ""}
            onClick={() => setActiveSection("customers")}
          >
            <span>◎</span>
            Customers
          </button>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-store-status">
            <span className="status-dot"></span>
            Store online
          </div>

          <a href="/" className="view-store">
            View store
            <span>↗</span>
          </a>

          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">WIKI COMMERCE</p>

            <h1>
              {activeSection === "dashboard" && "Dashboard"}

              {activeSection === "analytics" && "Analytics"}

              {activeSection === "products" && "Products"}

              {activeSection === "orders" && "Orders"}

              {activeSection === "customers" && "Customers"}
            </h1>
          </div>

          <div className="admin-header-actions">
            <span className="admin-date">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>

            <button
              type="button"
              className="admin-add-button"
              onClick={openAddProduct}
            >
              <span>+</span>
              Add product
            </button>
          </div>
        </header>

        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        {activeSection === "dashboard" && (
          <section className="admin-content">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">Products</span>

                <strong>{totalProducts}</strong>

                <small>Active products</small>
              </div>

              <div className="stat-card">
                <span className="stat-label">Stock</span>

                <strong>{totalStock}</strong>

                <small>Items available</small>
              </div>

              <div className="stat-card">
                <span className="stat-label">Sold</span>

                <strong>{totalSold}</strong>

                <small>Items sold</small>
              </div>

              <div className="stat-card">
                <span className="stat-label">Orders</span>

                <strong>{totalOrders}</strong>

                <small>Total orders</small>
              </div>

              <div className="stat-card revenue-card">
                <span className="stat-label">Revenue</span>

                <strong>{totalRevenue.toLocaleString()} DH</strong>

                <small>Non-cancelled order value</small>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="admin-panel">
                <div className="panel-heading">
                  <div>
                    <p>INVENTORY</p>
                    <h2>Products overview</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveSection("products")}
                  >
                    View all
                  </button>
                </div>

                <div className="mini-product-list">
                  {products.slice(0, 6).map((product) => (
                    <div className="mini-product" key={product.id}>
                      <div className="mini-product-image">
                        {product.colors?.[0]?.images?.[0] ? (
                          <img
                            src={product.colors[0].images[0]}
                            alt={product.name}
                          />
                        ) : (
                          <span>W</span>
                        )}
                      </div>

                      <div className="mini-product-info">
                        <strong>{product.name}</strong>

                        <span>{product.category}</span>
                      </div>

                      <div className="mini-product-stock">
                        <strong>{product.stock}</strong>

                        <span>in stock</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-panel">
                <div className="panel-heading">
                  <div>
                    <p>ATTENTION</p>
                    <h2>Low stock</h2>
                  </div>

                  <span className="warning-count">
                    {lowStockProducts.length}
                  </span>
                </div>

                {lowStockProducts.length === 0 ? (
                  <div className="empty-small">
                    <span>✓</span>

                    <p>All products have healthy stock levels.</p>
                  </div>
                ) : (
                  <div className="low-stock-list">
                    {lowStockProducts.map((product) => (
                      <div className="low-stock-item" key={product.id}>
                        <div>
                          <strong>{product.name}</strong>

                          <span>{product.category}</span>
                        </div>

                        <b>{product.stock} left</b>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="admin-panel recent-orders">
              <div className="panel-heading">
                <div>
                  <p>SALES</p>
                  <h2>Recent orders</h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSection("orders")}
                >
                  View all
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="empty-state">
                  <div>◫</div>

                  <h3>No orders yet</h3>

                  <p>Your customer orders will appear here.</p>
                </div>
              ) : (
                <div className="orders-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order</th>

                        <th>Customer</th>

                        <th>City</th>

                        <th>Total</th>

                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.slice(0, 8).map((order) => (
                        <tr key={order.id}>
                          <td className="order-id">
                            #{order.id.slice(-6).toUpperCase()}
                          </td>

                          <td>
                            <strong>{order.customer.name}</strong>
                          </td>

                          <td>{order.customer.city}</td>

                          <td>{order.total.toLocaleString()} DH</td>

                          <td>
                            <span
                              className={`status ${getStatusClass(
                                order.status,
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            ANALYTICS
        ===================================================== */}

        {activeSection === "analytics" && (
          <section className="admin-content analytics-page">
            <div className="analytics-intro">
              <div>
                <p className="analytics-eyebrow">PERFORMANCE OVERVIEW</p>

                <h2>Store analytics</h2>

                <span>
                  Track revenue, orders, products and customer demand.
                </span>
              </div>

              <div className="analytics-period">
                <span className="analytics-period-dot" />
                Last 6 months
              </div>
            </div>

            <div className="analytics-stat-grid">
              <div className="analytics-stat-card">
                <div className="analytics-stat-top">
                  <span className="analytics-stat-label">TOTAL REVENUE</span>

                  <span className="analytics-stat-icon">DH</span>
                </div>

                <strong className="analytics-stat-value">
                  {formatMoney(analyticsCharts.totalRevenue)}
                </strong>

                <span className="analytics-stat-meta">
                  Non-cancelled orders
                </span>
              </div>

              <div className="analytics-stat-card">
                <div className="analytics-stat-top">
                  <span className="analytics-stat-label">ORDERS</span>

                  <span className="analytics-stat-icon">#</span>
                </div>

                <strong className="analytics-stat-value">
                  {analyticsCharts.validOrdersCount}
                </strong>

                <span className="analytics-stat-meta">
                  Non-cancelled orders
                </span>
              </div>

              <div className="analytics-stat-card">
                <div className="analytics-stat-top">
                  <span className="analytics-stat-label">AVG. ORDER</span>

                  <span className="analytics-stat-icon">↗</span>
                </div>

                <strong className="analytics-stat-value">
                  {formatMoney(analyticsCharts.averageOrderValue)}
                </strong>

                <span className="analytics-stat-meta">Average order value</span>
              </div>

              <div className="analytics-stat-card">
                <div className="analytics-stat-top">
                  <span className="analytics-stat-label">ITEMS SOLD</span>

                  <span className="analytics-stat-icon">×</span>
                </div>

                <strong className="analytics-stat-value">
                  {analyticsCharts.totalItemsSold}
                </strong>

                <span className="analytics-stat-meta">Products sold</span>
              </div>
            </div>

            <div className="analytics-main-grid">
              <div className="admin-panel analytics-panel analytics-wide">
                <div className="panel-heading">
                  <div>
                    <p>REVENUE</p>

                    <h2>Revenue performance</h2>
                  </div>

                  <span className="analytics-panel-value">
                    {formatMoney(analyticsCharts.totalRevenue)}
                  </span>
                </div>

                <RevenueChart data={analyticsCharts.revenueData} />
              </div>

              <div className="admin-panel analytics-panel">
                <div className="panel-heading">
                  <div>
                    <p>ORDERS</p>

                    <h2>Monthly orders</h2>
                  </div>
                </div>

                <OrdersChart data={analyticsCharts.ordersData} />
              </div>
            </div>

            <div className="analytics-bottom-grid">
              <div className="admin-panel analytics-panel">
                <div className="panel-heading">
                  <div>
                    <p>STATUS</p>

                    <h2>Order status</h2>
                  </div>
                </div>

                <OrderStatusChart data={analyticsCharts.statusData} />
              </div>

              <div className="admin-panel analytics-panel analytics-products-panel">
                <div className="panel-heading">
                  <div>
                    <p>BEST SELLERS</p>

                    <h2>Top products</h2>
                  </div>
                </div>

                <TopProductsChart products={analyticsCharts.topProducts} />
              </div>
            </div>

            <div className="admin-panel analytics-panel">
              <div className="panel-heading">
                <div>
                  <p>CATEGORIES</p>

                  <h2>Category performance</h2>
                </div>
              </div>

              <CategorySalesChart data={analyticsCharts.categoryData} />
            </div>
          </section>
        )}

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        {activeSection === "products" && (
          <section className="admin-content">
            <div className="products-toolbar">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="All">All categories</option>

                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-panel products-panel">
              <div className="panel-heading">
                <div>
                  <p>CATALOG</p>

                  <h2>{filteredProducts.length} products</h2>
                </div>
              </div>

              <div className="products-table-wrapper">
                <table className="admin-table products-table">
                  <thead>
                    <tr>
                      <th>Product</th>

                      <th>Category</th>

                      <th>Price</th>

                      <th>Stock</th>

                      <th>Sold</th>

                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="table-product">
                            <div className="table-product-image">
                              {product.colors?.[0]?.images?.[0] ? (
                                <img
                                  src={product.colors[0].images[0]}
                                  alt={product.name}
                                />
                              ) : (
                                <span>W</span>
                              )}
                            </div>

                            <div>
                              <strong>{product.name}</strong>

                              <small>ID #{product.id}</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="category-tag">
                            {product.category}
                          </span>
                        </td>

                        <td>
                          <strong>{product.price} DH</strong>
                        </td>

                        <td>
                          <div className="quantity-control">
                            <button
                              type="button"
                              disabled={updatingProductId === product.id}
                              onClick={() => updateStock(product.id, -1)}
                            >
                              −
                            </button>

                            <span
                              className={
                                product.stock <= 5 ? "danger-number" : ""
                              }
                            >
                              {updatingProductId === product.id
                                ? "..."
                                : product.stock}
                            </span>

                            <button
                              type="button"
                              disabled={updatingProductId === product.id}
                              onClick={() => updateStock(product.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td>
                          <div className="quantity-control sold-control">
                            <button
                              type="button"
                              disabled={updatingProductId === product.id}
                              onClick={() => updateSold(product.id, -1)}
                            >
                              −
                            </button>

                            <span>
                              {updatingProductId === product.id
                                ? "..."
                                : product.sold}
                            </span>

                            <button
                              type="button"
                              disabled={updatingProductId === product.id}
                              onClick={() => updateSold(product.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="edit-button"
                              disabled={deletingProductId === product.id}
                              onClick={() => openEditProduct(product)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-button"
                              disabled={deletingProductId === product.id}
                              onClick={() => void deleteProduct(product.id)}
                            >
                              {deletingProductId === product.id
                                ? "..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="empty-state">
                    <div>⌕</div>

                    <h3>No products found</h3>

                    <p>Try another search or category.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            ORDERS
        ===================================================== */}

        {activeSection === "orders" && (
          <section className="admin-content">
            <div className="stats-grid order-stats">
              <div className="stat-card">
                <span className="stat-label">All orders</span>

                <strong>{orders.length}</strong>

                <small>Total orders</small>
              </div>

              <div className="stat-card">
                <span className="stat-label">Pending</span>

                <strong>{pendingOrders.length}</strong>

                <small>Need attention</small>
              </div>

              <div className="stat-card">
                <span className="stat-label">Processing</span>

                <strong>{processingOrders.length}</strong>

                <small>Being prepared</small>
              </div>

              <div className="stat-card">
                <span className="stat-label">Delivered</span>

                <strong>{deliveredOrders.length}</strong>

                <small>Completed</small>
              </div>
            </div>

            <div className="admin-panel">
              <div className="panel-heading">
                <div>
                  <p>ORDERS</p>

                  <h2>Customer orders</h2>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="empty-state">
                  <div>◫</div>

                  <h3>No orders yet</h3>

                  <p>Orders will appear here after checkout.</p>
                </div>
              ) : (
                <div className="orders-table-wrapper">
                  <table className="admin-table orders-full-table">
                    <thead>
                      <tr>
                        <th>Order</th>

                        <th>Customer</th>

                        <th>Phone</th>

                        <th>City</th>

                        <th>Items</th>

                        <th>Total</th>

                        <th>Status</th>

                        <th>Details</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="order-id">
                            #{order.id.slice(-6).toUpperCase()}
                          </td>

                          <td>
                            <strong>{order.customer.name}</strong>
                          </td>

                          <td>{order.customer.phone}</td>

                          <td>{order.customer.city}</td>

                          <td>{order.items.length}</td>

                          <td>
                            <strong>{order.total.toLocaleString()} DH</strong>
                          </td>

                          <td>
                            <select
                              className={`status-select ${getStatusClass(
                                order.status,
                              )}`}
                              value={order.status}
                              disabled={updatingOrderId === order.id}
                              onChange={(event) =>
                                void updateOrderStatus(
                                  order.id,
                                  event.target.value as OrderItem["status"],
                                )
                              }
                            >
                              <option value="Pending">Pending</option>

                              <option value="Processing">Processing</option>

                              <option value="Shipped">Shipped</option>

                              <option value="Delivered">Delivered</option>

                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="view-order-button"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            CUSTOMERS
        ===================================================== */}

        {activeSection === "customers" && (
          <section className="admin-content">
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">Customers</span>

                <strong>{customers.length}</strong>

                <small>Unique customers</small>
              </div>

              <div className="stat-card">
                <span className="stat-label">Orders</span>

                <strong>{totalOrders}</strong>

                <small>Customer orders</small>
              </div>

              <div className="stat-card revenue-card">
                <span className="stat-label">Revenue</span>

                <strong>{totalRevenue.toLocaleString()} DH</strong>

                <small>Non-cancelled order value</small>
              </div>
            </div>

            <div className="admin-panel">
              <div className="panel-heading">
                <div>
                  <p>CUSTOMERS</p>

                  <h2>Customer directory</h2>
                </div>
              </div>

              {customers.length === 0 ? (
                <div className="empty-state">
                  <div>◎</div>

                  <h3>No customers yet</h3>

                  <p>Your customer information will appear here.</p>
                </div>
              ) : (
                <div className="customers-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer</th>

                        <th>Phone</th>

                        <th>Email</th>

                        <th>City</th>

                        <th>Orders</th>

                        <th>Spent</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customers.map((customer) => (
                        <tr key={`${customer.phone}-${customer.email}`}>
                          <td>
                            <div className="customer-name">
                              <span>
                                {customer.name.charAt(0).toUpperCase()}
                              </span>

                              <strong>{customer.name}</strong>
                            </div>
                          </td>

                          <td>{customer.phone}</td>

                          <td>{customer.email || "—"}</td>

                          <td>{customer.city}</td>

                          <td>{customer.orders}</td>

                          <td>
                            <strong>
                              {customer.spent.toLocaleString()} DH
                            </strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (
        <div
          className="order-modal-backdrop"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="order-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="order-modal-header">
              <div>
                <p>WIKI COMMERCE</p>

                <h2>Order Details</h2>

                <span>#{String(selectedOrder.id).slice(-6).toUpperCase()}</span>
              </div>

              <button type="button" onClick={() => setSelectedOrder(null)}>
                ×
              </button>
            </div>

            <div className="order-detail-status">
              <span>Order Status</span>

              <strong
                className={`status ${getStatusClass(selectedOrder.status)}`}
              >
                {selectedOrder.status}
              </strong>
            </div>

            <section className="order-detail-section">
              <div className="order-detail-heading">
                <span>01</span>

                <h3>Customer Information</h3>
              </div>

              <div className="order-customer-grid">
                <div>
                  <small>Full Name</small>

                  <strong>{selectedOrder.customer?.name || "—"}</strong>
                </div>

                <div>
                  <small>Phone</small>

                  <strong>{selectedOrder.customer?.phone || "—"}</strong>
                </div>

                <div>
                  <small>Email</small>

                  <strong>{selectedOrder.customer?.email || "—"}</strong>
                </div>

                <div>
                  <small>City</small>

                  <strong>{selectedOrder.customer?.city || "—"}</strong>
                </div>

                <div className="order-address">
                  <small>Address</small>

                  <strong>{selectedOrder.customer?.address || "—"}</strong>
                </div>
              </div>
            </section>

            <section className="order-detail-section">
              <div className="order-detail-heading">
                <span>02</span>

                <h3>Products Ordered</h3>
              </div>

              <div className="order-detail-products">
                {selectedOrder.items?.map((item, index) => (
                  <div
                    className="order-detail-product"
                    key={`${selectedOrder.id}-${index}`}
                  >
                    <div className="order-detail-image">
                      {item.selectImage ? (
                        <img src={item.selectImage} alt={item.name} />
                      ) : (
                        <span>W</span>
                      )}
                    </div>

                    <div className="order-detail-product-info">
                      <h4>{item.name}</h4>

                      <p>
                        {item.price.toLocaleString()} DH × {item.quantity}
                      </p>

                      <div className="order-product-variants">
                        <span>
                          Size: <strong>{item.selectSize || "—"}</strong>
                        </span>

                        <span>
                          Color: <strong>{item.selectColor || "—"}</strong>
                        </span>
                      </div>
                    </div>

                    <strong className="order-detail-subtotal">
                      {(item.price * item.quantity).toLocaleString()} DH
                    </strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="order-total-section">
              <span>Total Amount</span>

              <strong>{selectedOrder.total.toLocaleString()} DH</strong>
            </section>

            <button
              type="button"
              className="order-modal-close"
              onClick={() => setSelectedOrder(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          PRODUCT MODAL
      ===================================================== */}

      {isProductModalOpen && (
        <div className="admin-modal-backdrop" onClick={closeProductModal}>
          <div
            className="admin-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p>
                  {editingProductId !== null ? "EDIT PRODUCT" : "NEW PRODUCT"}
                </p>

                <h2>
                  {editingProductId !== null ? "Edit product" : "Add product"}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close"
                disabled={isSavingProduct}
                onClick={closeProductModal}
              >
                ×
              </button>
            </div>

            <div className="product-form">
              <label>
                Product name
                <input
                  type="text"
                  value={form.name}
                  placeholder="Example: Premium Oversized T-Shirt"
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      name: event.target.value,
                    }))
                  }
                />
              </label>

              <div className="form-grid">
                <label>
                  Price
                  <div className="input-with-unit">
                    <input
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(event) =>
                        setForm((currentForm) => ({
                          ...currentForm,
                          price: Number(event.target.value),
                        }))
                      }
                    />

                    <span>DH</span>
                  </div>
                </label>

                <label>
                  Category
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        category: event.target.value,
                      }))
                    }
                  >
                    {categories.map((category) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-grid">
                <label>
                  Stock
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(event) =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        stock: Number(event.target.value),
                      }))
                    }
                  />
                </label>

                <label>
                  Sold
                  <input
                    type="number"
                    min="0"
                    value={form.sold}
                    onChange={(event) =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        sold: Number(event.target.value),
                      }))
                    }
                  />
                </label>
              </div>

              <div className="sizes-section">
                <div className="sizes-section-header">
                  <div>
                    <p>PRODUCT VARIANTS</p>

                    <h3>Available sizes</h3>

                    <small>Select the sizes available for this product.</small>
                  </div>

                  <span className="sizes-count">
                    {form.sizes.length} SELECTED
                  </span>
                </div>

                <div className="sizes-options">
                  {availableSizes.map((size) => {
                    const isSelected = form.sizes.includes(size);

                    return (
                      <button
                        key={size}
                        type="button"
                        className={`size-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => {
                          setForm((previous) => ({
                            ...previous,
                            sizes: isSelected
                              ? previous.sizes.filter(
                                  (currentSize) => currentSize !== size,
                                )
                              : [...previous.sizes, size],
                          }));
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label>
                Description
                <textarea
                  value={form.description}
                  placeholder="Product description..."
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      description: event.target.value,
                    }))
                  }
                />
              </label>

              <div className="colors-section">
                <div className="colors-section-header">
                  <div>
                    <p>PRODUCT VARIANTS</p>

                    <h3>Colors & images</h3>

                    <small>Each color can have its own images.</small>
                  </div>

                  <button
                    type="button"
                    className="add-color-button"
                    onClick={addColor}
                    disabled={isSavingProduct}
                  >
                    + Add color
                  </button>
                </div>

                <div className="colors-list">
                  {form.colors.map((color, colorIndex) => (
                    <div className="color-form-card" key={colorIndex}>
                      <div className="color-form-header">
                        <div className="color-number">
                          Color {colorIndex + 1}
                        </div>

                        {form.colors.length > 1 && (
                          <button
                            type="button"
                            className="remove-color-button"
                            onClick={() => removeColor(colorIndex)}
                            disabled={isSavingProduct}
                          >
                            Remove color
                          </button>
                        )}
                      </div>

                      <div className="color-fields">
                        <label>
                          Color name
                          <input
                            type="text"
                            placeholder="Black"
                            value={color.name}
                            onChange={(event) =>
                              updateColorName(colorIndex, event.target.value)
                            }
                          />
                        </label>

                        <label>
                          Select color
                          <div className="color-picker-wrapper">
                            <input
                              type="color"
                              value={color.value}
                              onChange={(event) =>
                                updateColorValue(colorIndex, event.target.value)
                              }
                            />

                            <span>{color.value}</span>
                          </div>
                        </label>
                      </div>

                      <div className="image-upload-area">
                        <label className="image-upload-label">
                          <span className="upload-icon">+</span>

                          <strong>Upload images</strong>

                          <small>
                            Select multiple images for{" "}
                            {color.name || "this color"}
                          </small>

                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={isSavingProduct}
                            onChange={(event) =>
                              handleColorImagesChange(colorIndex, event)
                            }
                          />
                        </label>
                      </div>

                      {(color.existingImages.length > 0 ||
                        color.files.length > 0) && (
                        <div className="color-images-preview">
                          {color.existingImages.map((image, imageIndex) => (
                            <div
                              className="admin-image-preview"
                              key={`existing-${imageIndex}`}
                            >
                              <img
                                src={image}
                                alt={`${color.name} ${imageIndex + 1}`}
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeExistingImage(colorIndex, imageIndex)
                                }
                                disabled={isSavingProduct}
                              >
                                ×
                              </button>

                              <span>Saved</span>
                            </div>
                          ))}

                          {color.files.map((file, fileIndex) => (
                            <div
                              className="admin-image-preview"
                              key={`new-${fileIndex}`}
                            >
                              {imagePreviewUrls[colorIndex]?.[fileIndex] ? (
                                <img
                                  src={imagePreviewUrls[colorIndex][fileIndex]}
                                  alt={file.name}
                                />
                              ) : (
                                <span>Preview</span>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  removeNewImage(colorIndex, fileIndex)
                                }
                                disabled={isSavingProduct}
                              >
                                ×
                              </button>

                              <span>New</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="new-product-note">
                <span>i</span>
                Images are converted to Base64 before being saved. Existing
                images are preserved when editing unless you remove them.
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeProductModal}
                  disabled={isSavingProduct}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="save-button"
                  onClick={() => void saveProduct()}
                  disabled={isSavingProduct}
                >
                  {isSavingProduct
                    ? "Saving..."
                    : editingProductId !== null
                      ? "Save changes"
                      : "Create product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
