import type { Product } from "../types/Product";

type ProductCardProps = {
    product: Product;
    onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="product-card" data-testid="product-card">
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>${product.price.toFixed(2)}</p>

            <button
                data-testid={`add-to-cart-${product.id}`}
                disabled={!product.inStock}
                onClick={() => onAddToCart(product)}
            >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    );
}