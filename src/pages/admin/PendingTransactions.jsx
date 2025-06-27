import { useEffect, useState } from "react";
import {
  getPendingTransactions,
  processTransaction,
} from "../../api/admin.api";
import {
  Container,
  Table,
  Alert,
  Form,
  Row,
  Col,
  InputGroup,
  Modal,
  Button,
} from "react-bootstrap";
import { showSuccess, showError } from "../../utils/toast";
import TransactionRow from "../../components/transaction/TransactionRow";
import Loader from "../../components/common/Loader";

const PendingTransactions = () => {
  const [txns, setTxns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // Add this

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortField, setSortField] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("ASC");

  // Confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // {id, action, txn}

  const fetchTxns = async () => {
    try {
      setLoading(true);
      const res = await getPendingTransactions();
      setTxns(res.data);
    } catch {
      setError("Failed to load pending transactions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setActionLoading(true); // Start loader
    setShowConfirm(false);
    try {
      await processTransaction(id, action);
      await fetchTxns();
      showSuccess(
        action === "approve"
          ? "✅ Transaction approved successfully!"
          : "❌ Transaction rejected successfully!"
      );
    } catch {
      showError("Failed to process transaction.");
    } finally {
      setActionLoading(false); // Stop loader
    }
  };

  const openConfirm = (id, action, txn) => {
    setPendingAction({ id, action, txn });
    setShowConfirm(true);
  };

  useEffect(() => {
    fetchTxns();
  }, []);

  const filteredTxns = txns
    .filter((tx) => (typeFilter === "ALL" ? true : tx.type === typeFilter))
    .filter((tx) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        tx.description?.toLowerCase().includes(q) ||
        tx.fromAccountNumber?.toLowerCase().includes(q) ||
        tx.toAccountNumber?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const aValue = sortField === "amount" ? a.amount : new Date(a.timestamp);
      const bValue = sortField === "amount" ? b.amount : new Date(b.timestamp);
      return sortOrder === "ASC" ? aValue - bValue : bValue - aValue;
    });

  return (
    <Container className="mt-4">
      <h2>🧾 Pending Transaction Requests</h2>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="TRANSFER">🔁 Transfer</option>
            <option value="DEPOSIT">➕ Deposit</option>
            <option value="WITHDRAW">➖ Withdraw</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="timestamp">🕒 Date</option>
            <option value="amount">💰 Amount</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ASC">⬆️Ascending</option>
            <option value="DESC">⬇️Decending</option>
          </Form.Select>
        </Col>

        <Col md={5}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="🔍 Search (account/desc)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Loader size="md" message="Loading Pending Transaction..." />
      ) : filteredTxns.length === 0 ? (
        <Alert variant="info">
          No pending transactions match your filters.
        </Alert>
      ) : (
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Amount</th>
              <th>From</th>
              <th>To</th>
              <th>Description</th>
              <th>Requested At</th>
              <th>Status / Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.map((tx, i) => (
              <TransactionRow
                key={tx.id}
                txn={tx}
                index={i}
                onAction={(id, action) => openConfirm(id, action, tx)}
              />
            ))}
          </tbody>
        </Table>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {pendingAction?.action === "approve"
              ? "Approve Transaction"
              : "Reject Transaction"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div style={{ fontSize: 48 }}>
            {pendingAction?.action === "approve" ? "✅" : "❌"}
          </div>
          <p className="mt-3 mb-0">
            Are you sure you want to{" "}
            <span
              style={{
                fontWeight: 700,
                color:
                  pendingAction?.action === "approve" ? "#388e3c" : "#d32f2f",
              }}
            >
              {pendingAction?.action === "approve" ? "APPROVE" : "REJECT"}
            </span>{" "}
            this transaction?
          </p>
          {pendingAction?.txn && (
            <div className="mt-3 text-start" style={{ fontSize: "0.98rem" }}>
              <div>
                <b>Type:</b> {pendingAction.txn.type}
              </div>
              <div>
                <b>Amount:</b> ₹{pendingAction.txn.amount}
              </div>
              <div>
                <b>From:</b> {pendingAction.txn.fromAccountNumber}
              </div>
              <div>
                <b>To:</b> {pendingAction.txn.toAccountNumber}
              </div>
              <div>
                <b>Description:</b> {pendingAction.txn.description}
              </div>
              <div>
                <b>Requested At:</b>{" "}
                {new Date(pendingAction.txn.timestamp).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirm(false)}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            variant={pendingAction?.action === "approve" ? "success" : "danger"}
            onClick={() => handleAction(pendingAction.id, pendingAction.action)}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {pendingAction?.action === "approve"
                  ? "Approving..."
                  : "Rejecting..."}
              </>
            ) : pendingAction?.action === "approve" ? (
              "Approve"
            ) : (
              "Reject"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PendingTransactions;
