import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!password) errs.password = "Password is required";
    if (password !== passwordConfirm)
      errs.passwordConfirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.find((user) => user.username === username)) {
        setErrors({ username: "Username already taken" });
        return;
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful! Please login.");
      navigate("/");
    }
  };

  return (
    <div style={styles.wrapper}>
      
      <div style={styles.leftSide}>
        <div style={styles.overlay}></div>
      </div>

      <div style={styles.rightSide}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Register</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            autoFocus
          />
          {errors.username && <div style={styles.error}>{errors.username}</div>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {errors.password && <div style={styles.error}>{errors.password}</div>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            style={styles.input}
          />
          {errors.passwordConfirm && (
            <div style={styles.error}>{errors.passwordConfirm}</div>
          )}

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
  },
  leftSide: {
    flex: 0.7,
    backgroundImage: `url("/loginFotoo.jpg")`,
    backgroundSize: "120%",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)", 
  },
  rightSide: {
    flex: 1,
    backgroundColor: "rgba(87, 123, 224, 0.41)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "50px 60px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "450px",
    boxSizing: "border-box",
  },
  title: {
    marginBottom: "30px",
    color: "#333",
    fontWeight: "700",
    fontSize: "30px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "16px 18px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1.5px solid #ddd",
    fontSize: "18px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    width: "100%",
    padding: "16px 0",
    backgroundColor: "#4A60E0",
    color: "white",
    fontSize: "20px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "10px",
    fontWeight: "600",
  },
};
