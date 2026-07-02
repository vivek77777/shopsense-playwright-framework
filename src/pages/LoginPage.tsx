type LoginPageProps = {
    email: string;
    password: string;
    loginError: string;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onLogin: () => void;
};

export function LoginPage({
    email,
    password,
    loginError,
    onEmailChange,
    onPasswordChange,
    onLogin,
}: LoginPageProps) {
    return (
        <main className="page">
            <h1>ShopSense Login</h1>

            <label>Email</label>
            <input
                data-testid="email-input"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="qa.user@shopsense.com"
            />

            <label>Password</label>
            <input
                data-testid="password-input"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="Password123!"
            />

            <button data-testid="login-button" onClick={onLogin}>
                Login
            </button>

            {loginError && (
                <p data-testid="login-error" className="error">
                    {loginError}
                </p>
            )}
        </main>
    );
}