import { useEffect, useState } from "react";

const Toast = ({ message, setMessage, type = "error", duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    return () => setMessage(null);
  }, []);

  useEffect(() => {
    if (!message) return;

    setProgress(100);

    const interval = setInterval(() => {
      setProgress(prev => Math.max(prev - (100 / (duration / 100)), 0));
    }, 100);

    const timer = setTimeout(() => {
      setMessage(null);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [message, duration, setMessage]);

  if (!message) return null;

  const isError = type === "error";
  const bgColor = isError ? "danger" : "success";
  const headerText = isError ? "Erro" : "Sucesso";

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className={`toast text-bg-${bgColor} bg-opacity-50 show`} role="alert">
        <div className="toast-header">
          <strong className="me-auto">{headerText}</strong>
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => setMessage(null)}
          />
        </div>

        <div className="toast-body">{message}</div>

        <div
          style={{
            height: "4px",
            width: `${progress}%`,
            backgroundColor: isError ? "red" : "green",
            transition: "width 0.1s linear"
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
