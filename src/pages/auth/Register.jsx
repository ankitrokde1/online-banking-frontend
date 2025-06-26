import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "../../css/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="register-card shadow-lg p-4">
          <Card.Body>
            <h2 className="mb-4 text-center login-title">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={form.username}
                  placeholder="Enter your username"
                  onChange={handleChange}
                  required
                  className="rounded-pill"
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Enter your email address"
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

              <Form.Group controlId="role" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="rounded-pill"
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2 rounded-pill"
                  onClick={() => navigate("/login")}
                  disabled={loading}
                >
                  Already have an account? Login
                </Button>
                <Button
                  variant="outline-dark"
                  size="sm"
                  className="me-2 rounded-pill"
                  onClick={() => navigate("/forgot-password")}
                  disabled={loading}
                >
                  Forgot Password?
                </Button>
              </div>

              <Button
                type="submit"
                variant="primary"
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
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
