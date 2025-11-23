import { useEffect, useState } from "react";

const ThemeButton = () => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

    useEffect(() => {
        document.querySelector("html").setAttribute("data-bs-theme", darkMode ? "dark" : "light");
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <button
            className="btn btn-outline-secondary rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "30px", height: "30px" }}
            onClick={() => setDarkMode(!darkMode)}
        >
            <i
                className={`bi ${darkMode ? "bi-moon-fill" : "bi-sun-fill"}`}
                style={{ fontSize: "1.3rem" }}
            ></i>
        </button>
    );
};

export default ThemeButton;
