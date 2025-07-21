import React from "react";
import MenuViewer from "../components/MenuViewer";
import alternatives from "../data/alternatives.json";
import ChatBot from "../components/ChatBot";


export default function UserDashboard() {
 const monthlyMenu = [
  {
    date: "07 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Fırında Izgara Tavuk Kalça",
      "Nohutlu Pirinç Pilavı",
      "Havuç Tarator",
    ],
  },
  {
    date: "08 Temmuz 2025",
    day: "Salı",
    meals: [
      "Biber Dolması",
      "Semizotlu Yaz Salatası",
      "Yoğurt",
    ],
  },
  {
    date: "09 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Köfteli Ispanak",
      "Patates Püresi",
      "Yaz Salatası",
    ],
  },
  {
    date: "10 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Fırın Makarnası",
      "Taze Pancarlı Salata",
      "Köz Patlıcan Meze",
    ],
  },
  {
    date: "11 Temmuz 2025",
    day: "Cuma",
    meals: [
      "Domates Soslu Tavuk Köfte",
      "Şehriyeli Bulgur Pilavı",
      "Mevsim Salata",
    ],
  },
  {
    date: "14 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Tavuk Sote",
      "Mücendra Pilavı",
      "Yoğurt",
    ],
  },
  {
    date: "15 Temmuz 2025",
    day: "Salı",
    meals: [
      "Etli Yaz Türlüsü",
      "Mısırlı Pirinç Pilavı",
      "Mevsim Salata",
    ],
  },
  {
    date: "16 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Tavuk Kebap Köfte",
      "Izgara Patates",
      "Otlu Sebze Haşlama",
    ],
  },
  {
    date: "17 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Taze Fasulye",
      "Tavuklu Pirinç Pilavı",
      "Yoğurt",
    ],
  },
  {
    date: "18 Temmuz 2025",
    day: "Cuma",
    meals: [
      "Magarına Bulli (Tavuk Kalça)",
      "Beyaz Peynirli Zeytinli Salata",
    ],
  },
  {
    date: "21 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Kıbrıs Köftesi ve Patates",
      "Kuru Börülce Salatası",
      "Yoğurt",
    ],
  },
  {
    date: "22 Temmuz 2025",
    day: "Salı",
    meals: [
      "Et Kebap Köfte",
      "Domatesli Bulgur Pilavı",
      "Yoğurt",
    ],
  },
  {
    date: "23 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Tavuklu Bezelye",
      "Pirinç Pilavı",
      "Roka Salatası",
    ],
  },
  {
    date: "24 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Mantarlı Tavuk Sote",
      "Hellimli Makarna",
      "Izgara Sebze",
    ],
  },
  {
    date: "25 Temmuz 2025",
    day: "Cuma",
    meals: [
      "Patates Musakka",
      "Garnitürlü Pirinç Pilavı",
      "Cacık",
    ],
  },
  {
    date: "28 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Fırında Tavuk Patates Kebabı",
      "Bulgur Pilavı",
      "Taze Kişnişli Salata",
    ],
  },
  {
    date: "29 Temmuz 2025",
    day: "Salı",
    meals: [
      "Domates Soslu Tavuk Köfte",
      "Hellimli Makarna",
      "Buharda Karışık Sebze",
    ],
  },
  {
    date: "30 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Tavuklu Sebzeli Makarna",
      "Izgara Sebze ve Patates",
      "Cacık",
    ],
  },
  {
    date: "31 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Etli Kuru Fasulye",
      "Pirinç Pilavı",
      "Söğüş Sebze Turşu",
    ],
  },
  {
    date: "01 Ağustos 2025",
    day: "Cuma",
    meals: [
      "Tavuklu Patlıcan Yemeği",
      "Bulgur Pilavı",
      "Yoğurt",
    ],
  },
];

 return (
  <>
    <MenuViewer initialMenu={monthlyMenu} alternatives={alternatives} />
    <ChatBot menu={monthlyMenu} />
  </>
);
}
