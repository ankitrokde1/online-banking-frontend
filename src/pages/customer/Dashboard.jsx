import { Container, Card, Row, Col } from "react-bootstrap";
import { useAuth } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";
import "../../css/Login.css";

const actions = [
  {
    icon: "➕",
    text: "Request New Account",
    to: "/accounts",
    color: "#1976d2",
    bg: "linear-gradient(135deg, #e3f0ff 0%, #b6e0fe 100%)",
  },
  {
    icon: "🏦",
    text: "View Your Accounts",
    to: "/accounts",
    color: "#388e3c",
    bg: "linear-gradient(135deg, #e8f5e9 0%, #b2dfdb 100%)",
  },
  {
    icon: "💰",
    text: "Request Deposit / Withdraw",
    to: "/deposit",
    color: "#00838f",
    bg: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)",
  },
  {
    icon: "🔄",
    text: "Transfer Funds",
    to: "/transfer",
    color: "#f9a825",
    bg: "linear-gradient(135deg, #fffde7 0%, #ffe082 100%)",
  },
  {
    icon: "📄",
    text: "View Transactions",
    to: "/transactions",
    color: "#7b1fa2",
    bg: "linear-gradient(135deg, #ede7f6 0%, #b39ddb 100%)",
  },
];

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="login-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card
          className="login-card shadow-lg p-4"
          style={{ maxWidth: 500, width: "100%" }}
        >
          <Card.Body>
            <h2 className="mb-3 text-center login-title">
              Welcome, {user?.username} 👋
            </h2>
            <p
              className="text-center mb-2"
              style={{ color: "#1976d2", fontWeight: 500 }}
            >
              {user?.email}
            </p>
            <p
              className="text-center mb-4"
              style={{ color: "#26c6da", fontWeight: 500 }}
            >
              Role: {user?.role}
            </p>
            <hr />
            <h5 className="mb-4 text-center" style={{ color: "#1976d2" }}>
              Quick Actions
            </h5>
            <Row className="g-3">
              {actions.map((a, i) => (
                <Col xs={12} sm={6} key={i}>
                  <Link
                    to={a.to}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className="d-flex flex-column align-items-center justify-content-center p-3 rounded shadow-sm h-100"
                      style={{
                        background: a.bg,
                        color: a.color,
                        fontWeight: 600,
                        minHeight: 100,
                        transition: "box-shadow 0.18s, transform 0.18s",
                        boxShadow: "0 2px 8px rgba(80,80,160,0.07)",
                      }}
                    >
                      <span
                        style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                      >
                        {a.icon}
                      </span>
                      <span style={{ textAlign: "center" }}>{a.text}</span>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
