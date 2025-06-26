import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { showSuccess, showError } from "../../utils/toast";
import axios from "../../api/axiosInstance";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [usernameOrEmail, setusernameOrEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/forgot-password", { usernameOrEmail });
      setSubmitted(true);
      showSuccess("Password reset link sent to your email.");
    } catch {
      showError("Failed to send reset link.");
    }
  };

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="login-card shadow-lg p-4">
          <Card.Body>
            <h2 className="mb-4 text-center login-title">Forgot Password</h2>
            {submitted ? (
              <Alert variant="success">
                ✅ A password reset link has been sent to your email.
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="usernameOrEmail" className="mb-3">
                  <Form.Label>Enter your Username Or Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={usernameOrEmail}
                    required
                    placeholder="Enter your username or email address"
                    onChange={(e) => setusernameOrEmail(e.target.value)}
                    className="rounded-pill"
                  />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="link"
                    className="p-0 m-0"
                    style={{
                      fontSize: "1.4rem",
                      color: "#1976d2",
                      textDecoration: "none", // Remove underline
                    }}
                    onClick={() => navigate("/login")}
                    title="Back to Login"
                  >
                    🔙
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-pill login-btn"
                  >
                    Send Reset Link
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;
