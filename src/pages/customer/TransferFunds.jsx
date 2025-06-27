import { useState } from "react";
import { transferFunds } from "../../api/transaction.api";
import { Container, Form, Button, Alert, Card, Modal } from "react-bootstrap";
import { showError, showSuccess } from "../../utils/toast";

const TransferFunds = () => {
  const [form, setForm] = useState({
    sourceAccountNumber: "",
    targetAccountNumber: "",
    amount: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setShowConfirm(true); // Show confirmation modal
  };

  const handleConfirmTransfer = async () => {
    setLoading(true);
    setShowConfirm(false);
    try {
      await transferFunds(form);
      showSuccess("Transfer successful!");
      setForm({ sourceAccountNumber: "", targetAccountNumber: "", amount: "" });
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to process the transfer. Try again."
      );
    } finally {
      setLoading(false);
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
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Transferring...
                  </>
                ) : (
                  "Transfer Funds"
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 text-center" style={{ fontSize: 40 }}>
            💸
          </div>
          <p>Please confirm the following transfer details:</p>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>
              <b>From:</b> {form.sourceAccountNumber}
            </li>
            <li>
              <b>To:</b> {form.targetAccountNumber}
            </li>
            <li>
              <b>Amount:</b> ₹{form.amount}
            </li>
          </ul>
          <p className="text-danger fw-bold mb-0">
            Are you sure you want to proceed?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirm(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmTransfer}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Transferring...
              </>
            ) : (
              "Yes, Transfer"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransferFunds;
