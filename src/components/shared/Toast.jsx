import { useEffect, useState } from "react";

const Toast = ({ message, type = "error", duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!message) return;

    setProgress(100);

    const start = setTimeout(() => {
      setProgress(0);
    }, 50);

    const end = setTimeout(() => {
      if (onClose) onClose();
    }, duration + 50);

    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [message, duration, onClose]);

  if (!message) return null;

  const isError = type === "error";
  const bgColor = isError ? "danger" : "success";
  const headerText = isError ? "Erro" : "Sucesso";

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className={`toast text-bg-${bgColor} bg-opacity-50 show`} role="alert">
        <div className="toast-header">
          <strong className="me-auto">{headerText}</strong>
          <button className="btn-close" aria-label="Close" onClick={onClose} />
        </div>

        <div className="toast-body">{message}</div>

        <div
          style={{
            height: "4px",
            width: `${progress}%`,
            backgroundColor: isError ? "red" : "green",
            transition: `width ${duration}ms linear`,
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
