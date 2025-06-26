import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AccountCard = ({ account }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>
          {account.accountType} Account{" "}
          {account.isActive ? (
            <Badge bg="success" className="ms-2">
              Active
            </Badge>
          ) : (
            <Badge bg="secondary" className="ms-2">
              Inactive
            </Badge>
          )}
        </Card.Title>

        <Card.Text>
          <strong>Account No:</strong> {account.accountNumber} <br />
          <strong>Balance:</strong> ₹{account.balance?.toLocaleString()} <br />
          <strong>Opened At:</strong>{" "}
          {new Date(account.openAt).toLocaleString()}
        </Card.Text>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/accounts/${account.accountNumber}`)}
          >
            View Details
          </Button>

          {/* {account.isActive && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDeactivate(account.accountNumber)}
            >
              Deactivate
            </Button>
          )} */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AccountCard;
