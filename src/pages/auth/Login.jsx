import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { showError, showSuccess, showInfo } from "../../utils/toast";
import "../../css/Login.css";

const Login = () => {
  const { login, isAuthenticated, isAdmin, isCustomer, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
    const [loading, setLoading] = useState(false);

  const fromSubmitRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !fromSubmitRef.current) {
      showInfo("You're already logged in!");
      if (isAdmin) navigate("/admin", { replace: true });
      else if (isCustomer) navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isAdmin, isCustomer, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      fromSubmitRef.current = true;
      const user = await login(form);

      showSuccess("Login successful!");

      if (user?.role === "ADMIN") navigate("/admin");
      else if (user?.role === "CUSTOMER") navigate("/dashboard");
    } catch (err) {
      showError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center ">
        <Card className="login-card shadow-lg p-4">
          <Card.Body>
            <h2 className="mb-4 text-center login-title">Welcome Back</h2>
           
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="usernameOrEmail" className="mb-3">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control
                  type="text"
                  name="usernameOrEmail"
                  value={form.usernameOrEmail}
                  placeholder="Username or email"
                  onChange={handleChange}
                  required
                  className="rounded-pill"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="rounded-pill"
                  disabled={loading}
                />
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill"
                  onClick={() => navigate("/register")}
                  disabled={loading}
                >
                  Sign Up
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="rounded-pill"
                  onClick={() => navigate("/forgot-password")}
                  disabled={loading}
                >
                  Forgot Password?
                </Button>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 rounded-pill login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
