// src/utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccess = (msg) => {
  toast.success(msg, {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showError = (msg) => {
  toast.error(msg, {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showInfo = (msg) => {
  toast.info(msg, {
    position: "bottom-right",
    autoClose: 3000,
  });
};
