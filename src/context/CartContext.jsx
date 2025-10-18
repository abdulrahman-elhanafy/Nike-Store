/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);
const LOCAL_KEY = "nike_cart_v1";

function cartReducer(state, action) {
    switch (action.type) {
        case "HYDRATE":
            return action.payload || state;
        case "ADD_ITEM": {
            const item = action.payload;
            const key = `${item.productId}:${item.color}:${item.size}`;
            const existing = state.items.find(i => i.key === key);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i => i.key === key ? { ...i, qty: i.qty + item.qty } : i)
                };
            }
            return { ...state, items: [...state.items, { ...item, key }] };
        }
        case "REMOVE_ITEM": {
            const { key } = action.payload;
            return { ...state, items: state.items.filter(i => i.key !== key) };
        }
        case "UPDATE_QTY": {
            const { key, qty } = action.payload;
            if (qty <= 0) {
                return { ...state, items: state.items.filter(i => i.key !== key) };
            }
            return {
                ...state,
                items: state.items.map(i => i.key === key ? { ...i, qty } : i)
            };
        }
        case "CLEAR":
            return { items: [] };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    // Hydrate from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(LOCAL_KEY);
            if (raw) {
                dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
            }
        } catch {
            // ignore
        }
    }, []);

    // Persist
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
        } catch {
            // ignore
        }
    }, [state]);

    const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
    const removeItem = (key) => dispatch({ type: "REMOVE_ITEM", payload: { key } });
    const updateQty = (key, qty) => dispatch({ type: "UPDATE_QTY", payload: { key, qty } });
    const clearCart = () => dispatch({ type: "CLEAR" });

    return (
        <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
