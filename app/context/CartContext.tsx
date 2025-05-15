import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
    Address,
    CartContextType,
    CartItem
} from "../types";

// interface CartItem {
//     id: string | number;
//     quantity: number;
//     price?: number;
//     [key: string]: any;
// }

// interface Address {
//     id?: string | number;
//     [key: string]: any;
// }

// interface CartContextType {
//     cartItems: CartItem[];
//     addToCartItem: (item: CartItem, quantity?: number) => Promise<void>;
//     deleteCartItem: (id: string | number) => Promise<void>;
//     totalPrice: string;
//     increaseQuantity: (id: string | number) => Promise<void>;
//     decreaseQuantity: (id: string | number) => Promise<void>;
//     quantity: number;
//     address: Address[];
//     updateAddress: (newAddress: Address[]) => Promise<void>;
//     clearCart: () => Promise<void>;
// }

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<string>("0.00");
    const [quantity, setQuantity] = useState<number>(0);
    const [address, setAddress] = useState<Address[]>([]);

    // Tránh gọi loadCartItems() nhiều lần
    const cartLoaded = useRef<boolean>(false);
    const addressLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (!cartLoaded.current) {
            loadCartItems();
            cartLoaded.current = true;
        }
    }, []);

    useEffect(() => {
        if (!addressLoaded.current) {
            loadAddress();
            addressLoaded.current = true;
        }
    }, []);

    const updateAddress = async (newAddress: Address[]): Promise<void> => {
        try {
            setAddress(newAddress);
            await AsyncStorage.setItem("Address", JSON.stringify(newAddress));
        } catch (error) {
            console.error("Lỗi khi cập nhật địa chỉ:", error);
        }
    };

    useEffect(() => {
        setQuantity(cartItems.reduce((sum, item) => sum + item.quantity, 0));
    }, [cartItems]);

    const loadCartItems = async (): Promise<void> => {
        try {
            let storedCart = await AsyncStorage.getItem("cart");
            let parsedCart = storedCart ? JSON.parse(storedCart) : [];
            setCartItems(parsedCart);
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        }
    };

    const loadAddress = async (): Promise<void> => {
        try {
            let storedAddress = await AsyncStorage.getItem("Address");
            let parsedAddress = storedAddress ? JSON.parse(storedAddress) : [];
            setAddress(parsedAddress);
        } catch (error) {
            console.error("Lỗi khi tải địa chỉ:", error);
        }
    };

    const addToCartItem = async (item: CartItem, quantity: number = 1): Promise<void> => {
        try {
            let cart = [...cartItems];
            let itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

            if (itemIndex !== -1) {
                cart[itemIndex].quantity += quantity;
            } else {
                cart.push({ ...item, quantity: quantity });
            }

            setCartItems(cart);
            await AsyncStorage.setItem("cart", JSON.stringify(cart));
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    const deleteCartItem = async (id: string | number): Promise<void> => {
        try {
            let updatedCart = cartItems.filter((item) => item.id !== id);
            setCartItems(updatedCart);
            await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    const clearCart = async (): Promise<void> => {
        try {
            setCartItems([]);
            await AsyncStorage.removeItem("cart");
        } catch (error) {
            console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
        }
    };

    const increaseQuantity = async (id: string | number): Promise<void> => {
        try {
            let updatedCart = cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
            await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.error("Lỗi khi tăng số lượng:", error);
        }
    };

    const decreaseQuantity = async (id: string | number): Promise<void> => {
        try {
            let updatedCart = cartItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            );
            setCartItems(updatedCart);
            await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        } catch (error) {
            console.error("Lỗi khi giảm số lượng:", error);
        }
    };

    const totalPriceMemo = useMemo(() => {
        return cartItems.reduce((total, item) => total + (Number(item.price || 0) * item.quantity), 0).toFixed(2);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCartItem,
            deleteCartItem,
            totalPrice: totalPriceMemo,
            increaseQuantity,
            decreaseQuantity,
            quantity,
            address,
            updateAddress,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
