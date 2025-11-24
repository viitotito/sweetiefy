import { createContext, useContext, useState, useEffect } from "react";
import Toast from "../components/shared/Toast"; 

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, toast.duration || 3000); 

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration || 3000}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
