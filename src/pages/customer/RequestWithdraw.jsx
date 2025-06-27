import { useState } from "react";
import { requestWithdraw } from "../../api/transaction.api";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { showSuccess } from "../../utils/toast";

const RequestWithdraw = () => {
  const [form, setForm] = useState({ sourceAccountNumber: "", amount: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- Add this

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true); // Start loader
    try {
      await requestWithdraw(form);
      showSuccess("Withdrawal request submitted for approval.");
      setForm({ sourceAccountNumber: "", amount: "" });
    } catch (err) {
      setError("Failed to submit withdrawal request.");
    } finally {
      setLoading(false); // Stop loader
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
            <h2 className="mb-3 text-center login-title">Request Withdrawal</h2>
            {/* {success && <Alert variant="success">{success}</Alert>} */}
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
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount to withdraw"
                  required
                  min="1"
                  className="rounded-pill"
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 rounded-pill login-btn"
                style={{
                  background:
                    "linear-gradient(90deg, #d32f2f 0%, #ff8a65 100%)",
                  border: "none",
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Withdrawal Request"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RequestWithdraw;
