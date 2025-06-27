# Online Banking Frontend

A modern, responsive React-based frontend for the Online Banking System. This application enables users to securely manage their bank accounts, perform transactions, and access a range of banking services through an intuitive web interface.

---

## Features

- **User Authentication:** Secure login, registration, and password management.
- **Role-Based Access:** Separate dashboards and features for Admins and Customers.
- **Account Management:** View account details, request deposits/withdrawals, and manage multiple accounts.
- **Fund Transfers:** Transfer money between accounts and users.
- **Transaction History:** View and search past transactions.
- **Admin Controls:** Manage users, approve/deny pending accounts and transactions.
- **Profile Management:** Update user profile details.
- **Responsive UI:** Works across desktops, tablets, and mobile devices.
- **Loader & Notifications:** User-friendly feedback with loaders and toast notifications.
- **Protected Routing:** Authenticated and role-based route protection.

---

## Tech Stack

- **Frontend:** React (JavaScript)
- **Routing:** React Router
- **HTTP Requests:** Axios
- **State Management:** React Context (via AuthProvider)
- **Styling:** CSS Modules , Bootstrap
- **Animation:** Lottie (for engaging visuals)
- **Notifications:** Toasts (custom utility)
- **Backend API:** Connects to [Online Banking Backend](https://github.com/ankitrokde1/online-banking-backend)

---

## Project Structure

```
├── api/           # API service modules (auth, account, admin, etc.)
├── assets/        # Static assets (favicons, animations)
├── auth/          # Authentication context and route guards
├── components/    # Reusable UI components (accounts, transactions, navbar, loader)
├── css/           # CSS files for major views
├── layouts/       # Layouts for Admin, Customer, and Guest
├── pages/         # All page-level components, grouped by feature/role
├── routes/        # Main app routing
├── utils/         # Utility functions (toasts, helpers)
├── App.jsx        # Root app component
├── main.jsx       # Entry point
└── index.css      # Global styles
```

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/ankitrokde1/online-banking-frontend.git
cd online-banking-frontend
```

### 2. Install Dependencies

```sh
npm install
# or
yarn
```

### 3. Configure Environment Variables

Create a `.env` file in the project root to specify your backend API URL:

```
VITE_API_URL=http://localhost:8080/api
```

> ⚠️ **Never commit your `.env` file with secrets to version control.**

### 4. Run the Application

```sh
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

- `npm run dev` – Start development server.
- `npm run build` – Build for production.
- `npm run preview` – Preview production build.

---

## Customization

- **API Endpoints:** Edit the `VITE_API_URL` in your `.env` file to point to your backend.
- **Role Guards:** See `auth/RoleRoute.jsx` for customizing role-based access.
- **Theme & Styles:** Update files in `css/` and `assets/` as needed.

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Lottie](https://lottiefiles.com/)
- [Axios](https://axios-http.com/)

---

## Contact

Questions or feedback?  
Open an issue or connect with [ankitrokde1](https://github.com/ankitrokde1).
