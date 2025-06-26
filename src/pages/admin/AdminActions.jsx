import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "../../api/axiosInstance";
import { showSuccess, showError } from "../../utils/toast";

const AdminActions = () => {
  const [action, setAction] = useState("deposit");
  const [form, setForm] = useState({
    sourceAccountNumber: "",
    targetAccountNumber: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (action === "deposit") {
        await axios.post("/transactions/request-deposit", {
          targetAccountNumber: form.targetAccountNumber,
          amount: parseFloat(form.amount),
        });
        showSuccess("Deposit successful!");
      } else if (action === "withdraw") {
        await axios.post("/transactions/request-withdraw", {
          sourceAccountNumber: form.sourceAccountNumber,
          amount: parseFloat(form.amount),
        });
        showSuccess("Withdrawal successful!");
      } else if (action === "transfer") {
        await axios.post("/transactions/transfer", {
          sourceAccountNumber: form.sourceAccountNumber,
          targetAccountNumber: form.targetAccountNumber,
          amount: parseFloat(form.amount),
        });
        showSuccess("Transfer successful!");
      }
      setForm({
        sourceAccountNumber: "",
        targetAccountNumber: "",
        amount: "",
      });
    } catch (err) {
      showError(
        err?.response?.data?.message ||
          "Action failed. Please check account numbers or balance."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h2 className="mb-4">⚙️ Admin Direct Transaction</h2>
        <Card className="mb-4 shadow-lg">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="rounded-pill"
                >
                  <option value="deposit">Deposit</option>
                  <option value="withdraw">Withdraw</option>
                  <option value="transfer">Transfer</option>
                </Form.Select>
              </Form.Group>

              {action === "deposit" && (
                <Form.Group className="mb-3">
                  <Form.Label>Target Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="targetAccountNumber"
                    value={form.targetAccountNumber}
                    onChange={handleChange}
                    required
                    className="rounded-pill"
                  />
                </Form.Group>
              )}

              {action === "withdraw" && (
                <Form.Group className="mb-3">
                  <Form.Label>Source Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="sourceAccountNumber"
                    value={form.sourceAccountNumber}
                    onChange={handleChange}
                    required
                    className="rounded-pill"
                  />
                </Form.Group>
              )}

              {action === "transfer" && (
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>From Account Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="sourceAccountNumber"
                        value={form.sourceAccountNumber}
                        onChange={handleChange}
                        required
                        className="rounded-pill"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>To Account Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="targetAccountNumber"
                        value={form.targetAccountNumber}
                        onChange={handleChange}
                        required
                        className="rounded-pill"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  min="1"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="rounded-pill"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="w-100 rounded-pill login-btn"
              >
                {loading ? "Processing..." : "Submit"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AdminActions;
