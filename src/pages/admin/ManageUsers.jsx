import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "../../api/admin.api";
import {
  Container,
  Table,
  Alert,
  Spinner,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { showError, showSuccess } from "../../utils/toast";
import Loader from "../../components/common/Loader";
import { activateAccount, deactivateAccount } from "../../api/account.api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAccountsModal, setShowAccountsModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    role: "CUSTOMER",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      return res.data; // 🟢 return updated users
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load users.";
      showError(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      );
    }

    if (roleFilter !== "ALL") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, searchTerm, roleFilter]);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      showSuccess(`Deleted ${selectedUser.username}`);
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      showError("Failed to delete user.");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await updateUser(selectedUser.id, editForm);
      showSuccess("User updated successfully.");
      setShowEditModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update user.";
      showError(msg);
      // showError("Failed to update user.");
    }
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleViewAccounts = (user) => {
    setSelectedUser(user);
    setShowAccountsModal(true);
  };

  const handleToggleAccount = async (accountNumber, isActive) => {
    try {
      if (isActive) {
        await deactivateAccount(accountNumber);
        showSuccess(`Deactivated account ${accountNumber}`);
      } else {
        await activateAccount(accountNumber);
        showSuccess(`Activated account ${accountNumber}`);
      }

      const updatedUsers = await fetchUsers(); // fetch fresh
      const updatedUser = updatedUsers.find((u) => u.id === selectedUser.id);
      setSelectedUser(updatedUser);
    } catch (err) {
      showError("Failed to update account status.");
    }
  };

  const [pendingAccountAction, setPendingAccountAction] = useState(null);

  return (
    <Container className="mt-4">
      <h2>Manage Users</h2>

      <div className="d-flex gap-3 align-items-center my-3 flex-wrap">
        <input
          type="text"
          className="form-control"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px" }}
        />

        <select
          className="form-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="CUSTOMER">Customer</option>
        </select>
      </div>

      {loading ? (
        <Loader size="md" message="Fetching Users..." />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredUsers.length === 0 ? (
        <p>No matching users found.</p>
      ) : (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Accounts</th>
                <th>Total Balance</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((u, i) => (
                <tr key={u.id}>
                  <td>{(currentPage - 1) * usersPerPage + i + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.accounts?.length || 0}</td>
                  <td>
                    {/* ₹ */}
                    {u.accounts
                      ?.reduce((sum, acc) => sum + acc.balance, 0)
                      .toLocaleString()}
                  </td>
                  <td>
                    {new Date(u.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleViewAccounts(u)}
                    >
                      View Accounts
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditClick(u)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(u)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
            <Button
              size="sm"
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              ⬅ Prev
            </Button>

            {Array.from({ length: totalPages }, (_, idx) => (
              <Button
                key={idx + 1}
                size="sm"
                variant={
                  currentPage === idx + 1 ? "primary" : "outline-primary"
                }
                onClick={() => goToPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next ➡
            </Button>
          </div>
        </>
      )}

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedUser?.username}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="role" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={editForm.role}
                onChange={handleInputChange}
              >
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="ADMIN">ADMIN</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAccountsModal}
        onHide={() => setShowAccountsModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Accounts of {selectedUser?.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser?.accounts?.length > 0 ? (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Account No</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Opened At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.accounts.map((acc) => (
                  <tr key={acc.id}>
                    <td>{acc.accountNumber}</td>
                    <td>{acc.accountType}</td>
                    <td>₹{acc.balance.toLocaleString()}</td>
                    <td>{acc.isActive ? "Active" : "Inactive"}</td>
                    <td>
                      {new Date(acc.openAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      {acc.isActive ? (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            setPendingAccountAction({
                              accountNumber: acc.accountNumber,
                              isActive: true,
                              username: selectedUser.username,
                            })
                          }
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() =>
                            setPendingAccountAction({
                              accountNumber: acc.accountNumber,
                              isActive: false,
                              username: selectedUser.username,
                            })
                          }
                        >
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">This user has no accounts.</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAccountsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Attractive confirmation modal for Activate/Deactivate */}
      <Modal
        show={!!pendingAccountAction}
        onHide={() => setPendingAccountAction(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {pendingAccountAction?.isActive
              ? "Deactivate Account"
              : "Activate Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div style={{ fontSize: 48 }}>
            {pendingAccountAction?.isActive ? "❌" : "✅"}
          </div>
          <p className="mt-3 mb-0">
            Are you sure you want to{" "}
            <span
              style={{
                fontWeight: 700,
                color: pendingAccountAction?.isActive ? "#d32f2f" : "#388e3c",
              }}
            >
              {pendingAccountAction?.isActive ? "DEACTIVATE" : "ACTIVATE"}
            </span>{" "}
            account{" "}
            <span style={{ fontWeight: 600, color: "#1976d2" }}>
              {pendingAccountAction?.accountNumber}
            </span>{" "}
            for user{" "}
            <span style={{ fontWeight: 600, color: "#1976d2" }}>
              {pendingAccountAction?.username}
            </span>
            ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setPendingAccountAction(null)}
          >
            Cancel
          </Button>
          <Button
            variant={pendingAccountAction?.isActive ? "danger" : "success"}
            onClick={async () => {
              await handleToggleAccount(
                pendingAccountAction.accountNumber,
                pendingAccountAction.isActive
              );
              setPendingAccountAction(null);
            }}
          >
            {pendingAccountAction?.isActive ? "Deactivate" : "Activate"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageUsers;
