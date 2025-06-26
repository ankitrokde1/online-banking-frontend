// src/utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showInfo = (msg) => {
  toast.info(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};
