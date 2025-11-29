import { createContext, useState, useEffect } from "react";
import apiClient from "../utils/axios";

export const CartContext = createContext();


export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    // Fetch server cart when logged in
    const fetchServerCart = async () => {
        try {
            const res = await apiClient("cart/")
            setCart(res.data.items)
        } catch (err) {
            console.error("Error fetching cart", err);
        }
    };

    // Load guest cart or server cart on start
    useEffect(() => {
        if (isLoggedIn) {
        fetchServerCart();
        } else {
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
        }
    }, [isLoggedIn]);

    // Save guest cart only if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
        localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isLoggedIn]);



    // ADD TO CART
    const addToCart = async (product) => {
        if (!isLoggedIn) {
        // Guest cart → LocalStorage
        setCart((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
            return prev.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            );
            }
            return [...prev, { ...product, qty: 1 }];
        });
        return;
        }

        await apiClient({
            method: "POST",
            url: "/cart/add/",
            data: {'product_id': product.id, 'qauntity': 1}
        });

        fetchServerCart();
    };


    const removeFromCart = async (id) => {
        if (!isLoggedIn) {
            setCart((prev) => prev.filter((item) => item.id !== id));
            return;
        }

        await apiClient({
            method: "DELETE",
            url: `/cart/remove/${id}/`,
            data: {'product_id': id, 'qauntity': 1}
        });

        fetchServerCart();
    };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
