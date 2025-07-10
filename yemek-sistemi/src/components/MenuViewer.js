import React, { useState, useEffect } from "react";

export default function MenuViewer({ initialMenu, alternatives }) {
  const [menu, setMenu] = useState(initialMenu);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [toastVisible, setToastVisible] = useState(false);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setSelectedCategory("");
    setSelectedOption(null);
  };   

  const handleSave = () => {
    if (!selectedOption) return;
    const updatedMenu = [...menu];
    const oldMeal = updatedMenu[editingIndex].meals[0];
     updatedMenu[editingIndex].meals = [selectedOption.name];


    setMenu(updatedMenu);
    setEditingIndex(null);

    const change = {
      day: updatedMenu[editingIndex].date,
      user: "Kullanıcı",
      oldMeal: oldMeal,
      newMeal: selectedOption.name,
      timestamp: new Date().toISOString(),
    };

    const existingChanges = JSON.parse(localStorage.getItem("mealChanges") || "[]");
    existingChanges.push(change);
    localStorage.setItem("mealChanges", JSON.stringify(existingChanges));

    
    setToastVisible(true);
  };
        
  const handleCancel = () => {
    setEditingIndex(null);
    setSelectedCategory("");
    setSelectedOption(null);
  };

  const renderOptionDetails = (option) => {
    return (
      <div style={{ fontSize: "14px", marginTop: "4px", color: "#555" }}>
        <strong>Ekmek:</strong> {option.bread} <br />
        <strong>İçerik:</strong> {option.ingredients} <br />
        {option.sauce && (
          <>
            <strong>Sos:</strong> {option.sauce} <br />
          </>
        )}
      </div>
    );
  };


  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          zIndex: -2,
          filter: "blur(1px)",
        }}
      />
       <div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "0px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: "6px 14px",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src="/logo1.jpg"
        alt="Yemek Şirketi Logosu"
        style={{
          height: "150px",
          width: "auto",
          borderRadius: "8px",
        }}
      />
      <span
        style={{
          fontWeight: "700",
          fontSize: "18px",
          color: "#34495e",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        
      </span>
    </div>
  

      <div style={styles.container}>
        <h2 style={styles.title}>Aylık Yemek Menüsü</h2>

        {menu.map((day, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(editingIndex === index ? styles.cardEditing : {}),
            }}
            tabIndex={0}
            aria-label={`Menü ${day.date} için`}
          >
            <div style={styles.header}>
              <span style={styles.date}>{day.date}</span>
              <span style={styles.dayName}>{day.day}</span>
            </div>

            <ul style={styles.mealList}>
              {day.meals.map((meal, i) => (
                <li key={i} style={styles.mealItem}>
                  {meal}
                </li>
              ))}
            </ul>

            {editingIndex === index ? (
              <div style={styles.editPanel}>
                <label style={styles.label}>Kategori seç:</label>
                <div style={styles.radioGroup}>
                  {Object.keys(alternatives).map((category) => (
                    <label
                      key={category}
                      style={{
                        ...styles.radioLabel,
                        ...(selectedCategory === category
                          ? styles.radioLabelSelected
                          : {}),
                      }}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => {
                          setSelectedCategory(category);
                          setSelectedOption(null);
                        }}
                        style={styles.radioInput}
                      />
                      {category}
                    </label>
                  ))}
                </div>

                {selectedCategory && (
                  <>
                    <label style={{ ...styles.label, marginTop: 16 }}>
                      {selectedCategory} seçenekleri:
                    </label>
                    <div style={styles.optionsList}>
                      {alternatives[selectedCategory].map((option, idx) => (
                        <label
                          key={idx}
                          style={{
                            ...styles.optionLabel,
                            ...(selectedOption?.name === option.name
                              ? styles.optionLabelSelected
                              : {}),
                          }}
                        >
                          <input
                            type="radio"
                            name="option"
                            value={option.name}
                            checked={selectedOption?.name === option.name}
                            onChange={() => setSelectedOption(option)}
                            style={styles.radioInput}
                          />
                          {option.name}
                          {selectedOption?.name === option.name &&
                            renderOptionDetails(option)}
                        </label>
                      ))}
                    </div>
                  </>
                )}

                <div style={styles.buttonRow}>
                  <button
                    style={{
                      ...styles.button,
                      ...styles.saveButton,
                      ...(selectedOption ? {} : styles.buttonDisabled),
                    }}
                    onClick={handleSave}
                    disabled={!selectedOption}
                    aria-disabled={!selectedOption}
                  >
                    Kaydet
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.cancelButton }}
                    onClick={handleCancel}
                  >
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              <button
                style={styles.editButton}
                onClick={() => handleEditClick(index)}
                aria-label={`Yemek değiştirme seçeneğini aç ${day.date} için`}
              >
                Yemeği Değiştir
              </button>
            )}
          </div>
        ))}
      </div>

     
      {toastVisible && (
        <div className="toast-notification" aria-live="polite">
          ✅ Yemek değiştirildi!
        </div>
      )}

     
      <style>{`
        .toast-notification {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #4a60e0;
          color: white;
          padding: 14px 28px;
          border-radius: 30px;
          font-size: 18px;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(74, 96, 224, 0.4);
          animation: fadeInOut 3s ease forwards;
          z-index: 9999;
          user-select: none;
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
        }
          @media (max-width: 600px) {
  .toast-notification {
    font-size: 14px;
    padding: 10px 20px;
  }
  .edit-button {
    font-size: 13px;
    padding: 8px 12px;
  }
}

      `}</style>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    backdropFilter: "blur(6px)",
  },
  title: {
    fontSize: "36px",
    color: "#34495e",                     
    textAlign: "center",
    marginBottom: "40px",
    textShadow: "1px 1px 3px #b0bec5",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.59)",
    borderRadius: "12px",
    padding: "20px 25px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    marginBottom: "24px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  },
  cardEditing: {
    boxShadow: "0 8px 25px rgba(74, 96, 224, 0.5)",
    transform: "scale(1.03)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px",
    fontWeight: "700",
    color: "#2c3e50",
  },
  date: {
    fontSize: "20px",
  },
  dayName: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#7f8c8d",
  },
  mealList: {
    listStyleType: "circle",
    paddingLeft: "22px",
    color: "#2c3e50",
    fontSize: "17px",
    marginBottom: "12px",
  },
  mealItem: {
    marginBottom: "8px",
  },
  editButton: {
    marginTop: "10px",
    padding: "10px 18px",
    border: "none",
    backgroundColor: "#4a60e0",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: "all 0.3s ease",
  },
  editPanel: {
    marginTop: "20px",
    borderTop: "1px solid #d1d9e6",
    paddingTop: "15px",
  },
  label: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#34495e",
    marginBottom: "8px",
    display: "block",
  },
  radioGroup: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  radioLabel: {
    cursor: "pointer",
    fontSize: "15px",
    color: "#555",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1.5px solid transparent",
    userSelect: "none",
    transition: "all 0.25s ease",
  },
  radioLabelSelected: {
    backgroundColor: "#4a60e0",
    color: "white",
    borderColor: "#4a60e0",
  },
  radioInput: {
    marginRight: "8px",
    cursor: "pointer",
  },
  optionsList: {
    marginTop: "12px",
  },
  optionLabel: {
    display: "block",
    cursor: "pointer",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.8px solid transparent",
    marginBottom: "10px",
    transition: "all 0.3s ease",
    color: "#444",
    userSelect: "none",
  },
  optionLabelSelected: {
    borderColor: "#4a60e0",
    backgroundColor: "#e0e7ff",
    color: "#2c3e50",
    fontWeight: "600",
  },
  buttonRow: {
    marginTop: "18px",
    display: "flex",
    gap: "12px",
  },
  button: {
    padding: "10px 22px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    userSelect: "none",
    transition: "background-color 0.3s ease",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "white",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "white",
  },
  buttonDisabled: {
    backgroundColor: "#a3d9a5",
    cursor: "not-allowed",
  },
};
