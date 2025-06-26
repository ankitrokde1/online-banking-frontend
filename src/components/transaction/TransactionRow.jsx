import { useState } from "react";
import { Button, Badge, Modal } from "react-bootstrap";

const statusColors = {
  SUCCESS: "success",
  PENDING: "warning",
  REJECTED: "danger",
};

const TransactionRow = ({ txn, index, onAction }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{txn.type}</td>
        <td>₹{txn.amount.toLocaleString()}</td>
        <td>{txn.fromAccountNumber || "-"}</td>
        <td>{txn.toAccountNumber || "-"}</td>
        <td>{txn.description || "-"}</td>
        <td>{new Date(txn.timestamp).toLocaleString()}</td>
        <td>
          {txn.status === "PENDING" && onAction ? (
            <>
              <Button
                size="sm"
                variant="success"
                className="me-2"
                onClick={() => onAction(txn.id, "approve")}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onAction(txn.id, "reject")}
              >
                Reject
              </Button>
            </>
          ) : (
            <Badge bg={statusColors[txn.status] || "secondary"}>
              {txn.status || "UNKNOWN"}
            </Badge>
          )}
          <div className="mt-2">
            <Button size="sm" variant="info" onClick={handleShow}>
              View Details
            </Button>
          </div>
        </td>
      </tr>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>ID:</strong> {txn.id}
          </p>
          <p>
            <strong>Type:</strong> {txn.type}
          </p>
          <p>
            <strong>Status:</strong> {txn.status}
          </p>
          <p>
            <strong>Amount:</strong> ₹{txn.amount.toLocaleString()}
          </p>
          <p>
            <strong>From:</strong> {txn.fromAccountNumber || "-"}
          </p>
          <p>
            <strong>To:</strong> {txn.toAccountNumber || "-"}
          </p>
          <p>
            <strong>Date:</strong> {new Date(txn.timestamp).toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {txn.description || "-"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionRow;
