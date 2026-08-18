import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type Address = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type CartStore = {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  saveCartToDB: () => Promise<void>;

  removeFromCart: (productId: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;

  getTotalPrice: () => number;
  subtotal: (id: number) => number;

  address: Address;
  setAddress: (address: Address) => void;
};

export const useCartStore: any = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      address: {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      },

      setCart: (items) =>
        set({
          cart: items,
        }),
      setAddress: (address) => {
        set({
          address: address,
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },
      increaseQuantity: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },
      decreaseQuantity: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item,
          ),
        }));
      },
      getTotalPrice: () => {
        return Math.floor(
          useCartStore
            .getState()
            .cart.reduce(
              (total: number, item: { price: number; quantity: number }) =>
                total + item.price * item.quantity,
              0,
            ),
        );
      },
      subtotal: (id) => {
        const item = useCartStore
          .getState()
          .cart.find((item: { id: number }) => item.id === id);
        return item ? Math.floor(item.price * item.quantity) : 0;
      },
      saveCartToDB: async () => {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            console.log("User is not logged in");
            return;
          }

          const cart = useCartStore.getState().cart;

          const response = await fetch("https://backend-kiy4.onrender.com/cart", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              items: cart,
            }),
          });

          const data = await response.json();

          console.log("MongoDB Cart:", data);

          if (!response.ok) {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Save Cart Error:", error);
        }
      },
    }),
    {
      name: "shopping-cart-in-zuztang", // unique name
    },
  ),
);
