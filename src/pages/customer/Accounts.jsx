import { useEffect, useState } from "react";
import {
  getMyAccounts,
  requestAccount,
  deactivateAccount,
} from "../../api/account.api";
import {
  Container,
  Button,
  Alert,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { showError, showInfo } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [accountType, setAccountType] = useState("SAVINGS");
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const res = await getMyAccounts();
      setAccounts(res.data);
    } catch (err) {
      showError("Could not fetch accounts.");
    }
  };

  const handleRequestAccount = async () => {
    try {
      await requestAccount(accountType);
      showInfo("Account request submitted successfully.");
      fetchAccounts(); // reload accounts
    } catch {
      alert("Failed to request account.");
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3" style={{ color: "#1976d2", fontWeight: 700 }}>
        Your Accounts
      </h2>

      <div className="d-flex gap-2 my-3 align-items-center">
        <Form.Select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="rounded-pill"
          style={{ maxWidth: 180 }}
        >
          <option value="SAVINGS">SAVINGS</option>
          <option value="CURRENT">CURRENT</option>
        </Form.Select>
        <Button
          variant="outline-dark"
          className="rounded-pill"
          onClick={handleRequestAccount}
        >
          ➕ Request New Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <p className="text-muted">No accounts yet.</p>
      ) : (
        <Row className="g-4">
          {accounts.map((acc) => (
            <Col xs={12} md={6} lg={4} key={acc.accountNumber}>
              <Card
                className="shadow-sm"
                style={{
                  borderRadius: "1.5rem",
                  background:
                    "linear-gradient(120deg, #e3f0ff 0%, #b6e0fe 100%)",
                  cursor: "pointer",
                  transition: "transform 0.18s, box-shadow 0.18s",
                }}
                onClick={() => navigate(`/accounts/${acc.accountNumber}`)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate(`/accounts/${acc.accountNumber}`);
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#1976d2", fontWeight: 600 }}>
                    {acc.accountType} Account
                  </Card.Title>
                  <Card.Text>
                    <strong>Account No:</strong> {acc.accountNumber}
                  </Card.Text>
                  <Card.Text>
                    <strong>Balance:</strong> ₹{acc.balance?.toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    <span className="badge bg-success">{acc.status}</span>
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/accounts/${acc.accountNumber}`);
                    }}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Accounts;
