import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

const Unauthorized = () => {
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
            maxWidth: 400,
            width: "100%",
            background: "#fff",
          }}
        >
          <Card.Body className="text-center">
            <Player
              autoplay
              loop
              src="https://assets5.lottiefiles.com/packages/lf20_jtbfg2nb.json"
              style={{ height: "180px", width: "180px", margin: "0 auto" }}
            />
            <h2
              className="mt-3 mb-2"
              style={{ color: "#d32f2f", fontWeight: 700 }}
            >
              🚫 Access Denied
            </h2>
            <p className="text-muted mb-4">
              You don’t have permission to view this page.
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

export default Unauthorized;
