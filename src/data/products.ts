import type { Product } from "../types/Product";

export const products: Product[] = [
    {
        id: 1,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 29.99,
        inStock: true,
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 89.99,
        inStock: true,
    },
    {
        id: 3,
        name: "USB-C Hub",
        category: "Adapters",
        price: 49.99,
        inStock: false,
    },
];