import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTransactions } from "../../api/transaction.api";
import { getMyAccounts } from "../../api/account.api";
import {
  Container,
  Card,
  Table,
  Alert,
  Spinner,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import TransactionRow from "../../components/transaction/TransactionRow";
import Loader from "../../components/common/Loader";

const AccountDetails = () => {
  const { accountNumber } = useParams();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = transactions.length;
  const pending = transactions.filter((tx) => tx.status === "PENDING").length;
  const success = transactions.filter((tx) => tx.status === "SUCCESS").length;
  const rejected = transactions.filter((tx) => tx.status === "REJECTED").length;
  const lastTxnDate =
    transactions.length > 0
      ? new Date(transactions[0].timestamp).toLocaleString()
      : "N/A";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyAccounts();
        const found = res.data.find(
          (acc) => acc.accountNumber === accountNumber
        );
        if (!found) {
          setError("Account not found or not accessible.");
          return;
        }
        setAccount(found);
      } catch {
        setError("Could not fetch account details.");
      }
    };
    fetchData();
  }, [accountNumber]);

  useEffect(() => {
    const fetchTxns = async () => {
      try {
        setLoading(true);
        const res = await getTransactions(accountNumber);
        setTransactions(res.data);
      } catch {
        setError("Could not fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    if (accountNumber) fetchTxns();
  }, [accountNumber]);

  return (
    <Container className="mt-4">
      <Button
        variant="outline-dark"
        size="sm"
        className="mb-3 rounded-pill"
        onClick={() => navigate("/accounts")}
      >
        🔙 Back to Accounts
      </Button>
      <h2 className="mb-4" style={{ color: "#1976d2", fontWeight: 700 }}>
        Account Details
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {account && (
        <Row className="mb-4 g-3">
          <Col xs={12} md={4}>
            <Card
              className="mb-3 shadow-sm"
              style={{ borderRadius: "1.2rem", background: "#e3f0ff" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#1976d2" }}>💰 Balance</Card.Title>
                <Card.Text style={{ fontWeight: 600, fontSize: "1.2rem" }}>
                  ₹{account.balance?.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card
              className="mb-3 shadow-sm"
              style={{ borderRadius: "1.2rem", background: "#b2dfdb" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#388e3c" }}>
                  🔁 Total Transactions
                </Card.Title>
                <Card.Text style={{ fontWeight: 600 }}>{total}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card
              className="mb-3 shadow-sm"
              style={{ borderRadius: "1.2rem", background: "#c8e6c9" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#388e3c" }}>
                  ✅ Successful
                </Card.Title>
                <Card.Text style={{ fontWeight: 600 }}>{success}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card
              className="mb-3 shadow-sm"
              style={{ borderRadius: "1.2rem", background: "#fffde7" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#f9a825" }}>⏳ Pending</Card.Title>
                <Card.Text style={{ fontWeight: 600 }}>{pending}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card
              className="mb-3 shadow-sm"
              style={{ borderRadius: "1.2rem", background: "#ffcdd2" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#d32f2f" }}>
                  ❌ Rejected
                </Card.Title>
                <Card.Text style={{ fontWeight: 600 }}>{rejected}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card
              className="mb-3 shadow-sm"
              style={{ borderRadius: "1.2rem", background: "#e0e0e0" }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#616161" }}>
                  📆 Last Txn
                </Card.Title>
                <Card.Text style={{ fontWeight: 600 }}>{lastTxnDate}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Transactions Table */}
      {loading ? (
        <Loader size="md" message="Loading Transactions..." />
      ) : (
        <>
          <h4 className="mt-4 mb-3" style={{ color: "#1976d2" }}>
            Transaction History
          </h4>
          {transactions.length === 0 ? (
            <p>No transactions found for this account.</p>
          ) : (
            <Table bordered hover responsive className="shadow-sm rounded">
              <thead style={{ background: "#e3f0ff" }}>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <TransactionRow key={txn.id} txn={txn} index={index} />
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
};

export default AccountDetails;
