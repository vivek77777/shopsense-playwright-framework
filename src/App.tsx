import { useState } from "react";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import type { Product } from "./types/Product";
import type { CartItem } from "./types/CartItem";

type AppPage = "login" | "products" | "checkout" | "confirmation";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("login");
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleLogin = () => {
    if (email === "qa.user@shopsense.com" && password === "Password123!") {
      setCurrentPage("products");
      setLoginError("");
      return;
    }

    setLoginError("Invalid email or password");
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }

    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const handleIncreaseQuantity = (productId: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (currentPage === "login") {
    return (
      <LoginPage
        email={email}
        password={password}
        loginError={loginError}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
      />
    );
  }

  if (currentPage === "checkout") {
    return (
      <CheckoutPage
        cartCount={cartItemCount}
        onPlaceOrder={() => setCurrentPage("confirmation")}
        onBackToProducts={() => setCurrentPage("products")}
      />
    );
  }

  if (currentPage === "confirmation") {
    return (
      <main className="page">
        <h1 data-testid="order-confirmation">Order Confirmed</h1>
        <p>Thank you for shopping with ShopSense.</p>
        <p data-testid="confirmed-items">{cartItemCount} item(s) purchased</p>
      </main>
    );
  }

  return (
    <ProductsPage
      cart={cart}
      onAddToCart={handleAddToCart}
      onIncreaseQuantity={handleIncreaseQuantity}
      onDecreaseQuantity={handleDecreaseQuantity}
      onRemoveItem={handleRemoveItem}
      onCheckout={() => setCurrentPage("checkout")}
    />
  );
}

export default App;