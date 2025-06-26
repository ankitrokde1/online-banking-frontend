import { useEffect, useState } from "react";
import { getMyAccounts } from "../../api/account.api";
import { getTransactions } from "../../api/transaction.api";
import {
  Container,
  Table,
  Alert,
  Form,
  Spinner,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import TransactionRow from "../../components/transaction/TransactionRow";
import Loader from "../../components/common/Loader";

const Transactions = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortField, setSortField] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getMyAccounts();
        const active = res.data.filter((acc) => acc.isActive);
        setAccounts(active);
        if (active.length > 0) setSelectedAccount(active[0].accountNumber);
      } catch {
        setError("Could not load accounts.");
      }
    };
    fetchAccounts();
  }, []);

  // Load transactions
  useEffect(() => {
    const fetchTxns = async () => {
      if (!selectedAccount) return;
      setLoading(true);
      setError("");
      try {
        const res = await getTransactions(selectedAccount);
        setTransactions(res.data);
      } catch {
        setError("Could not load transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTxns();
  }, [selectedAccount]);

  // Apply filters + search + sort
  const filteredTxns = transactions
    .filter((tx) =>
      statusFilter === "ALL" ? true : tx.status === statusFilter
    )
    .filter((tx) => (typeFilter === "ALL" ? true : tx.type === typeFilter))
    .filter((tx) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        tx.description?.toLowerCase().includes(query) ||
        tx.fromAccountNumber?.toLowerCase().includes(query) ||
        tx.toAccountNumber?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const aValue = sortField === "amount" ? a.amount : new Date(a.timestamp);
      const bValue = sortField === "amount" ? b.amount : new Date(b.timestamp);
      return sortOrder === "ASC" ? aValue - bValue : bValue - aValue;
    });

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Transactions</h2>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            {accounts.map((acc) => (
              <option key={acc.accountNumber} value={acc.accountNumber}>
                {acc.accountType} - {acc.accountNumber}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="SUCCESS">✅ Success</option>
            <option value="PENDING">⚠️ Pending</option>
            <option value="REJECTED">❌ Rejected</option>
          </Form.Select>
        </Col>

        <Col md={2}>
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

        <Col md={3} className="mt-2">
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

      {/* Table */}
      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Loader size="md" message="Loading..." />
      ) : filteredTxns.length === 0 ? (
        <p>No transactions found for this filter/search.</p>
      ) : (
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Amount (₹)</th>
              <th>From</th>
              <th>To</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.map((tx, index) => (
              <TransactionRow key={tx.id} txn={tx} index={index} />
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Transactions;
