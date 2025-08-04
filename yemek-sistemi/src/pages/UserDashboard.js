import React, { useEffect, useState } from "react";
import MenuViewer from "../components/MenuViewer";
import ChatBot from "../components/ChatBot";

export default function UserDashboard() {
  const [monthlyMenu, setMonthlyMenu] = useState(null);
  const [alternatives, setAlternatives] = useState(null);

  useEffect(() => {
    getMenu();
    getAlternatives();
  }, []);

  async function getMenu() {
    try {
      const response = await fetch("http://localhost:5000/api/get-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setMonthlyMenu([...data.result]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Menu fetch error:", error);
      alert("Menü alınırken hata oluştu, lütfen tekrar deneyin.");
    }
  }

  async function getAlternatives() {
    try {
      const response = await fetch("http://localhost:5000/api/get-alternatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        setAlternatives(data.result);
        localStorage.setItem("alternatives", JSON.stringify(data.result));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Alternatives fetch error:", error);
      alert("Alternatifler alınırken hata oluştu, lütfen tekrar deneyin.");
    }
  }

  if (!monthlyMenu || !alternatives) {
    return <div style={{ textAlign: "center", marginTop: 200 }}>Loading...</div>;
  }

  return (
    <>
      <MenuViewer initialMenu={monthlyMenu} alternatives={alternatives} />
      <ChatBot menu={monthlyMenu} />
    </>
  );
}
