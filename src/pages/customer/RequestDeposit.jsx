import { useState } from "react";
import { requestDeposit } from "../../api/transaction.api";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const RequestDeposit = () => {
  const [form, setForm] = useState({ targetAccountNumber: "", amount: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await requestDeposit(form);
      setSuccess("Deposit request submitted successfully!");
      setForm({ targetAccountNumber: "", amount: "" });
    } catch (err) {
      setError("Failed to submit deposit request.");
    }
  };

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          className="login-card shadow-lg p-4"
          style={{ maxWidth: 420, width: "100%" }}
        >
          <Card.Body>
            <h2 className="mb-3 text-center login-title">Request Deposit</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
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
              <Button type="submit" className="w-100 rounded-pill login-btn">
                Submit Deposit Request
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RequestDeposit;
