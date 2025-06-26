import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import "../../css/Login.css";

const adminCards = [
  {
    title: "Pending Account Requests",
    desc: "View and approve/reject new account openings.",
    icon: "📝",
    color: "#1976d2",
    bg: "linear-gradient(135deg, #e3f0ff 0%, #b6e0fe 100%)",
    to: "/admin/pending-accounts",
    aria: "Go to Pending Account Requests",
  },
  {
    title: "Pending Transactions",
    desc: "Process deposit/withdrawal approvals.",
    icon: "💸",
    color: "#00838f",
    bg: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)",
    to: "/admin/pending-transactions",
    aria: "Go to Pending Transactions",
  },
  {
    title: "Manage Users",
    desc: "View, edit, or delete users in the system.",
    icon: "👥",
    color: "#388e3c",
    bg: "linear-gradient(135deg, #e8f5e9 0%, #b2dfdb 100%)",
    to: "/admin/users",
    aria: "Go to Manage Users",
  },
  {
    title: "Admin Actions",
    desc: "Direct deposit, withdraw, or transfer funds.",
    icon: "⚙️",
    color: "#f9a825",
    bg: "linear-gradient(135deg, #fffde7 0%, #ffe082 100%)",
    to: "/admin/actions",
    aria: "Go to Admin Actions",
  },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-bg" style={{ minHeight: "100vh" }}>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center min-vh-100"
        style={{ minHeight: "100vh" }}
      >
        <h2 className="mb-4 text-center login-title">Admin Panel 👨‍💼</h2>
        <p className="text-center mb-5">
          Welcome, <strong>{user?.username}</strong> ({user?.email})
        </p>
        <Row className="g-4 justify-content-center w-100">
          {adminCards.map((card, idx) => (
            <Col
              key={card.title}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex align-items-stretch"
            >
              <Card
                className="shadow-lg admin-card-hover w-100"
                style={{
                  background: card.bg,
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "1.5rem",
                  minHeight: "220px",
                  outline: "none",
                }}
                tabIndex={0}
                role="button"
                aria-label={card.aria}
                onClick={() => navigate(card.to)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(card.to);
                }}
              >
                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center h-100">
                  <div style={{ fontSize: "2.5rem", color: card.color }}>
                    {card.icon}
                  </div>
                  <Card.Title
                    className="mt-2 mb-1"
                    style={{ color: card.color, fontWeight: 600 }}
                  >
                    {card.title}
                  </Card.Title>
                  <Card.Text className="text-muted">{card.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
