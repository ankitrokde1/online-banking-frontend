import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="login-bg" style={{ minHeight: "100vh" }}>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card
          className="shadow-lg p-4"
          style={{
            borderRadius: "2rem",
            maxWidth: 420,
            width: "100%",
            background: "#fff",
          }}
        >
          <Card.Body className="text-center">
            <Player
              autoplay
              loop
              src="https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json"
              style={{ height: "200px", width: "200px", margin: "0 auto" }}
            />
            <h2
              className="mt-3 mb-2"
              style={{ color: "#1976d2", fontWeight: 700 }}
            >
              404 - Page Not Found
            </h2>
            <p className="text-muted mb-4">
              The page you are looking for doesn’t exist or has been moved.
            </p>
            <Button
              variant="primary"
              className="w-100 rounded-pill login-btn"
              onClick={() => navigate("/")}
            >
              🔙 Back to Home
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default NotFound;
