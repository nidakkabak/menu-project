import React, { useEffect, useState } from "react";

export default function AssistantDashboard() {
  const [changes, setChanges] = useState([]);

 
const fetchChanges = async () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const res = await fetch("http://localhost:5000/api/get-meal-changes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  console.log("get-meal-changes cevabı:", data);

  
  if (data.success && Array.isArray(data.result)) {
    const sorted = data.result.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setChanges(sorted);
  } else {
    setChanges([]);
  }
};

 
  useEffect(() => {
    fetchChanges();
    const iv = setInterval(fetchChanges, 3000);
    return () => clearInterval(iv);
  }, []);

  const handleDelete = async (index) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    await fetch("http://localhost:5000/api/delete-meal-change", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, index }),
    });

    fetchChanges(); 
  };
  


  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
    
      <div
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />

     
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(0px)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />

     
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 900,
          margin: "40px auto",
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.59)",
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          fontFamily: "'Poppins', sans-serif",
          color: "#34495e",
        }}
      >
        <h2
          style={{
            fontSize: 36,
            textAlign: "center",
            marginBottom: 30,
            color: "#34495e",
            textShadow: "1px 1px 3px #b0bec5",
          }}
        >
          📋 Yemek Değişiklikleri
        </h2>

        {changes.length === 0 ? (
          <p
            style={{
              fontSize: 18,
              color: "#7f8c8d",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Henüz değişiklik yapılmadı.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              }}
            >
              <thead>
                <tr>
                  {["Tarih", "Kullanıcı", "Eski Yemek", "Yeni Yemek", "Zaman", "Sil"].map((h, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "#4a60e0",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 15,
                        textAlign: "left",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {changes.map((c, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    <td style={{ padding: "14px 20px", fontSize: 15 }}>{c.day}</td>
                    <td style={{ padding: "14px 20px", fontSize: 15 }}>{c.user}</td>
                    <td style={{ padding: "14px 20px", fontSize: 15 }}>{c.oldMeal}</td>
                    <td
                      style={{
                        padding: "14px 20px",
                        fontWeight: "bold",
                        color: "rgba(3, 7, 8, 0.7)",
                        backgroundColor: "rgba(102, 202, 107, 0.18)",
                        borderRadius: 6,
                      }}
                    >
                      {c.newMeal}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 15 }}>
                      {new Date(c.timestamp).toLocaleTimeString()}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 15 }}>
                      <button
                        onClick={() => handleDelete(i)}
                        style={{
                          padding: "6px 14px",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontWeight: "bold",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        🗑 Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
