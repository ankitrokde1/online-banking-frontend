import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { showSuccess, showError } from "../../utils/toast";
import axios from "../../api/axiosInstance";
import "../../css/Login.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      await axios.post("/auth/reset-password", {
        token,
        newPassword: form.newPassword,
      });
      showSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      showError("Reset failed. Invalid or expired token.");
    }
  };

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="login-card shadow-lg p-4">
          <Card.Body>
            <h2 className="mb-4 text-center login-title">Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  required
                  value={form.newPassword}
                  placeholder="Enter your new password"
                  onChange={handleChange}
                  className="rounded-pill"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  required
                  value={form.confirmPassword}
                  placeholder="Confirm your new password"
                  onChange={handleChange}
                  className="rounded-pill"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 rounded-pill login-btn"
              >
                Reset Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResetPassword;
