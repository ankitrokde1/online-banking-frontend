import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animation/bank.json";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "../../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="landing-wrapper bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h1 className="mb-3 animate__animated animate__fadeInDown">
                🚀 Elevate Your Finances with{" "}
                <span className="text-primary fw-bold">SecureBank</span>
              </h1>
              <p className="lead animate__animated animate__fadeInUp animate__delay-1s">
                A modern digital bank built for speed, security, and simplicity.
              </p>
              <div className="mt-4 animate__animated animate__fadeInUp animate__delay-2s">
                <Button
                  variant="primary"
                  size="lg"
                  className="me-3 px-4"
                  onClick={() => navigate("/login")}
                >
                  🔐 Login
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="px-4"
                  onClick={() => navigate("/register")}
                >
                  ✨ Open Account
                </Button>
              </div>
            </Col>

            <Col md={6} className="text-center mt-5 mt-md-0">
              <Player
                autoplay
                loop
                src={animationData}
                style={{ height: "400px", width: "100%" }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <section className="bg-white py-5 features-section">
        <Container>
          <h2 className="text-center fw-bold mb-5">
            🚀 Why Choose SecureBank?
          </h2>
          <Row className="g-4">
            {[
              {
                icon: "🛡️",
                title: "Bank-Grade Security",
                desc: "Your data and money are protected with advanced AES-256 encryption.",
              },
              {
                icon: "⚡",
                title: "Instant Money Transfers",
                desc: "Send and receive money within seconds—24/7, 365 days.",
              },
              {
                icon: "📲",
                title: "Smart Banking on the Go",
                desc: "Track balances, make transactions, and get insights—all on your phone.",
              },
            ].map((feature, i) => (
              <Col md={4} key={i}>
                <Card className="shadow-sm h-100 text-center p-4 feature-card">
                  <div className="display-3 mb-3">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient text-dark text-center py-5 ">
        <Container>
          <h3 className="mb-3 fw-bold fs-2">
            Ready to take control of your finances?
          </h3>
          <p className="lead">
            Open your account in minutes and start banking smarter.
          </p>
          <Button
            size="lg"
            className="get-started-btn mt-3 px-4 py-2 fw-semibold"
            onClick={() => navigate("/register")}
          >
            🚀 Get Started Now
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <Container>
          <small>
            &copy; {new Date().getFullYear()} SecureBank. Made with ❤️ for
            modern banking.
          </small>
        </Container>
      </footer>
    </>
  );
};

export default Home;
