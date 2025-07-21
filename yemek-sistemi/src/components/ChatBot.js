import React, { useState } from "react";

export default function ChatBot({ menu }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Merhaba! Bugünkü menüyü veya belirli bir yemeği sorabilirsin 🍽️" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function getTomorrowMenu() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formattedDate = tomorrow.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      timeZone: "Europe/Istanbul"
    });

    const found = menu.find((item) => item.date === formattedDate);

    if (found) {
      return `Yarın (${found.day}) günü menüde: ${found.meals.join(", ")}`;
    } else {
      return "Yarın için menü bilgisi bulunamadı.";
    }
  }

  function getTodayMenu() {
    const today = new Date().toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    const todayMenu = menu.find(item => item.date === today);

    if (todayMenu) {
      return `Bugünkü menü: ${todayMenu.meals.join(", ")}`;
    } else {
      return "Bugünkü menü bulunamadı 😔";
    }
  }

  function searchMealInMenu(mealName) {
    const daysFound = menu.filter(item =>
      item.meals.some(meal => meal.toLowerCase().includes(mealName.toLowerCase()))
    );

    if (daysFound.length > 0) {
      const results = daysFound.map(day => `${day.day} (${day.date})`).join(", ");
      return `"${mealName}" şu günlerde var: ${results}`;
    } else {
      return `"${mealName}" adlı yemek bulunamadı 😕`;
    }
  }


 const generateReply = (text) => {
  const lower = text.toLowerCase();

  if (lower.includes("yarın")) {
    return getTomorrowMenu();
  }

  if (lower.includes("bugün") || lower.includes("menü")) {
    return getTodayMenu();
  }

  if (lower.includes("yardım") || lower.includes("ne yapabilirim")) {
    return `Şunları sorabilirsin:
- "Bugün ne yemek var?"
- "Yarın ne var?"
- Belirli bir yemeği sorabilirsin: "Pilav var mı?" gibi`;
  }

  if (lower.includes("selam") || lower.includes("merhaba")) {
    return "Merhaba! Menüyle ilgili bir şey sormak ister misin?";
  }

  // Belirli kalıplarla yemek arama
  const keywords = ["var mı", "hangi gün", "ne zaman"];
  for (let word of keywords) {
    if (lower.includes(word)) {
      const possibleMeal = lower.replace(word, "").trim();
      return searchMealInMenu(possibleMeal);
    }
  }

  // Otomatik yemek adı denemesi (örneğin sadece "pilav")
  const guessMeal = searchMealInMenu(lower.trim());
  if (!guessMeal.includes("bulunamadı")) {
    return guessMeal;
  }

  return "Üzgünüm, bunu anlayamadım. Menüyle ilgili bir şey sorabilirsin 🍲";
};

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const botReply = { from: "bot", text: generateReply(input) };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "30px",
          padding: "20px 30px",
          borderRadius: "40px",
          backgroundColor: "#0056b3",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          fontSize: "20px",
          fontWeight: "600",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#003d80"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0056b3"}
      >
        {isOpen ? "❌ Kapat" : "💬 Chat"}
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "30px",
            width: "320px",
            height: "450px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              flexGrow: 1,
              padding: "15px",
              overflowY: "auto",
              backgroundColor: "#f9f9f9"
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "12px",
                  maxWidth: "75%",
                  padding: "10px 15px",
                  borderRadius: "18px",
                  backgroundColor: msg.from === "bot" ? "#e0e0e0" : "#007bff",
                  color: msg.from === "bot" ? "#000" : "#fff",
                  alignSelf: msg.from === "bot" ? "flex-start" : "flex-end",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
              >
                <strong style={{ textTransform: "capitalize" }}>{msg.from}</strong>: {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", padding: "10px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Mesajınızı yazın..."
              style={{
                flexGrow: 1,
                padding: "10px 15px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                fontSize: "16px",
                outline: "none"
              }}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#007bff"}
            >
              Gönder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
