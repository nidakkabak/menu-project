import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        
        if (username.toLowerCase() === "asistan") {
          navigate("/asistan");
        } else {
          navigate("/dashboard", { state: { username } });
        }
      } else {
        setErrors({ form: "Invalid username or password" });
      }
    }
  };
  

  return (
    <div style={styles.wrapper}>
    
      <div style={styles.leftSide}>
         <div style={styles.overlay}></div>
      </div>

      <div style={styles.rightSide}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Welcome Back!</h2>

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
          {errors.form && <div style={styles.error}>{errors.form}</div>}

          <button type="submit" style={styles.button}>
            Log In
          </button>

          <p style={styles.registerText}>
            Don't have an account?{" "}
            <a href="/register" style={styles.registerLink}>
              Register here
            </a>
          </p>
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
    backgroundColor: "#fff",
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
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    marginBottom: "10px",
    fontWeight: "600",
  },
  registerText: {
    marginTop: "22px",
    fontSize: "15px",
    textAlign: "center",
    color: "#555",
  },
  registerLink: {
    color: "#4A60E0",
    fontWeight: "600",
    textDecoration: "none",
  },
};
