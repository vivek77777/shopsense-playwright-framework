import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";
import { ProductCard } from "../components/ProductCard";

type ProductsPageProps = {
    cart: CartItem[];
    onAddToCart: (product: Product) => void;
    onIncreaseQuantity: (productId: number) => void;
    onDecreaseQuantity: (productId: number) => void;
    onRemoveItem: (productId: number) => void;
    onCheckout: () => void;
};

export function ProductsPage({
    cart,
    onAddToCart,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onRemoveItem,
    onCheckout,
}: ProductsPageProps) {
    const [search, setSearch] = useState("");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <main className="page">
            <h1>ShopSense Products</h1>
            <p data-testid="user-menu">QA User</p>

            <input
                data-testid="product-search"
                placeholder="Search products"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <section className="product-grid">
                {filteredProducts.length === 0 ? (
                    <p data-testid="no-products-message">No products found.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    ))
                )}
            </section>

            <aside className="cart" data-testid="cart">
                <h2>Cart</h2>

                {cart.length === 0 ? (
                    <p data-testid="empty-cart-message">Your cart is empty.</p>
                ) : (
                    <>
                        <p data-testid="cart-count">{cartItemCount} item(s)</p>

                        {cart.map((item) => (
                            <div
                                className="cart-item"
                                data-testid={`cart-item-${item.id}`}
                                key={item.id}
                            >
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)}</p>
                                <p data-testid={`cart-item-quantity-${item.id}`}>
                                    Quantity: {item.quantity}
                                </p>

                                <button
                                    data-testid={`decrease-quantity-${item.id}`}
                                    onClick={() => onDecreaseQuantity(item.id)}
                                >
                                    -
                                </button>

                                <button
                                    data-testid={`increase-quantity-${item.id}`}
                                    onClick={() => onIncreaseQuantity(item.id)}
                                >
                                    +
                                </button>

                                <button
                                    data-testid={`remove-item-${item.id}`}
                                    onClick={() => onRemoveItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <p data-testid="cart-total">
                            Total: ${cartTotal.toFixed(2)}
                        </p>

                        <button data-testid="checkout-button" onClick={onCheckout}>
                            Checkout
                        </button>
                    </>
                )}
            </aside>
        </main>
    );
}