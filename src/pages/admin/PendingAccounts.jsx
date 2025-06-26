import { useEffect, useState } from "react";
import {
  getPendingAccounts,
  getUser,
  processAccount,
} from "../../api/admin.api";
import { Container, Table, Button, Alert, Modal } from "react-bootstrap";
import { showError } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const PendingAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [usernames, setUsernames] = useState({});
  const [loading, setLoading] = useState(false);

  // Confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // {id, action, username}

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPendingAccounts();
      setAccounts(res.data);

      const userIds = [...new Set(res.data.map((acc) => acc.userId))];
      const usernameMap = {};
      await Promise.all(
        userIds.map(async (id) => {
          try {
            const userRes = await getUser(id);
            usernameMap[id] = userRes.data.username || id;
          } catch {
            usernameMap[id] = id;
          }
        })
      );
      setUsernames(usernameMap);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to load pending accounts.";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setShowConfirm(false);
    try {
      await processAccount(id, action);
      fetchData();
    } catch {
      showError("Action failed.");
    }
  };

  const openConfirm = (id, action, username) => {
    setPendingAction({ id, action, username });
    setShowConfirm(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Pending Account Requests</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Loader size="md" message="Loading pending accounts..." />
      ) : accounts.length === 0 ? (
        <p>No pending account requests.</p>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Account No</th>
              <th>Type</th>
              <th>Username</th>
              <th>Requested On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, i) => (
              <tr key={acc.id}>
                <td>{i + 1}</td>
                <td>{acc.accountNumber || "PENDING"}</td>
                <td>{acc.accountType}</td>
                <td>{usernames[acc.userId] || acc.userId}</td>
                <td>
                  {new Date(acc.requestedAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    onClick={() =>
                      openConfirm(
                        acc.id,
                        true,
                        usernames[acc.userId] || acc.userId
                      )
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      openConfirm(
                        acc.id,
                        false,
                        usernames[acc.userId] || acc.userId
                      )
                    }
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {pendingAction?.action ? "Approve Account" : "Reject Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div style={{ fontSize: 48 }}>
            {pendingAction?.action ? "✅" : "❌"}
          </div>
          <p className="mt-3 mb-0">
            Are you sure you want to{" "}
            <span
              style={{
                fontWeight: 700,
                color: pendingAction?.action ? "#388e3c" : "#d32f2f",
              }}
            >
              {pendingAction?.action ? "APPROVE" : "REJECT"}
            </span>{" "}
            the account request for{" "}
            <span style={{ fontWeight: 600, color: "#1976d2" }}>
              {pendingAction?.username}
            </span>
            ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant={pendingAction?.action ? "success" : "danger"}
            onClick={() => handleAction(pendingAction.id, pendingAction.action)}
          >
            {pendingAction?.action ? "Approve" : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PendingAccounts;
