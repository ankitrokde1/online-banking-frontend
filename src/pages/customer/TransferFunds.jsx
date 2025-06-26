import { useState } from "react";
import { transferFunds } from "../../api/transaction.api";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const TransferFunds = () => {
  const [form, setForm] = useState({
    sourceAccountNumber: "",
    targetAccountNumber: "",
    amount: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await transferFunds(form);
      setSuccess("Transfer successful!");
      setForm({ sourceAccountNumber: "", targetAccountNumber: "", amount: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to process the transfer. Try again."
      );
    }
  };

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card
          className="login-card shadow-lg p-4"
          style={{ maxWidth: 420, width: "100%" }}
        >
          <Card.Body>
            <h2 className="mb-3 text-center login-title">Transfer Funds</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Source Account Number</Form.Label>
                <Form.Control
                  type="text"
                  name="sourceAccountNumber"
                  value={form.sourceAccountNumber}
                  onChange={handleChange}
                  placeholder="Enter your account number"
                  required
                  className="rounded-pill"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Target Account Number</Form.Label>
                <Form.Control
                  type="text"
                  name="targetAccountNumber"
                  value={form.targetAccountNumber}
                  onChange={handleChange}
                  placeholder="Enter target account number"
                  required
                  className="rounded-pill"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                  min="1"
                  className="rounded-pill"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 rounded-pill login-btn"
              >
                Transfer Funds
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default TransferFunds;
