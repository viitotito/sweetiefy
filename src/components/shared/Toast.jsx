import { useEffect, useState } from "react";

const Toast = ({ error, setError, duration = 3000 }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!error) return;

        setProgress(100);

        // Reduz a barra aos poucos
        const interval = setInterval(() => {
            setProgress(prev => prev - (100 / (duration / 100)));
        }, 100);

        // Esconde o toast após o tempo
        const timer = setTimeout(() => {
            setError(null);
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [error, duration, setError]);

    if (!error) return null;

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div className="toast text-bg-danger bg-opacity-50 show" role="alert">
                <div className="toast-header">
                    <strong className="me-auto">Erro</strong>
                    <button
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setError(null)}
                    />
                </div>

                <div className="toast-body">{error}</div>

                {/* Progress Bar */}
                <div
                    style={{
                        height: "4px",
                        width: `${progress}%`,
                        backgroundColor: "red",
                        transition: "width 0.1s linear"
                    }}
                />
            </div>
        </div>
    );
};

export default Toast;
