import { Spinner } from "react-bootstrap";

const Loader = ({ size = "md", message = "Loading..." }) => {
  const spinnerSize = size === "sm" ? "sm" : undefined;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" role="status" size={spinnerSize} />
      <span className="mt-2 text-muted">{message}</span>
    </div>
  );
};

export default Loader;
