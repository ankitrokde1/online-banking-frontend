import { useAuth } from "../../auth/AuthProvider";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { showSuccess, showError } from "../../utils/toast";
import { updateUserProfile } from "../../api/users.api"; // 🔧 You'll need to create this API function
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: user?.email, password: "" , username: user?.username || "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  if (!user) return null;

  const handleEdit = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatePayload = { email: form.email };
      if (form.password) updatePayload.password = form.password;

      const updatedUser = await updateUserProfile(user.id, updatePayload);
      showSuccess("Profile updated successfully.");
      setUser(updatedUser); // context update
      handleClose();
    } catch (error) {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile.";
        showError(msg);
    } finally {
      setLoading(false);
    }
  };
  
  const getDashboardRoute = () => {
    if (user.role === "ADMIN") return "/admin";
    return "/dashboard";
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        className="shadow-lg p-4"
        style={{
          borderRadius: "2rem",
          maxWidth: 420,
          width: "100%",
          background: "linear-gradient(120deg, #e3f0ff 0%, #b6e0fe 100%)",
          border: "none",
        }}
      >
        <Card.Body className="text-center">
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
              boxShadow: "0 2px 12px rgba(80,80,160,0.10)",
              fontSize: "2.7rem",
              color: "#1976d2",
            }}
          >
            👤
          </div>

          <h2 className="mb-4 login-title" style={{ fontSize: "2rem" }}>
            {user.username}
          </h2>

          <Row className="mb-3">
            <Col sm={4} className="fw-bold text-end">
              Email:
            </Col>
            <Col sm={8} className="text-start text-break">
              {user.email}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={4} className="fw-bold text-end">
              Role:
            </Col>
            <Col sm={8} className="text-start">
              <Badge
                bg={user.role === "ADMIN" ? "danger" : "primary"}
                style={{
                  fontSize: "1rem",
                  padding: "0.5em 1.2em",
                  borderRadius: "1.2em",
                  letterSpacing: "1px",
                  boxShadow: "0 2px 8px rgba(80,80,160,0.07)",
                }}
              >
                {user.role}
              </Badge>
            </Col>
          </Row>

          <Row>
            <Col sm={4} className="fw-bold text-end">
              Joined:
            </Col>
            <Col sm={8} className="text-start">
              {new Date(user.createdAt || Date.now()).toLocaleString()}
            </Col>
          </Row>

          <Button variant="outline-dark" className="mt-4" onClick={handleEdit}>
            ✏️ Edit Profile
          </Button>
          <Button
            variant="primary"
            className="mt-4 ms-2 rounded-pill login-btn"
            onClick={() => navigate(getDashboardRoute())}
          >
            🏠 Back to Dashboard
          </Button>
        </Card.Body>
      </Card>

      {/* ✨ Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Update Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Change Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Leave blank to keep same"
                value={form.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
