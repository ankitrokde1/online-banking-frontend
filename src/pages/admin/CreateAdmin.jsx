import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { showError, showSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { createAdminUser } from "../../api/auth.api";
import "../../css/Login.css"; // Ensure styles are applied

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loader
    try {
      await createAdminUser({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "ADMIN",
      });

      showSuccess("Admin user created successfully!");
      navigate("/admin/users");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create admin.";
      showError(msg);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow p-4">
        <h2 className="mb-4 text-center text-primary">Create an Admin</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="rounded-pill"
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-pill"
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="rounded-pill"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="rounded-pill"
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              className="login-btn rounded-pill"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating...
                </>
              ) : (
                "Create Admin"
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateAdmin;
