import { useState } from "react";

type CheckoutPageProps = {
    cartCount: number;
    onPlaceOrder: () => void;
    onBackToProducts: () => void;
};

type CheckoutErrors = {
    fullName?: string;
    email?: string;
    address?: string;
    postalCode?: string;
};

export function CheckoutPage({
    cartCount,
    onPlaceOrder,
    onBackToProducts,
}: CheckoutPageProps) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [errors, setErrors] = useState<CheckoutErrors>({});

    const validateForm = () => {
        const newErrors: CheckoutErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!email.includes("@") || !email.includes(".")) {
            newErrors.email = "Enter a valid email address";
        }

        if (!address.trim()) {
            newErrors.address = "Shipping address is required";
        }

        if (!postalCode.trim()) {
            newErrors.postalCode = "Postal code is required";
        } else if (postalCode.trim().length < 5) {
            newErrors.postalCode = "Postal code must be at least 5 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        const isValid = validateForm();

        if (isValid) {
            onPlaceOrder();
        }
    };

    return (
        <main className="page">
            <h1>Checkout</h1>
            <p data-testid="checkout-summary">{cartCount} item(s) in cart</p>

            <label>Full Name</label>
            <input
                data-testid="full-name-input"
                placeholder="Alex Morgan"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
            />
            {errors.fullName && (
                <p className="error" data-testid="full-name-error">
                    {errors.fullName}
                </p>
            )}

            <label>Email</label>
            <input
                data-testid="checkout-email-input"
                placeholder="alex@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && (
                <p className="error" data-testid="checkout-email-error">
                    {errors.email}
                </p>
            )}

            <label>Shipping Address</label>
            <input
                data-testid="address-input"
                placeholder="123 King Street"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
            />
            {errors.address && (
                <p className="error" data-testid="address-error">
                    {errors.address}
                </p>
            )}

            <label>Postal Code</label>
            <input
                data-testid="postal-code-input"
                placeholder="M5V 2T6"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
            />
            {errors.postalCode && (
                <p className="error" data-testid="postal-code-error">
                    {errors.postalCode}
                </p>
            )}

            <button data-testid="place-order-button" onClick={handlePlaceOrder}>
                Place Order
            </button>

            <button data-testid="back-to-products-button" onClick={onBackToProducts}>
                Back to Products
            </button>
        </main>
    );
}