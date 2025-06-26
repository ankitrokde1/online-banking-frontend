import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../../auth/AuthProvider.jsx";
import { useNavigate, NavLink, Link } from "react-router-dom";
import "../../css/Login.css"; // For custom styles

const AppNavbar = () => {
  const { user, isAuthenticated, isAdmin, isCustomer, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Custom style for active nav link
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#1976d2" : "#1976d2", // Always visible blue
    background: isActive ? "#e3f0ff" : "transparent",
    borderRadius: "1.5rem",
    fontWeight: isActive ? 700 : 500,
    padding: "0.4rem 1rem",
    margin: "0 0.2rem",
    textDecoration: isActive ? "underline" : "none",
    transition: "all 0.2s",
  });

  return (
    <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{ fontWeight: 700, color: "#1976d2" }}
        >
          💰 Online Banking
        </Navbar.Brand>

        {isAuthenticated && (
          <>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto">
                {isCustomer && (
                  <>
                    <Nav.Link as={NavLink} to="/dashboard" style={navLinkStyle}>
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/accounts" style={navLinkStyle}>
                      Accounts
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/deposit" style={navLinkStyle}>
                      Deposit
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/withdraw" style={navLinkStyle}>
                      Withdraw
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/transfer" style={navLinkStyle}>
                      Transfer
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/transactions"
                      style={navLinkStyle}
                    >
                      Transactions
                    </Nav.Link>
                  </>
                )}

                {isAdmin && (
                  <>
                    <Nav.Link as={NavLink} to="/admin" end style={navLinkStyle}>
                      Admin Dashboard
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/admin/actions"
                      style={navLinkStyle}
                    >
                      Admin Actions
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/admin/pending-accounts"
                      style={navLinkStyle}
                    >
                      Pending Accounts
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/admin/pending-transactions"
                      style={navLinkStyle}
                    >
                      Pending Transactions
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/admin/users"
                      style={navLinkStyle}
                    >
                      Manage Users
                    </Nav.Link>
                  </>
                )}
              </Nav>
              <Navbar.Text className="me-3">
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 600,
                  }}
                >
                  👤 {user?.username}
                </Link>
              </Navbar.Text>

              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
